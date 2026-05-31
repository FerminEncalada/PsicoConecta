import { motion } from "framer-motion";

export default function TarjetaCaracteristica({ icono: Icono, titulo, texto }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="panel p-6"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-bosque-600 dark:bg-teal-950/60 dark:text-teal-300">
        <Icono size={23} />
      </span>
      <h3 className="mt-5 text-lg font-black text-slate-900 dark:text-white">{titulo}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{texto}</p>
    </motion.article>
  );
}
