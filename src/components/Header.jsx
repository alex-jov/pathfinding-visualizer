export default function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800 px-4 py-4 sm:py-5 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            {/* Grid icon with path */}
            <rect x="2" y="2" width="12" height="12" rx="2" fill="#60a5fa" opacity="0.5" />
            <rect x="18" y="2" width="12" height="12" rx="2" fill="#60a5fa" opacity="0.3" />
            <rect x="2" y="18" width="12" height="12" rx="2" fill="#60a5fa" opacity="0.3" />
            <rect x="18" y="18" width="12" height="12" rx="2" fill="#60a5fa" opacity="0.5" />
            <circle cx="8" cy="8" r="3" fill="#34d399" />
            <circle cx="24" cy="24" r="3" fill="#f87171" />
            <path d="M8 8 L8 20 L24 20 L24 24" stroke="#fbbf24" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            Pathfinding Visualizer
          </h1>
        </div>

        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
