import { ShieldCheck, UserRoundCheck, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../servicios/api";
import EncabezadoPanel from "./EncabezadoPanel";

const estadisticasIniciales = [
  { etiqueta: "Usuarios", valor: "0", icono: UsersRound },
  { etiqueta: "Activos", valor: "0", icono: UserRoundCheck },
  { etiqueta: "Roles base", valor: "3", icono: ShieldCheck },
];

export default function PanelAdministrador() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(null);

  const cargarUsuarios = async () => {
    try {
      const { data } = await api.get("/api/usuarios");
      setUsuarios(data.users || []);
    } catch (excepcion) {
      setError(excepcion.response?.data?.message || "No fue posible cargar los usuarios.");
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const alternarEstado = async (usuario) => {
    setProcesando(usuario.id);
    setError("");
    try {
      await api.patch(`/api/usuarios/${usuario.id}/status`);
      await cargarUsuarios();
    } catch (excepcion) {
      setError(excepcion.response?.data?.message || "No fue posible actualizar el estado.");
    } finally {
      setProcesando(null);
    }
  };

  const activos = usuarios.filter((usuario) => usuario.status === "active").length;
  const estadisticas = estadisticasIniciales.map((item) => {
    if (item.etiqueta === "Usuarios") return { ...item, valor: usuarios.length };
    if (item.etiqueta === "Activos") return { ...item, valor: activos };
    return item;
  });

  return (
    <>
      <EncabezadoPanel
        etiqueta="Administracion"
        titulo="Todo bajo control, Admin."
        texto="Gestiona perfiles, roles y accesos desde un unico lugar."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {estadisticas.map(({ etiqueta, valor, icono: Icono }) => (
          <article key={etiqueta} className="panel p-5">
            <Icono size={21} className="text-bosque-600 dark:text-teal-300" />
            <p className="mt-5 text-3xl font-black text-slate-900 dark:text-white">{valor}</p>
            <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-300">{etiqueta}</p>
          </article>
        ))}
      </section>

      <section className="panel mt-6 overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:px-6">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Usuarios registrados</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
            Activa o pausa accesos para la demostracion.
          </p>
          {error && <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-200">{error}</p>}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-arena-50 text-[11px] uppercase tracking-wider text-slate-400 dark:bg-slate-800/80">
              <tr>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Accion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 dark:text-slate-100">
                      {usuario.first_name} {usuario.last_name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{usuario.email}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-bosque-600 dark:text-teal-300">{usuario.role}</td>
                  <td className="px-6 py-4">{usuario.status}</td>
                  <td className="px-6 py-4">
                    <button type="button" onClick={() => alternarEstado(usuario)} disabled={procesando === usuario.id} className="text-sm font-bold text-bosque-600 hover:text-bosque-700 disabled:opacity-50 dark:text-teal-300">
                      {usuario.status === "active" ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
