import { memo } from "react";
import type { User, Message } from "../../types";
import type { ChatActionComponent } from "./actionHandler";
import { useViewMode } from "../../context/ViewModeContext";
import DropdownMenu from "../overlays/DropdownMenu";
import Tooltip from "../overlays/Tooltip";

type ChatItemProps = {
  user: User;
  messages: Message[];
  dropdownItems: ChatActionComponent[];
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
};

const ChatItem = memo(function ChatItem({
  user,
  messages,
  dropdownItems,
  isDropdownOpen,
  onToggleDropdown,
}: ChatItemProps) {
  const { viewMode } = useViewMode();
  const latestMessage = messages.at(-1);

  return (
    <div className="relative flex p-3 rounded-lg transition-all duration-200 group cursor-pointer hover:bg-[rgb(42,48,55)]">
      <div className="flex justify-center items-center px-2">
        <img
          className="rounded-full w-12 h-12 ring-2 ring-transparent group-hover:ring-gray-600/20 transition-all duration-200"
          src={user.profileImage}
          alt=""
        />
      </div>
      <div className="ml-3 flex flex-col justify-center text-white flex-1 min-w-0">
        <div className="font-medium text-gray-100 group-hover:text-white transition-colors duration-200">
          {user.name}
        </div>
        {viewMode === "compact" && (
          <Tooltip content={latestMessage?.text || "No messages yet"}>
            <div className="text-sm text-gray-400 truncate max-w-[200px] group-hover:text-gray-300 transition-colors duration-200">
              {latestMessage ? latestMessage.text : "No messages yet"}
            </div>
          </Tooltip>
        )}
      </div>

      <div
        className={`absolute top-1/2 -translate-y-1/2 right-1 z-10 transition-opacity duration-200 ${
          isDropdownOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
        }`}
      >
        <DropdownMenu
          dropdownItems={dropdownItems}
          variant="ghost"
          size="sm"
          isOpen={isDropdownOpen}
          onToggle={onToggleDropdown}
        />
      </div>
    </div>
  );
});

export default ChatItem;
