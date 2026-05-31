import { CalendarDays, ClipboardList, Video } from "lucide-react";
import EncabezadoPanel from "./EncabezadoPanel";

const modulos = [
  { titulo: "Agenda de citas", texto: "Organiza tus proximas sesiones.", icono: CalendarDays },
  { titulo: "Teleconsultas", texto: "Accede a sesiones preparadas con Zoom.", icono: Video },
  { titulo: "Seguimiento", texto: "Consulta el historial de tus pacientes.", icono: ClipboardList },
];

export default function PanelPsicologo() {
  return (
    <>
      <EncabezadoPanel etiqueta="Panel profesional" titulo="Tu espacio de atencion." texto="Los modulos clinicos quedan preparados para conectarse con los microservicios del proyecto." />
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
