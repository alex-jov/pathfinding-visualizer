import { CellType, getNeighbors, reconstructPath } from '../utils/grid';

export function bfs(grid, startPos, endPos, allowDiagonal) {
  const steps = [];
  const rows = grid.length;
  const cols = grid[0].length;

  const nodes = [];
  for (let r = 0; r < rows; r++) {
    nodes[r] = [];
    for (let c = 0; c < cols; c++) {
      nodes[r][c] = {
        row: r,
        col: c,
        type: grid[r][c].type,
        parent: null,
      };
    }
  }

  const start = nodes[startPos.row][startPos.col];
  const end = nodes[endPos.row][endPos.col];
  const visited = new Set();
  const queue = [start];
  visited.add(`${start.row},${start.col}`);

  while (queue.length > 0) {
    const current = queue.shift();

    if (current !== start && current !== end) {
      steps.push({ type: 'visit', row: current.row, col: current.col });
    }

    if (current.row === end.row && current.col === end.col) {
      const path = reconstructPath(current);
      steps.push({ type: 'path', path });
      return steps;
    }

    const neighbors = getNeighbors(nodes, current, allowDiagonal);
    for (const neighbor of neighbors) {
      const key = `${neighbor.row},${neighbor.col}`;
      if (visited.has(key)) continue;
      if (neighbor.type === CellType.WALL) continue;

      visited.add(key);
      neighbor.parent = current;

      if (neighbor !== end) {
        steps.push({ type: 'frontier', row: neighbor.row, col: neighbor.col });
      }
      queue.push(neighbor);
    }
  }

  steps.push({ type: 'nopath' });
  return steps;
}
