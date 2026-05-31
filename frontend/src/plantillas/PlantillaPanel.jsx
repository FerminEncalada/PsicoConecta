import { LayoutDashboard, LogOut, UserRound } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import BotonTema from "../componentes/BotonTema";
import Logo from "../componentes/Logo";
import { usarAutenticacion } from "../contexto/ContextoAutenticacion";
import { rutaInicialPorRol } from "../servicios/servicioAutenticacion";

const claseEnlace = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
    isActive
      ? "bg-bosque-600 text-white"
      : "text-slate-600 hover:bg-teal-50 hover:text-bosque-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-teal-300"
  }`;

export default function PlantillaPanel() {
  const { usuario, salir } = usarAutenticacion();
  const navegar = useNavigate();

  const cerrar = async () => {
    await salir();
    navegar("/iniciar-sesion", { replace: true });
  };

  return (
    <div className="min-h-screen bg-arena-50 dark:bg-slate-950 lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-slate-200 bg-white/80 px-5 py-5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 lg:min-h-screen lg:border-b-0 lg:border-r">
        <Logo />
        <nav className="mt-7 flex gap-2 overflow-x-auto lg:flex-col">
          <NavLink to={rutaInicialPorRol(usuario.role)} className={claseEnlace}>
            <LayoutDashboard size={18} />
            Resumen
          </NavLink>
          <NavLink to="/perfil" className={claseEnlace}>
            <UserRound size={18} />
            Mi perfil
          </NavLink>
          <button
            type="button"
            onClick={cerrar}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-red-50 hover:text-red-700 dark:text-slate-300 dark:hover:bg-red-950/30 dark:hover:text-red-300"
          >
            <LogOut size={18} />
            Cerrar sesion
          </button>
        </nav>
      </aside>

      <main className="min-w-0">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white/70 px-5 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 sm:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-bosque-600 dark:text-teal-300">
              {usuario.role}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-200">
              {usuario.first_name} {usuario.last_name}
            </p>
          </div>
          <BotonTema />
        </header>
        <div className="px-5 py-7 sm:px-8 lg:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
