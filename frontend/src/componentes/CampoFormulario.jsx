export default function CampoFormulario({
  etiqueta,
  error,
  className = "",
  ...propiedades
}) {
  return (
    <label className={`block space-y-2 ${className}`}>
      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
        {etiqueta}
      </span>
      <input className="campo" {...propiedades} />
      {error && <span className="text-xs font-semibold text-red-600">{error}</span>}
    </label>
  );
}
