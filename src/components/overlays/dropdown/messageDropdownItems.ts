import {
  MESSAGE_ACTION_TYPES,
  type MessageActionPayload,
} from "../../messageList/actionHandler";
import type { Message } from "../../../types";
import type { ActionComponent } from "../actionHandler/types";

export const createMessageDropdownItems = (
  message: Message,
  onAction: (action: MessageActionPayload) => void,
  onCloseDropdown?: () => void
): ActionComponent[] => [
  {
    id: `delete-message-${message.id}`,
    actionName: "Delete Message",
    onClick: () => {
      // Close dropdown first
      onCloseDropdown?.();
      // Then trigger modal
      onAction({
        type: MESSAGE_ACTION_TYPES.TOGGLE_DELETE_MESSAGE_MODAL,
        payload: message.id,
      });
    },
  },
  {
    id: `edit-message-${message.id}`,
    actionName: "Edit Message",
    onClick: () => {
      // Close dropdown first
      onCloseDropdown?.();
      // Then trigger modal
      onAction({
        type: MESSAGE_ACTION_TYPES.TOGGLE_EDIT_MESSAGE_MODAL,
        payload: message.id,
      });
    },
  },
];
