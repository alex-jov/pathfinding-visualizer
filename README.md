# Pathfinding Visualizer

An interactive pathfinding visualizer built with React, Vite, and Tailwind CSS. Watch Dijkstra's and A* algorithms explore a grid and find the shortest path with smooth, step-by-step animations.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-cyan)

## Features

- **Dijkstra's Algorithm** and **A* (A-Star)** with animated step-by-step visualization
- **Interactive grid** — click & drag to draw walls, drag to reposition start/end nodes
- **Start / Pause / Resume** controls with adjustable speed slider
- **Diagonal movement** toggle (switches heuristic between Manhattan and Octile distance)
- **Maze generation** — random wall patterns at the click of a button
- **Live stats** — visited node count, path length, algorithm complexity
- **Light & dark mode** with smooth transitions
- **Responsive** — works on desktop and mobile

## Algorithms

**Dijkstra's** — Explores uniformly in all directions. Guarantees the shortest path but may visit many nodes.

**A\*** — Uses a heuristic to guide search toward the goal. Visits fewer nodes while still guaranteeing the shortest path.

## Run Locally

```bash
git clone https://github.com/alex-jov/pathfinding-visualizer.git
cd pathfinding-visualizer
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── algorithms/
│   ├── dijkstra.js       # Dijkstra's algorithm (returns animation steps)
│   └── astar.js          # A* algorithm (returns animation steps)
├── components/
│   ├── Header.jsx        # App header with dark mode toggle
│   ├── AlgorithmInfo.jsx # Algorithm details, complexity, live stats
│   ├── Controls.jsx      # Algorithm selector, buttons, speed slider
│   ├── Legend.jsx         # Color legend
│   ├── Grid.jsx          # Grid container
│   └── Cell.jsx          # Single grid cell (memoized)
├── utils/
│   └── grid.js           # Grid creation, neighbors, heuristics, maze gen
├── App.jsx               # Main app with state management and animation
├── main.jsx              # Entry point
└── index.css             # Tailwind imports and cell animations
```

## How It Works

1. Algorithms run on a grid snapshot and return a list of **steps** (visit, frontier, path, nopath)
2. The animation loop processes steps one at a time with `setTimeout`, respecting the speed slider
3. Pause/resume saves the current step index and restarts the loop from there
4. Cell animations use CSS `@keyframes` for smooth pop/glow effects

## License

MIT
