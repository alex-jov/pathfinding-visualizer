import { CellType, getNeighbors, reconstructPath } from '../utils/grid';

export function dijkstra(grid, startPos, endPos, allowDiagonal) {
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
        parent: null,
      };
    }
  }

  const start = nodes[startPos.row][startPos.col];
  const end = nodes[endPos.row][endPos.col];
  start.distance = 0;

  const unvisited = new Set();
  // Use a simple priority approach with a sorted array (fine for grid sizes)
  const queue = [start];
  const visited = new Set();

  while (queue.length > 0) {
    // Sort by distance (simple min-heap substitute)
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift();

    const key = `${current.row},${current.col}`;
    if (visited.has(key)) continue;
    visited.add(key);

    if (current.distance === Infinity) break;

    // Record visit step
    if (current !== start && current !== end) {
      steps.push({ type: 'visit', row: current.row, col: current.col });
    }

    // Found end
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
      const newDist = current.distance + weight;

      if (newDist < neighbor.distance) {
        neighbor.distance = newDist;
        neighbor.parent = current;
        // Record frontier step
        if (neighbor !== end) {
          steps.push({ type: 'frontier', row: neighbor.row, col: neighbor.col });
        }
        queue.push(neighbor);
      }
    }
  }

  // No path found
  steps.push({ type: 'nopath' });
  return steps;
}
