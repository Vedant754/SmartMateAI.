import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ToolCard({
  title,
  description,
  icon: Icon,
  color,
  popular,
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-violet-200 hover:shadow-2xl"
    >
      {popular && (
        <span className="absolute right-5 top-5 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
          Popular
        </span>
      )}

      <div
        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${color} text-white shadow-lg`}
      >
        <Icon size={26} />
      </div>

      <h3 className="mb-3 text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="text-sm leading-7 text-slate-500">
        {description}
      </p>

      <div className="mt-8 flex items-center text-violet-600 opacity-0 transition duration-300 group-hover:opacity-100">
        <span className="text-sm font-medium">
          Open Tool
        </span>

        <ArrowUpRight
          size={18}
          className="ml-2 transition group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-linear-to-br from-violet-50/0 via-violet-50/20 to-blue-50 opacity-0 transition duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}