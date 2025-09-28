import {
  CHAT_ACTION_TYPES,
  type ChatActionPayload,
} from "../../chatList/actionHandler";
import type { User } from "../../../types";
import type { ActionComponent } from "../actionHandler/types";

export const createChatDropdownItems = (
  user: User,
  onAction: (action: ChatActionPayload) => void,
  onCloseDropdown?: () => void
): ActionComponent[] => [
  {
    id: `delete-contact-${user.id}`,
    actionName: "Delete Contact",
    onClick: () => {
      // Close dropdown first
      onCloseDropdown?.();
      // Then trigger modal
      onAction({
        type: CHAT_ACTION_TYPES.TOGGLE_DELETE_CHAT_MODAL,
        payload: user.id,
      });
    },
  },
  {
    id: `delete-conversation-${user.id}`,
    actionName: "Delete Conversation",
    onClick: () => {
      // Close dropdown first
      onCloseDropdown?.();
      // Then trigger modal
      onAction({
        type: CHAT_ACTION_TYPES.TOGGLE_DELETE_CONVERSATION_MODAL,
        payload: user.id,
      });
    },
  },
];
