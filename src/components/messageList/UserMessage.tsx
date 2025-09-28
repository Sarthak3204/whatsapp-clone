import type { Message } from "../../types";
import Timestamp from "../Timestamp";
import { memo } from "react";
import { useViewMode } from "../../context/ViewModeContext";
import DropdownButton from "../buttons/DropdownButton";
import { OVERLAY_ACTION_TYPES } from "../overlays/actionHandler";
import type { OverlayActionPayload } from "../overlays/actionHandler";
import type { MessageActionComponent } from "./actionHandler";

type UserMessageProps = {
  message: Message;
  onOverlayAction: (action: OverlayActionPayload) => void;
  dropdownItems: MessageActionComponent[];
  isDropdownOpen?: boolean;
};

const UserMessage = memo(function UserMessage({
  message,
  onOverlayAction,
  dropdownItems,
  isDropdownOpen = false,
}: UserMessageProps) {
  const { viewMode } = useViewMode();

  return (
    <div className="group relative flex justify-end mb-2">
      <div className="max-w-xs lg:max-w-md py-2 px-3 rounded-lg bg-[rgb(0,95,78)] text-white">
        <div className="absolute top-1/2 -translate-y-1/2 right-1 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
          <DropdownButton
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();

              onOverlayAction({
                type: OVERLAY_ACTION_TYPES.TOGGLE_DROPDOWN,
                payload: {
                  dropdownItems,
                  position: {
                    x: rect.left - 160, // Position to the left of message
                    y: rect.top,
                  },
                },
              });
            }}
            variant="ghost"
            size="sm"
            isOpen={isDropdownOpen}
            className="text-gray-300 hover:text-white hover:bg-gray-600/50"
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
