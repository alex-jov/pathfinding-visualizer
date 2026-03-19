import Cell from './Cell';

export default function Grid({ grid, onMouseDown, onMouseEnter, onMouseUp }) {
  const cols = grid[0]?.length || 0;

  return (
    <div
      className="grid gap-0"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      role="grid"
      onContextMenu={(e) => e.preventDefault()}
    >
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <Cell
            key={`${r}-${c}`}
            row={r}
            col={c}
            type={cell.type}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
          />
        ))
      )}
    </div>
  );
}
