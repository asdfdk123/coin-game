export default function Block({ value, index, onBlockMouseDown, onBlockMouseEnter, isSelected }) {
  return (
    <div
      onMouseDown={() => onBlockMouseDown(index)}
      onMouseEnter={() => onBlockMouseEnter(index)}
      className={`w-10 h-10 flex items-center justify-center rounded shadow text-sm font-bold
        ${value ? "bg-orange-400 text-white" : "bg-gray-200 text-gray-400"}
        ${isSelected ? "ring-2 ring-blue-400" : ""}
      `}
    >
      {value ?? ""}
    </div>
  );
}
