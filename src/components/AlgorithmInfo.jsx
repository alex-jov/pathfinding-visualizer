import { algorithms } from '../algorithms';

export default function AlgorithmInfo({ algorithm, visitedCount, pathLength, isComplete, noPath }) {
  const { info } = algorithms[algorithm];

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-4 sm:p-5 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-lg font-semibold">{info.name}</h2>
            {info.guaranteesShortestPath ? (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400">
                Optimal
              </span>
            ) : (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                Not optimal
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{info.description}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          {isComplete && !noPath && (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
              Path found!
            </span>
          )}
          {noPath && (
            <span className="text-xs font-medium text-red-600 dark:text-red-400 whitespace-nowrap">
              No path exists
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
        <div className="flex gap-2">
          <span className="text-gray-400 dark:text-gray-500">Time:</span>
          <span className="text-blue-600 dark:text-blue-400 font-mono">{info.complexity.time}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-400 dark:text-gray-500">Space:</span>
          <span className="text-purple-600 dark:text-purple-400 font-mono">{info.complexity.space}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-400 dark:text-gray-500">Visited:</span>
          <span className="text-amber-600 dark:text-amber-400 font-mono tabular-nums">{visitedCount}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-400 dark:text-gray-500">Path length:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
            {noPath ? '—' : isComplete ? pathLength : '—'}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-400 dark:text-gray-500">Heuristic:</span>
          <span className="text-gray-600 dark:text-gray-300">{info.heuristic}</span>
        </div>
      </div>
    </div>
  );
}
