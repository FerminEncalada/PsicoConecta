import { HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

export default function Logo({ compacto = false }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-bosque-600 text-white shadow-lg shadow-teal-700/20">
        <HeartHandshake size={23} strokeWidth={2.2} />
      </span>
      {!compacto && (
        <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
          Psico<span className="text-bosque-600 dark:text-teal-300">Conecta</span>
        </span>
      )}
    </Link>
  );
}
