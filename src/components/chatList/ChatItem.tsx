import { memo } from "react";
import type { User, Message } from "../../types";
import DeleteButton from "../buttons/DeleteButton";
import { ACTION_TYPES } from "../actions/ActionHandler";
import type { UseActionsReturnType } from "../../hooks/useActions";
import { useViewMode } from "../../context/ViewModeContext";

type ChatItemProps = {
  user: User;
  messages: Message[];
  onAction: UseActionsReturnType[1];
};

const ChatItem = memo(function ChatItem({
  user,
  messages,
  onAction,
}: ChatItemProps) {
  const { viewMode } = useViewMode();
  const latestMessage = messages.at(-1);

  return (
    <div className="relative flex p-2.5 rounded-lg transition-colors group cursor-pointer">
      <div className="flex justify-center items-center px-2">
        <img
          className="rounded-full w-12 h-12"
          src={user.profileImage}
          alt=""
        />
      </div>
      <div className="ml-2 flex flex-col justify-center text-white">
        <div className="font-medium">{user.name}</div>
        {viewMode === "compact" && (
          <div
            className="text-sm text-gray-400 truncate max-w-[200px]"
            title={latestMessage ? latestMessage.text : "No messages yet"}
          >
            {latestMessage ? latestMessage.text : "No messages yet"}
          </div>
        )}
      </div>

      <div className="absolute -top-2 -right-2">
        <DeleteButton
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onAction({
              type: ACTION_TYPES.TOGGLE,
              actionName: `delete-${user.id}`,
            });
          }}
        />
      </div>
    </div>
  );
});

export default ChatItem;
