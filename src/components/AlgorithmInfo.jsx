const algorithmData = {
  dijkstra: {
    name: "Dijkstra's Algorithm",
    description: 'Explores all directions equally, guaranteeing the shortest path by always expanding the nearest unvisited node.',
    complexity: { time: 'O(V + E log V)', space: 'O(V)' },
    heuristic: 'None — explores uniformly in all directions.',
  },
  astar: {
    name: 'A* (A-Star)',
    description: 'Uses a heuristic to guide search toward the goal, often visiting fewer nodes than Dijkstra while still guaranteeing the shortest path.',
    complexity: { time: 'O(E log V)', space: 'O(V)' },
    heuristic: 'Manhattan distance (4-dir) or Octile distance (8-dir). Estimates remaining cost to goal without overestimating, ensuring optimality.',
  },
};

export default function AlgorithmInfo({ algorithm, visitedCount, pathLength, isComplete, noPath }) {
  const info = algorithmData[algorithm];

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-4 sm:p-5 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <h2 className="text-lg font-semibold mb-0.5">{info.name}</h2>
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
