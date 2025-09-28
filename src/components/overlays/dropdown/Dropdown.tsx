import ItemList from "../../common/ItemList";
import type { DropdownProps } from "./types";

export default function Dropdown({
  actionComponents,
  position,
}: DropdownProps) {
  const positionStyle = position
    ? { left: position.x, top: position.y }
    : { left: 0, top: 0 };

  return (
    <div
      className="fixed z-50 w-48 bg-[rgb(32,44,51)] rounded-lg shadow-xl border border-gray-600/50 py-1"
      style={positionStyle}
    >
      <ItemList
        items={actionComponents}
        renderItem={({ actionName, onClick }) => (
          <button
            onClick={onClick}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-gray-600/30 hover:text-white transition-colors duration-150"
          >
            <span className="font-medium">{actionName}</span>
          </button>
        )}
      />
    </div>
  );
}
