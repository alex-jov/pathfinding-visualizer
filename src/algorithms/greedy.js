import { CellType, getNeighbors, reconstructPath, heuristic } from '../utils/grid';

export function greedy(grid, startPos, endPos, allowDiagonal) {
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
  const openSet = [{ node: start, h: heuristic(start, end, allowDiagonal) }];

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.h - b.h);
    const { node: current } = openSet.shift();

    const key = `${current.row},${current.col}`;
    if (visited.has(key)) continue;
    visited.add(key);

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
      const nKey = `${neighbor.row},${neighbor.col}`;
      if (visited.has(nKey)) continue;
      if (neighbor.type === CellType.WALL) continue;

      neighbor.parent = current;
      const h = heuristic(neighbor, end, allowDiagonal);

      if (neighbor !== end) {
        steps.push({ type: 'frontier', row: neighbor.row, col: neighbor.col });
      }
      openSet.push({ node: neighbor, h });
    }
  }

  steps.push({ type: 'nopath' });
  return steps;
}
