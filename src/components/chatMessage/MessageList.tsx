import UserMessage from "./UserMessage";
import ItemList from "../common/ItemList";
import {
  ChatMessageActionHandler,
  CHAT_MESSAGE_ACTION_TYPES,
} from "./actionHandler";
import type { ChatMessageActionPayload } from "./actionHandler";
import type { Message, User } from "../../types";
import { useCallback, memo } from "react";

type MessageListProps = {
  selectedUser: User;
  messages: Message[];
  onDeleteMessage: (userId: string, messageId: string) => void;
  onEditMessage: (userId: string, messageId: string, newText: string) => void;
};

const MessageList = memo(function MessageList({
  selectedUser,
  messages,
  onDeleteMessage,
  onEditMessage,
}: MessageListProps) {
  const handleMessageAction = useCallback(
    (action: ChatMessageActionPayload) => {
      switch (action.type) {
        case CHAT_MESSAGE_ACTION_TYPES.DELETE_MESSAGE_CONFIRMATION:
          onDeleteMessage(selectedUser.id, action.payload as string);
          break;

        case CHAT_MESSAGE_ACTION_TYPES.EDIT_MESSAGE_CONFIRMATION:
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

  const createMessageActionComponents = useCallback(
    (
      message: Message,
      onAction: (action: ChatMessageActionPayload) => void
    ) => [
      {
        id: `delete-message-${message.id}`,
        actionName: "Delete Message",
        onClick: () => {
          onAction({
            type: CHAT_MESSAGE_ACTION_TYPES.TOGGLE_DELETE_MESSAGE_MODAL,
            payload: message.id,
          });
        },
      },
      {
        id: `edit-message-${message.id}`,
        actionName: "Edit Message",
        onClick: () => {
          onAction({
            type: CHAT_MESSAGE_ACTION_TYPES.TOGGLE_EDIT_MESSAGE_MODAL,
            payload: message.id,
          });
        },
      },
    ],
    []
  );

  return (
    <ItemList<Message>
      items={messages}
      className="p-4"
      emptyMessage="No messages yet"
      renderItem={(message) => (
        <ChatMessageActionHandler
          actionComponents={(onAction) =>
            createMessageActionComponents(message, onAction)
          }
          onChange={handleMessageAction}
          messageToEdit={message}
        >
          {({ onOverlayAction, isPopoverOpen }) => {
            return (
              <UserMessage
                message={message}
                onAction={onOverlayAction}
                isDropdownOpen={isPopoverOpen}
              />
            );
          }}
        </ChatMessageActionHandler>
      )}
    />
  );
});

export default MessageList;
