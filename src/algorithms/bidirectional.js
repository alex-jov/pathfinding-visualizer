import { CellType, getNeighbors } from '../utils/grid';

export function bidirectional(grid, startPos, endPos, allowDiagonal) {
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
        parentForward: null,
        parentBackward: null,
      };
    }
  }

  const start = nodes[startPos.row][startPos.col];
  const end = nodes[endPos.row][endPos.col];

  const visitedForward = new Set();
  const visitedBackward = new Set();
  const queueForward = [start];
  const queueBackward = [end];

  visitedForward.add(`${start.row},${start.col}`);
  visitedBackward.add(`${end.row},${end.col}`);

  function buildPath(meetNode) {
    const pathForward = [];
    let current = meetNode;
    while (current) {
      pathForward.unshift({ row: current.row, col: current.col });
      current = current.parentForward;
    }

    const pathBackward = [];
    current = meetNode.parentBackward;
    while (current) {
      pathBackward.push({ row: current.row, col: current.col });
      current = current.parentBackward;
    }

    return [...pathForward, ...pathBackward];
  }

  while (queueForward.length > 0 || queueBackward.length > 0) {
    // Expand forward
    if (queueForward.length > 0) {
      const current = queueForward.shift();

      if (current !== start && current !== end) {
        steps.push({ type: 'visit', row: current.row, col: current.col });
      }

      if (visitedBackward.has(`${current.row},${current.col}`)) {
        const path = buildPath(current);
        steps.push({ type: 'path', path });
        return steps;
      }

      const neighbors = getNeighbors(nodes, current, allowDiagonal);
      for (const neighbor of neighbors) {
        const key = `${neighbor.row},${neighbor.col}`;
        if (visitedForward.has(key)) continue;
        if (neighbor.type === CellType.WALL) continue;

        visitedForward.add(key);
        neighbor.parentForward = current;

        if (visitedBackward.has(key)) {
          const path = buildPath(neighbor);
          steps.push({ type: 'path', path });
          return steps;
        }

        if (neighbor !== start && neighbor !== end) {
          steps.push({ type: 'frontier', row: neighbor.row, col: neighbor.col });
        }
        queueForward.push(neighbor);
      }
    }

    // Expand backward
    if (queueBackward.length > 0) {
      const current = queueBackward.shift();

      if (current !== start && current !== end) {
        steps.push({ type: 'visit', row: current.row, col: current.col });
      }

      if (visitedForward.has(`${current.row},${current.col}`)) {
        const path = buildPath(current);
        steps.push({ type: 'path', path });
        return steps;
      }

      const neighbors = getNeighbors(nodes, current, allowDiagonal);
      for (const neighbor of neighbors) {
        const key = `${neighbor.row},${neighbor.col}`;
        if (visitedBackward.has(key)) continue;
        if (neighbor.type === CellType.WALL) continue;

        visitedBackward.add(key);
        neighbor.parentBackward = current;

        if (visitedForward.has(key)) {
          const path = buildPath(neighbor);
          steps.push({ type: 'path', path });
          return steps;
        }

        if (neighbor !== start && neighbor !== end) {
          steps.push({ type: 'frontier', row: neighbor.row, col: neighbor.col });
        }
        queueBackward.push(neighbor);
      }
    }
  }

  steps.push({ type: 'nopath' });
  return steps;
}
