import { CellType, getNeighbors, reconstructPath, heuristic } from '../utils/grid';

export function astar(grid, startPos, endPos, allowDiagonal) {
  const steps = [];
  const rows = grid.length;
  const cols = grid[0].length;

  // Create working copy
  const nodes = [];
  for (let r = 0; r < rows; r++) {
    nodes[r] = [];
    for (let c = 0; c < cols; c++) {
      nodes[r][c] = {
        row: r,
        col: c,
        type: grid[r][c].type,
        distance: Infinity,
        fScore: Infinity,
        parent: null,
      };
    }
  }

  const start = nodes[startPos.row][startPos.col];
  const end = nodes[endPos.row][endPos.col];
  start.distance = 0;
  start.fScore = heuristic(start, end, allowDiagonal);

  const openSet = [start];
  const visited = new Set();

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.fScore - b.fScore);
    const current = openSet.shift();

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

      const isDiagonal = neighbor.row !== current.row && neighbor.col !== current.col;
      const weight = isDiagonal ? Math.SQRT2 : 1;
      const tentativeG = current.distance + weight;

      if (tentativeG < neighbor.distance) {
        neighbor.distance = tentativeG;
        neighbor.fScore = tentativeG + heuristic(neighbor, end, allowDiagonal);
        neighbor.parent = current;

        if (neighbor !== end) {
          steps.push({ type: 'frontier', row: neighbor.row, col: neighbor.col });
        }
        openSet.push(neighbor);
      }
    }
  }

  steps.push({ type: 'nopath' });
  return steps;
}
