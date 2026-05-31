import { Link, NavLink } from "react-router-dom";
import { usarAutenticacion } from "../contexto/ContextoAutenticacion";
import { rutaInicialPorRol } from "../servicios/servicioAutenticacion";
import BotonTema from "./BotonTema";
import Logo from "./Logo";

export default function BarraNavegacion() {
  const { usuario } = usarAutenticacion();

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-arena-50/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="contenedor flex h-20 items-center justify-between gap-4">
        <Logo />
        <div className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className="text-sm font-bold text-slate-600 transition hover:text-bosque-700 dark:text-slate-300 dark:hover:text-teal-300">
            Inicio
          </NavLink>
          <a href="/#servicios" className="text-sm font-bold text-slate-600 transition hover:text-bosque-700 dark:text-slate-300 dark:hover:text-teal-300">
            Servicios
          </a>
          <a href="/#bienestar" className="text-sm font-bold text-slate-600 transition hover:text-bosque-700 dark:text-slate-300 dark:hover:text-teal-300">
            Bienestar
          </a>
        </div>
        <div className="flex items-center gap-3">
          <BotonTema compacto />
          {usuario ? (
            <Link to={rutaInicialPorRol(usuario.role)} className="boton-primario py-2.5">
              Mi panel
            </Link>
          ) : (
            <>
              <Link to="/iniciar-sesion" className="hidden text-sm font-bold text-slate-700 dark:text-slate-200 sm:block">
                Ingresar
              </Link>
              <Link to="/registro" className="boton-primario py-2.5">
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
