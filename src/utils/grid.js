export const CellType = {
  EMPTY: 'empty',
  WALL: 'wall',
  START: 'start',
  END: 'end',
  VISITED: 'visited',
  FRONTIER: 'frontier',
  PATH: 'path',
};

export function createGrid(rows, cols, startPos, endPos) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        row: r,
        col: c,
        type: CellType.EMPTY,
        distance: Infinity,
        heuristic: 0,
        fScore: Infinity,
        parent: null,
      });
    }
    grid.push(row);
  }
  grid[startPos.row][startPos.col].type = CellType.START;
  grid[startPos.row][startPos.col].distance = 0;
  grid[endPos.row][endPos.col].type = CellType.END;
  return grid;
}

export function getNeighbors(grid, node, allowDiagonal) {
  const { row, col } = node;
  const rows = grid.length;
  const cols = grid[0].length;
  const neighbors = [];

  const dirs = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
  ];
  if (allowDiagonal) {
    dirs.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
  }

  for (const [dr, dc] of dirs) {
    const nr = row + dr;
    const nc = col + dc;
    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
      neighbors.push(grid[nr][nc]);
    }
  }
  return neighbors;
}

export function reconstructPath(endNode) {
  const path = [];
  let current = endNode;
  while (current) {
    path.unshift({ row: current.row, col: current.col });
    current = current.parent;
  }
  return path;
}

export function heuristic(a, b, allowDiagonal) {
  if (allowDiagonal) {
    // Octile distance
    const dx = Math.abs(a.row - b.row);
    const dy = Math.abs(a.col - b.col);
    return dx + dy + (Math.SQRT2 - 2) * Math.min(dx, dy);
  }
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

export function generateMaze(rows, cols, startPos, endPos, density = 0.3) {
  const walls = new Set();
  const protect = new Set();
  // Protect a small radius around start and end so they're never boxed in
  for (const pos of [startPos, endPos]) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        protect.add(`${pos.row + dr},${pos.col + dc}`);
      }
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (protect.has(`${r},${c}`)) continue;
      if (Math.random() < density) {
        walls.add(`${r},${c}`);
      }
    }
  }
  return walls;
}
