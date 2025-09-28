import { useCallback } from "react";
import {
  MESSAGE_ACTION_TYPES,
  type MessageActionPayload,
} from "../../../messageList/actionHandler";
import type { Message } from "../../../../types";

const messageDropdownProvider = useCallback(
  (message: Message, onAction: (action: MessageActionPayload) => void) => [
    {
      id: `edit-message-${message.id}`,
      actionName: "Edit Message",
      onClick: () => {
        onAction({
          type: MESSAGE_ACTION_TYPES.TOGGLE_EDIT_MESSAGE_MODAL,
          payload: { messageId: message.id },
        });
      },
    },
    {
      id: `delete-message-${message.id}`,
      actionName: "Delete Message",
      onClick: () => {
        onAction({
          type: MESSAGE_ACTION_TYPES.TOGGLE_DELETE_MESSAGE_MODAL,
          payload: { messageId: message.id },
        });
      },
    },
  ],
  []
);

export default messageDropdownProvider;
