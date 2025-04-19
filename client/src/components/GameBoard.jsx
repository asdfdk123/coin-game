import Block from "./Block";

export default function GameBoard({ board, selected, onBlockMouseDown, onBlockMouseEnter }) {
  return (
    <div
      className="grid gap-1 p-2 bg-yellow-100 rounded-md shadow-lg overflow-auto select-none"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(16, 2.5rem)`,
        gridTemplateRows: `repeat(10, 2.5rem)`,
        width: "fit-content",
        maxHeight: "90vh",
      }}
    >
      {board.map((value, index) => (
        <Block
          key={index}
          index={index}
          value={value}
          isSelected={selected.includes(index)}
          onBlockMouseDown={onBlockMouseDown}
          onBlockMouseEnter={onBlockMouseEnter}
        />
      ))}
    </div>
  );
}
