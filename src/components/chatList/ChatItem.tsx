import { memo } from "react";
import type { User, Message } from "../../types";
import DropdownButton from "../buttons/DropdownButton";
import { OVERLAY_ACTION_TYPES } from "../overlays/actionHandler";
import type { OverlayActionPayload } from "../overlays/actionHandler";
import type { ChatActionComponent } from "./actionHandler";
import { useViewMode } from "../../context/ViewModeContext";

type ChatItemProps = {
  user: User;
  messages: Message[];
  onOverlayAction: (action: OverlayActionPayload) => void;
  dropdownItems: ChatActionComponent[];
  isDropdownOpen?: boolean;
};

const ChatItem = memo(function ChatItem({
  user,
  messages,
  onOverlayAction,
  dropdownItems,
  isDropdownOpen = false,
}: ChatItemProps) {
  const { viewMode } = useViewMode();
  const latestMessage = messages.at(-1);

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();

    onOverlayAction({
      type: OVERLAY_ACTION_TYPES.TOGGLE_DROPDOWN,
      payload: {
        dropdownItems,
        position: {
          x: rect.right + 8,
          y: rect.top,
        },
      },
    });
  };

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
          <div
            className="text-sm text-gray-400 truncate max-w-[200px] group-hover:text-gray-300 transition-colors duration-200"
            title={latestMessage ? latestMessage.text : "No messages yet"}
          >
            {latestMessage ? latestMessage.text : "No messages yet"}
          </div>
        )}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
        <DropdownButton
          onClick={handleDropdownClick}
          variant="ghost"
          size="sm"
          isOpen={isDropdownOpen}
        />
      </div>
    </div>
  );
});

export default ChatItem;
