import { dijkstra } from './dijkstra';
import { astar } from './astar';
import { bfs } from './bfs';
import { dfs } from './dfs';
import { greedy } from './greedy';
import { bidirectional } from './bidirectional';

export const algorithms = {
  dijkstra: {
    fn: dijkstra,
    info: {
      name: "Dijkstra's Algorithm",
      description: 'Explores all directions equally, guaranteeing the shortest path by always expanding the nearest unvisited node.',
      complexity: { time: 'O(V + E log V)', space: 'O(V)' },
      heuristic: 'None — explores uniformly in all directions.',
      guaranteesShortestPath: true,
    },
  },
  astar: {
    fn: astar,
    info: {
      name: 'A* (A-Star)',
      description: 'Uses a heuristic to guide search toward the goal, often visiting fewer nodes than Dijkstra while still guaranteeing the shortest path.',
      complexity: { time: 'O(E log V)', space: 'O(V)' },
      heuristic: 'Manhattan distance (4-dir) or Octile distance (8-dir). Estimates remaining cost without overestimating.',
      guaranteesShortestPath: true,
    },
  },
  bfs: {
    fn: bfs,
    info: {
      name: 'Breadth-First Search',
      description: 'Explores nodes layer by layer outward from the start. Guarantees the shortest path on unweighted grids.',
      complexity: { time: 'O(V + E)', space: 'O(V)' },
      heuristic: 'None — explores level by level.',
      guaranteesShortestPath: true,
    },
  },
  dfs: {
    fn: dfs,
    info: {
      name: 'Depth-First Search',
      description: 'Explores as deep as possible along each branch before backtracking. Fast but does not guarantee the shortest path.',
      complexity: { time: 'O(V + E)', space: 'O(V)' },
      heuristic: 'None — explores depth-first using a stack.',
      guaranteesShortestPath: false,
    },
  },
  greedy: {
    fn: greedy,
    info: {
      name: 'Greedy Best-First',
      description: 'Always expands the node closest to the goal by heuristic. Very fast but does not guarantee the shortest path.',
      complexity: { time: 'O(E log V)', space: 'O(V)' },
      heuristic: 'Manhattan distance (4-dir) or Octile distance (8-dir). Ignores cost so far — purely goal-directed.',
      guaranteesShortestPath: false,
    },
  },
  bidirectional: {
    fn: bidirectional,
    info: {
      name: 'Bidirectional BFS',
      description: 'Runs two BFS searches simultaneously from start and end, meeting in the middle. Typically visits far fewer nodes.',
      complexity: { time: 'O(V + E)', space: 'O(V)' },
      heuristic: 'None — two simultaneous breadth-first expansions.',
      guaranteesShortestPath: true,
    },
  },
};
