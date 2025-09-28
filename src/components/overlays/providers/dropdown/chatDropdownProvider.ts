import { useCallback } from "react";
import {
  CHAT_ACTION_TYPES,
  type ChatActionPayload,
} from "../../../chatList/actionHandler";
import type { User } from "../../../../types";

const chatDropdownProvider = useCallback(
  (user: User, onAction: (action: ChatActionPayload) => void) => [
    {
      id: `delete-contact-${user.id}`,
      actionName: "Delete Contact",
      onClick: () => {
        onAction({
          type: CHAT_ACTION_TYPES.TOGGLE_DELETE_CHAT_MODAL,
          payload: { userId: user.id },
        });
      },
    },
    {
      id: `delete-conversation-${user.id}`,
      actionName: "Delete Conversation",
      onClick: () => {
        onAction({
          type: CHAT_ACTION_TYPES.TOGGLE_DELETE_CONVERSATION_MODAL,
          payload: { userId: user.id },
        });
      },
    },
  ],
  []
);

export default chatDropdownProvider;
