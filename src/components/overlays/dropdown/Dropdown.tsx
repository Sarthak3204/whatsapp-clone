import ItemList from "../../common/ItemList";
import type { DropdownProps } from "./types";

export default function Dropdown({ actionComponents }: DropdownProps) {
  return (
    <div className="fixed top-20 right-60 w-48 bg-[rgb(32,44,51)] rounded-lg shadow-xl border border-gray-600/50 py-1 z-[50]">
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
