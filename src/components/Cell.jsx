import { memo } from 'react';
import { CellType } from '../utils/grid';

function getCellClass(type) {
  switch (type) {
    case CellType.WALL: return 'cell-wall';
    case CellType.START: return 'cell-start';
    case CellType.END: return 'cell-end';
    case CellType.VISITED: return 'cell-visited';
    case CellType.FRONTIER: return 'cell-frontier';
    case CellType.PATH: return 'cell-path';
    default: return 'bg-white dark:bg-gray-900/80';
  }
}

const Cell = memo(function Cell({ row, col, type, onMouseDown, onMouseEnter, onMouseUp }) {
  return (
    <div
      className={`w-full aspect-square border border-gray-100 dark:border-gray-800/60 ${getCellClass(type)} cursor-pointer select-none`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp(row, col)}
      role="gridcell"
      aria-label={`Cell ${row},${col}: ${type}`}
    />
  );
});

export default Cell;
