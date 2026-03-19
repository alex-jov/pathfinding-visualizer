import { algorithms } from '../algorithms';

export default function Controls({
  algorithm,
  setAlgorithm,
  speed,
  setSpeed,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onReset,
  onClearGrid,
  onGenerateMaze,
  allowDiagonal,
  setAllowDiagonal,
  isComplete,
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      {/* Algorithm selector */}
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        disabled={isRunning}
        className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2
                   text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer
                   transition-colors duration-300"
      >
        {Object.entries(algorithms).map(([key, { info }]) => (
          <option key={key} value={key}>{info.name}</option>
        ))}
      </select>

      {/* Action buttons */}
      <div className="flex gap-2">
        {!isRunning && !isComplete && (
          <button
            onClick={onStart}
            className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-5 py-2
                       rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Visualize
          </button>
        )}

        {!isRunning && isComplete && (
          <button
            onClick={onStart}
            className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-5 py-2
                       rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Restart
          </button>
        )}

        {isRunning && !isPaused && (
          <button
            onClick={onPause}
            className="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white px-5 py-2
                       rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Pause
          </button>
        )}

        {isRunning && isPaused && (
          <button
            onClick={onResume}
            className="bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white px-5 py-2
                       rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Resume
          </button>
        )}

        <button
          onClick={onReset}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2
                     rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          Reset
        </button>

        <button
          onClick={onClearGrid}
          disabled={isRunning}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2
                     rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50
                     disabled:cursor-not-allowed"
        >
          Clear
        </button>

        <button
          onClick={onGenerateMaze}
          disabled={isRunning}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-4 py-2
                     rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50
                     disabled:cursor-not-allowed"
        >
          Maze
        </button>
      </div>

      {/* Speed slider */}
      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Speed</label>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-20 sm:w-28 accent-blue-500"
        />
      </div>

      {/* Diagonal toggle */}
      <button
        onClick={() => setAllowDiagonal(!allowDiagonal)}
        disabled={isRunning}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
          allowDiagonal
            ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
        }`}
      >
        Diagonal
      </button>
    </div>
  );
}
