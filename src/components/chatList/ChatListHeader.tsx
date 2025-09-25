import { memo } from "react";
import { ACTION_TYPES } from "../actions/ActionHandler";
import NewChatButton from "../buttons/NewChatButton";
import type { UseActionsReturnType } from "../../hooks/useActions";
import { useViewMode } from "../../context/ViewModeContext";

const ChatListHeader = memo(function ChatListHeader({
  onAction,
}: {
  onAction: UseActionsReturnType[1];
}) {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <div className="m-2 px-2 flex justify-between items-center">
      <div className="p-2.5 text-white text-2xl font-medium">
        <h1>WhatsApp</h1>
      </div>
      <div className="p-2.5 gap-4 flex items-center space-x-3">
        <NewChatButton
          onClick={() =>
            onAction({ type: ACTION_TYPES.TOGGLE, actionName: "newChat" })
          }
        />
        <button
          onClick={toggleViewMode}
          className="text-white text-xs px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
          title={`Switch to ${
            viewMode === "compact" ? "spacious" : "compact"
          } mode`}
        >
          {viewMode === "compact" ? "Compact" : "Spacious"}
        </button>
      </div>
    </div>
  );
});

export default ChatListHeader;
