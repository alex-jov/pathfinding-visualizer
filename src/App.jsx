import { useState, useCallback, useRef, useEffect } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';
import Legend from './components/Legend';
import AlgorithmInfo from './components/AlgorithmInfo';
import Header from './components/Header';
import { CellType, createGrid, generateMaze } from './utils/grid';
import { algorithms } from './algorithms';

const ROWS = 20;
const COLS = 40;
const DEFAULT_START = { row: 10, col: 5 };
const DEFAULT_END = { row: 10, col: 34 };

function cloneGrid(grid) {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [grid, setGrid] = useState(() => createGrid(ROWS, COLS, DEFAULT_START, DEFAULT_END));
  const [startPos, setStartPos] = useState(DEFAULT_START);
  const [endPos, setEndPos] = useState(DEFAULT_END);
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const [speed, setSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [noPath, setNoPath] = useState(false);
  const [allowDiagonal, setAllowDiagonal] = useState(false);
  const [visitedCount, setVisitedCount] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [dragging, setDragging] = useState(null);

  const animationRef = useRef(null);
  const pauseRef = useRef(false);
  const cancelRef = useRef(false);
  const stepsRef = useRef([]);
  const stepIndexRef = useRef(0);
  const gridRef = useRef(grid);
  gridRef.current = grid;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const speedToDelay = (s) => Math.max(1, 101 - s);

  const handleMouseDown = useCallback((row, col) => {
    if (isRunning) return;
    const cell = grid[row][col];

    if (cell.type === CellType.START) {
      setDragging('start');
      setMouseIsPressed(true);
      return;
    }
    if (cell.type === CellType.END) {
      setDragging('end');
      setMouseIsPressed(true);
      return;
    }

    setGrid(prev => {
      const newGrid = cloneGrid(prev);
      newGrid[row][col].type = cell.type === CellType.WALL ? CellType.EMPTY : CellType.WALL;
      return newGrid;
    });
    setMouseIsPressed(true);
    setDragging(null);
  }, [grid, isRunning]);

  const handleMouseEnter = useCallback((row, col) => {
    if (!mouseIsPressed || isRunning) return;

    if (dragging === 'start') {
      setGrid(prev => {
        const newGrid = cloneGrid(prev);
        newGrid[startPos.row][startPos.col].type = CellType.EMPTY;
        newGrid[row][col].type = CellType.START;
        return newGrid;
      });
      setStartPos({ row, col });
      return;
    }

    if (dragging === 'end') {
      setGrid(prev => {
        const newGrid = cloneGrid(prev);
        newGrid[endPos.row][endPos.col].type = CellType.EMPTY;
        newGrid[row][col].type = CellType.END;
        return newGrid;
      });
      setEndPos({ row, col });
      return;
    }

    const cell = grid[row][col];
    if (cell.type === CellType.START || cell.type === CellType.END) return;
    setGrid(prev => {
      const newGrid = cloneGrid(prev);
      newGrid[row][col].type = CellType.WALL;
      return newGrid;
    });
  }, [mouseIsPressed, dragging, grid, isRunning, startPos, endPos]);

  const handleMouseUp = useCallback(() => {
    setMouseIsPressed(false);
    setDragging(null);
  }, []);

  const resetPath = useCallback(() => {
    cancelRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
    setIsComplete(false);
    setNoPath(false);
    setVisitedCount(0);
    setPathLength(0);
    stepsRef.current = [];
    stepIndexRef.current = 0;

    setGrid(prev => {
      const newGrid = cloneGrid(prev);
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const t = newGrid[r][c].type;
          if (t === CellType.VISITED || t === CellType.FRONTIER || t === CellType.PATH) {
            newGrid[r][c].type = CellType.EMPTY;
          }
        }
      }
      return newGrid;
    });
  }, []);

  const clearGrid = useCallback(() => {
    cancelRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
    setIsComplete(false);
    setNoPath(false);
    setVisitedCount(0);
    setPathLength(0);
    setStartPos(DEFAULT_START);
    setEndPos(DEFAULT_END);
    stepsRef.current = [];
    stepIndexRef.current = 0;
    setGrid(createGrid(ROWS, COLS, DEFAULT_START, DEFAULT_END));
  }, []);

  const handleGenerateMaze = useCallback(() => {
    if (isRunning) return;
    resetPath();
    const walls = generateMaze(ROWS, COLS, startPos, endPos);
    setGrid(() => {
      const newGrid = createGrid(ROWS, COLS, startPos, endPos);
      for (const key of walls) {
        const [r, c] = key.split(',').map(Number);
        if (newGrid[r][c].type === CellType.EMPTY) {
          newGrid[r][c].type = CellType.WALL;
        }
      }
      return newGrid;
    });
  }, [isRunning, startPos, endPos, resetPath]);

  const animateSteps = useCallback((steps, startIdx) => {
    cancelRef.current = false;
    let visitCount = startIdx > 0 ? steps.slice(0, startIdx).filter(s => s.type === 'visit').length : 0;

    function doStep(i) {
      if (cancelRef.current) return;
      if (pauseRef.current) {
        stepIndexRef.current = i;
        return;
      }
      if (i >= steps.length) {
        setIsRunning(false);
        setIsComplete(true);
        return;
      }

      const s = steps[i];

      if (s.type === 'visit') {
        visitCount++;
        const vc = visitCount;
        setGrid(prev => {
          const newGrid = cloneGrid(prev);
          if (newGrid[s.row][s.col].type !== CellType.START && newGrid[s.row][s.col].type !== CellType.END) {
            newGrid[s.row][s.col].type = CellType.VISITED;
          }
          return newGrid;
        });
        setVisitedCount(vc);
      } else if (s.type === 'frontier') {
        setGrid(prev => {
          const newGrid = cloneGrid(prev);
          const cell = newGrid[s.row][s.col];
          if (cell.type !== CellType.START && cell.type !== CellType.END && cell.type !== CellType.VISITED) {
            cell.type = CellType.FRONTIER;
          }
          return newGrid;
        });
      } else if (s.type === 'path') {
        setPathLength(s.path.length - 1);
        let pi = 0;
        function animatePath() {
          if (cancelRef.current) return;
          if (pi >= s.path.length) {
            setIsRunning(false);
            setIsComplete(true);
            return;
          }
          const p = s.path[pi];
          setGrid(prev => {
            const newGrid = cloneGrid(prev);
            if (newGrid[p.row][p.col].type !== CellType.START && newGrid[p.row][p.col].type !== CellType.END) {
              newGrid[p.row][p.col].type = CellType.PATH;
            }
            return newGrid;
          });
          pi++;
          animationRef.current = setTimeout(animatePath, 30);
        }
        animatePath();
        return;
      } else if (s.type === 'nopath') {
        setNoPath(true);
        setIsRunning(false);
        setIsComplete(true);
        return;
      }

      animationRef.current = setTimeout(() => doStep(i + 1), speedToDelay(speed));
    }

    doStep(startIdx);
  }, [speed]);

  const handleStart = useCallback(() => {
    cancelRef.current = true;
    pauseRef.current = false;
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }

    const currentGrid = gridRef.current;
    const wallGrid = createGrid(ROWS, COLS, startPos, endPos);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (currentGrid[r][c].type === CellType.WALL) {
          wallGrid[r][c].type = CellType.WALL;
        }
      }
    }

    const cleanVisual = cloneGrid(wallGrid);
    setGrid(cleanVisual);

    const algoFn = algorithms[algorithm].fn;
    const steps = algoFn(wallGrid, startPos, endPos, allowDiagonal);
    stepsRef.current = steps;
    stepIndexRef.current = 0;

    setVisitedCount(0);
    setPathLength(0);
    setIsComplete(false);
    setNoPath(false);
    setIsRunning(true);
    setIsPaused(false);

    setTimeout(() => {
      cancelRef.current = false;
      animateSteps(steps, 0);
    }, 50);
  }, [algorithm, startPos, endPos, allowDiagonal, animateSteps]);

  const handlePause = useCallback(() => {
    pauseRef.current = true;
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    pauseRef.current = false;
    setIsPaused(false);
    animateSteps(stepsRef.current, stepIndexRef.current);
  }, [animateSteps]);

  useEffect(() => {
    return () => {
      cancelRef.current = true;
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setMouseIsPressed(false);
      setDragging(null);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(d => !d)} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-3 sm:px-6 py-4 sm:py-6 flex flex-col gap-4 sm:gap-5">
        <AlgorithmInfo
          algorithm={algorithm}
          visitedCount={visitedCount}
          pathLength={pathLength}
          isComplete={isComplete}
          noPath={noPath}
        />

        <Controls
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          speed={speed}
          setSpeed={setSpeed}
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onReset={resetPath}
          onClearGrid={clearGrid}
          onGenerateMaze={handleGenerateMaze}
          allowDiagonal={allowDiagonal}
          setAllowDiagonal={setAllowDiagonal}
          isComplete={isComplete}
        />

        <Legend />

        <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-3 sm:p-4 min-h-[300px] transition-colors duration-300">
          <Grid
            grid={grid}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
          />
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 text-center text-xs text-gray-400 dark:text-gray-600 transition-colors duration-300">
        Built with React + Vite + Tailwind CSS
      </footer>
    </div>
  );
}
