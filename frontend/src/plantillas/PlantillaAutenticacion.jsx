import { HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import BotonTema from "../componentes/BotonTema";
import Logo from "../componentes/Logo";

export default function PlantillaAutenticacion() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-bosque-900 p-10 text-white lg:flex">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/20 text-white">
            <HeartPulse size={23} />
          </span>
          <span className="text-lg font-black tracking-tight">
            Psico<span className="text-teal-300">Conecta</span>
          </span>
        </Link>
        <div className="max-w-md">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300">
            Tu bienestar importa
          </span>
          <h1 className="mt-5 text-4xl font-black leading-tight">
            Acompañamiento psicológico{" "}
            <span className="text-teal-300">cercano y conectado.</span>
          </h1>
          <p className="mt-4 leading-relaxed text-teal-100/80">
            PsicoConecta reúne orientación profesional, teleconsulta y seguimiento
            emocional en una experiencia clara y humana.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/10 p-4">
              <ShieldCheck size={20} className="text-teal-300" />
              <p className="mt-2 text-sm font-bold">Acceso protegido</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4">
              <Sparkles size={20} className="text-teal-300" />
              <p className="mt-2 text-sm font-bold">Atención integral</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-teal-200/60">
          &copy; 2026 PsicoConecta &mdash; Todos los derechos reservados.
        </p>
      </div>
      <div className="flex w-full items-center justify-center bg-white px-6 py-10 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between">
            <div className="lg:hidden">
              <Logo />
            </div>
            <div className="ml-auto">
              <BotonTema compacto />
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
