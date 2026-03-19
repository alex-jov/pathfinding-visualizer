const items = [
  { colorClass: 'bg-emerald-600 dark:bg-emerald-400 rounded-full', label: 'Start' },
  { colorClass: 'bg-red-600 dark:bg-red-400 rounded-full', label: 'End' },
  { colorClass: 'bg-slate-800 dark:bg-slate-300', label: 'Wall' },
  { colorClass: 'bg-indigo-400', label: 'Visited' },
  { colorClass: 'bg-sky-400', label: 'Frontier' },
  { colorClass: 'bg-amber-400', label: 'Path' },
];

export default function Legend() {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
      {items.map(({ colorClass, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded-sm ${colorClass}`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
