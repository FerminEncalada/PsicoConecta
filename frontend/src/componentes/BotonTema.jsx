import { Moon, Sun } from "lucide-react";
import { usarTema } from "../contexto/ContextoTema";

export default function BotonTema({ compacto = false }) {
  const { oscuro, alternarTema } = usarTema();
  const etiqueta = oscuro ? "Usar modo claro" : "Usar modo oscuro";

  return (
    <button
      type="button"
      onClick={alternarTema}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xs font-bold text-slate-600 transition hover:text-bosque-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:text-teal-300"
      aria-label={etiqueta}
      title={etiqueta}
    >
      {oscuro ? <Sun size={16} /> : <Moon size={16} />}
      {!compacto && <span>{oscuro ? "Claro" : "Oscuro"}</span>}
    </button>
  );
}
