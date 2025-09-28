import UserMessage from "./UserMessage";
import ItemList from "../common/ItemList";
import { MessageActionHandler, MESSAGE_ACTION_TYPES } from "./actionHandler";
import type { MessageActionPayload } from "./actionHandler";
import type { OverlayActionPayload } from "../overlays/actionHandler";
import type { Message, User } from "../../types";
import { useCallback, memo } from "react";

type MessageListProps = {
  selectedUser: User;
  messages: Message[];
  onDeleteMessage: (userId: string, messageId: string) => void;
  onEditMessage: (userId: string, messageId: string, newText: string) => void;
  onOverlayAction: (action: OverlayActionPayload) => void;
};

const MessageList = memo(function MessageList({
  selectedUser,
  messages,
  onDeleteMessage,
  onEditMessage,
  onOverlayAction,
}: MessageListProps) {
  const handleMessageAction = useCallback(
    (action: MessageActionPayload) => {
      switch (action.type) {
        case MESSAGE_ACTION_TYPES.DELETE_MESSAGE_CONFIRMATION:
          onDeleteMessage(selectedUser.id, action.payload?.messageId as string);
          break;

        case MESSAGE_ACTION_TYPES.EDIT_MESSAGE_CONFIRMATION:
          const { messageId, newText } = action.payload as {
            messageId: string;
            newText: string;
          };
          onEditMessage(selectedUser.id, messageId, newText);
          break;

        default:
          console.log("Unknown message action:", action);
          break;
      }
    },
    [selectedUser.id, onDeleteMessage, onEditMessage]
  );

  return (
    <ItemList<Message>
      items={messages}
      className="p-4"
      emptyMessage="No messages yet"
      renderItem={(message) => (
        <MessageActionHandler
          onChange={handleMessageAction}
          onOverlayAction={onOverlayAction}
          message={message}
        >
          {({ dropdownItems, isPopoverOpen }) => {
            return (
              <UserMessage
                message={message}
                onOverlayAction={onOverlayAction}
                dropdownItems={dropdownItems}
                isDropdownOpen={isPopoverOpen}
              />
            );
          }}
        </MessageActionHandler>
      )}
    />
  );
});

export default MessageList;
