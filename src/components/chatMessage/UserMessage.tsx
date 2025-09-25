import type { Message } from "../../types";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import Timestamp from "../Timestamp";
import { ACTION_TYPES } from "../actions/ActionHandler";
import type { UseActionsReturnType } from "../../hooks/useActions";
import { memo } from "react";
import { useViewMode } from "../../context/ViewModeContext";

type UserMessageProps = {
  message: Message;
  onAction: UseActionsReturnType[1];
};

const UserMessage = memo(function UserMessage({
  message,
  onAction,
}: UserMessageProps) {
  const { viewMode } = useViewMode();

  return (
    <li className="flex justify-end mb-2">
      <div className="group relative max-w-xs lg:max-w-md py-2 px-3 rounded-lg bg-[rgb(0,95,78)] text-white">
        <div className="absolute -top-3 right-6">
          <EditButton
            onClick={() =>
              onAction({
                type: ACTION_TYPES.TOGGLE,
                actionName: `edit-${message.id}`,
              })
            }
          />
        </div>
        <div className="absolute -top-3 -right-2">
          <DeleteButton
            onClick={() =>
              onAction({
                type: ACTION_TYPES.TOGGLE,
                actionName: `delete-${message.id}`,
              })
            }
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
    </li>
  );
});

export default UserMessage;
