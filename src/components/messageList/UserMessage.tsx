import type { Message } from "../../types";
import Timestamp from "../Timestamp";
import { memo } from "react";
import { useViewMode } from "../../context/ViewModeContext";
import type { MessageActionComponent } from "./actionHandler";
import DropdownMenu from "../overlays/DropdownMenu";

type UserMessageProps = {
  message: Message;
  dropdownItems: MessageActionComponent[];
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
};

const UserMessage = memo(function UserMessage({
  message,
  dropdownItems,
  isDropdownOpen,
  onToggleDropdown,
}: UserMessageProps) {
  const { viewMode } = useViewMode();

  return (
    <div className="group relative flex justify-end mb-2">
      <div className="max-w-xs lg:max-w-md py-2 px-3 rounded-lg bg-[rgb(0,95,78)] text-white">
        <div className="absolute top-1/2 -translate-y-1/2 right-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
          <DropdownMenu
            dropdownItems={dropdownItems}
            variant="ghost"
            size="sm"
            isOpen={isDropdownOpen}
            onToggle={onToggleDropdown}
          />
        </div>
        <p
          className={`text-sm whitespace-pre-wrap ${
            viewMode === "compact" && "pr-14"
          }`}
        >
          {message.text}
        </p>
        {viewMode === "compact" && (
          <div className="absolute bottom-1 right-2">
            <Timestamp timestamp={message.timestamp} />
          </div>
        )}
      </div>
    </div>
  );
});

export default UserMessage;
