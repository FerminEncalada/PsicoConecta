import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CalendarHeart,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";
import BarraNavegacion from "../componentes/BarraNavegacion";
import TarjetaCaracteristica from "../componentes/TarjetaCaracteristica";

const servicios = [
  {
    icono: CalendarHeart,
    titulo: "Agenda sencilla",
    texto: "Reserva y administra tus citas psicologicas desde un solo lugar.",
  },
  {
    icono: Video,
    titulo: "Teleconsulta preparada",
    texto: "Sesiones remotas asociadas a tus citas mediante integracion con Zoom.",
  },
  {
    icono: Activity,
    titulo: "Seguimiento emocional",
    texto: "Una base preparada para registrar bienestar y futuras lecturas IoT.",
  },
];

export default function Inicio() {
  return (
    <>
      <BarraNavegacion />
      <main>
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 rounded-full bg-teal-100/70 blur-3xl dark:bg-teal-950/50" />
          <div className="contenedor grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
              <span className="etiqueta">Tu bienestar importa</span>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-6xl">
                Acompanamiento psicologico{" "}
                <span className="text-bosque-600 dark:text-teal-300">cercano y conectado.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                PsicoConecta reune orientacion profesional, teleconsulta y seguimiento
                emocional en una experiencia clara y humana.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/registro" className="boton-primario">
                  Comenzar ahora <ArrowRight size={18} />
                </Link>
                <Link to="/iniciar-sesion" className="boton-secundario">
                  Ya tengo cuenta
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12 }}
              className="panel relative overflow-hidden p-7 sm:p-9"
            >
              <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-full bg-teal-100/80 dark:bg-teal-950/60" />
              <div className="relative">
                <span className="grid h-16 w-16 place-items-center rounded-3xl bg-bosque-600 text-white">
                  <HeartPulse size={32} />
                </span>
                <p className="mt-8 etiqueta">Espacio de confianza</p>
                <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
                  Un paso pequeno tambien cuenta.
                </h2>
                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                  Encuentra herramientas pensadas para acompanarte con privacidad,
                  continuidad y acceso desde cualquier lugar.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-arena-100 p-4 dark:bg-slate-800">
                    <ShieldCheck className="text-bosque-600 dark:text-teal-300" size={22} />
                    <p className="mt-3 text-sm font-bold">Acceso protegido</p>
                  </div>
                  <div className="rounded-2xl bg-arena-100 p-4 dark:bg-slate-800">
                    <Sparkles className="text-bosque-600 dark:text-teal-300" size={22} />
                    <p className="mt-3 text-sm font-bold">Atencion integral</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="servicios" className="py-16">
          <div className="contenedor">
            <p className="etiqueta">Servicios</p>
            <h2 className="mt-4 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
              Una plataforma preparada para crecer contigo.
            </h2>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {servicios.map((servicio) => (
                <TarjetaCaracteristica key={servicio.titulo} {...servicio} />
              ))}
            </div>
          </div>
        </section>

        <section id="bienestar" className="py-16">
          <div className="contenedor">
            <div className="rounded-[2rem] bg-bosque-900 px-7 py-12 text-white sm:px-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-200">
                Bienestar con continuidad
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-black sm:text-4xl">
                Tu proceso merece un espacio claro, privado y disponible.
              </h2>
              <Link to="/registro" className="mt-7 inline-flex items-center gap-2 font-bold text-teal-100 hover:text-white">
                Crear mi cuenta <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
