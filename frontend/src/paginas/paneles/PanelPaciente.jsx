import { Activity, CalendarDays, Video } from "lucide-react";
import EncabezadoPanel from "./EncabezadoPanel";

const modulos = [
  { titulo: "Mis citas", texto: "Revisa y organiza tus proximas sesiones.", icono: CalendarDays },
  { titulo: "Teleconsulta", texto: "Ingresa a tus sesiones remotas programadas.", icono: Video },
  { titulo: "Mi bienestar", texto: "Registra tu seguimiento emocional.", icono: Activity },
];

export default function PanelPaciente() {
  return (
    <>
      <EncabezadoPanel etiqueta="Mi bienestar" titulo="Un espacio para avanzar a tu ritmo." texto="Encuentra tus herramientas personales y el seguimiento de tu proceso." />
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {modulos.map(({ titulo, texto, icono: Icono }) => (
          <article key={titulo} className="panel p-6">
            <Icono size={22} className="text-bosque-600 dark:text-teal-300" />
            <h2 className="mt-5 text-lg font-black text-slate-900 dark:text-white">{titulo}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{texto}</p>
          </article>
        ))}
      </section>
    </>
  );
}
