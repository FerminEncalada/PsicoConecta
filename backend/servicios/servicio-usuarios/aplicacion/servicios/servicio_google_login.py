import requests as http_requests
from flask import current_app
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token

from aplicacion.extensiones import db
from aplicacion.modelos import Role, User
from aplicacion.utilidades.seguridad import hash_password
from flask_jwt_extended import create_access_token


def _client_id():
    return current_app.config.get(
        "GOOGLE_LOGIN_CLIENT_ID",
        current_app.config.get("GOOGLE_CLIENT_ID", ""),
    )


def verificar_token_google(token):
    cid = _client_id()
    parts = token.split(".")
    import json
    debug_info = {"token_len": len(token), "is_jwt": len(parts) == 3, "cid_prefix": cid[:30] if cid else "EMPTY"}
    if len(parts) == 3:
        import base64
        try:
            padded = parts[1] + "=" * (4 - len(parts[1]) % 4)
            decoded = base64.urlsafe_b64decode(padded)
            payload = json.loads(decoded)
            debug_info["payload"] = {k: payload.get(k) for k in ("aud","azp","email","iss","sub","exp","iat")}
        except Exception as ex:
            debug_info["decode_error"] = str(ex)
    with open("google_debug.log", "a") as f:
        f.write(json.dumps(debug_info) + "\n")
    try:
        resp = http_requests.get(
            "https://www.googleapis.com/oauth2/v3/tokeninfo",
            params={"id_token": token},
            timeout=10,
        )
        if resp.status_code == 200:
            info = resp.json()
            aud = info.get("aud", "")
            if aud not in (cid, current_app.config.get("GOOGLE_CLIENT_ID", "")):
                current_app.logger.warning("Google token aud mismatch: got '%s', expected '%s'", aud, cid)
                if info.get("azp") in (cid, current_app.config.get("GOOGLE_CLIENT_ID", "")):
                    current_app.logger.info("Falling back to azp match")
                    return info
                return None
            return info
        current_app.logger.error("Google tokeninfo failed: %d %s", resp.status_code, resp.text[:500])
    except Exception as e:
        current_app.logger.error("Google tokeninfo error: %s", str(e))
    try:
        resp = http_requests.get(
            "https://www.googleapis.com/oauth2/v3/tokeninfo",
            params={"access_token": token},
            timeout=10,
        )
        if resp.status_code == 200:
            info = resp.json()
            aud = info.get("aud", "")
            if aud not in (cid, current_app.config.get("GOOGLE_CLIENT_ID", "")):
                current_app.logger.warning("Google access_token aud mismatch: got '%s', expected '%s'", aud, cid)
                return None
            return info
        current_app.logger.error("Google access_token info failed: %d %s", resp.status_code, resp.text[:500])
    except Exception as e2:
        current_app.logger.error("Google access_token info error: %s", str(e2))
    try:
        info = id_token.verify_oauth2_token(token, google_requests.Request(), cid)
        if info.get("iss") not in ("accounts.google.com", "https://accounts.google.com"):
            current_app.logger.warning("Google token iss invalid: %s", info.get("iss"))
            return None
        return info
    except Exception as e3:
        current_app.logger.error("Google id_token verify failed: %s", str(e3))
    return None


def google_login(token):
    info = verificar_token_google(token)
    if not info:
        raise ValueError("El token de Google no es valido.")

    email = info.get("email", "").strip().lower()
    google_id = info.get("sub")
    first_name = info.get("given_name", "")
    last_name = info.get("family_name", "")
    if not last_name:
        last_name = info.get("name", "Usuario Google")

    user = User.query.filter_by(email=email).first()

    if user:
        if user.status != "active":
            raise ValueError("Tu cuenta se encuentra inactiva.")
        user.google_id = google_id
    else:
        role = Role.query.filter_by(name="PATIENT").first()
        if not role:
            raise RuntimeError("Ejecuta datos_iniciales.py para crear los roles iniciales.")
        user = User(
            first_name=first_name or "Usuario",
            last_name=last_name or "Google",
            email=email,
            password_hash=hash_password(google_id or token[:32]),
            google_id=google_id,
            phone=None,
            role=role,
        )
        db.session.add(user)

    db.session.commit()
    access_token = create_access_token(
        identity=str(user.id), additional_claims={"role": user.role.name}
    )
    return user, access_token
