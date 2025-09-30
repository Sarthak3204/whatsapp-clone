import UserMessage from "./UserMessage";
import ItemList from "../common/ItemList";
import { MessageActionHandler, MESSAGE_ACTION_TYPES } from "./actionHandler";
import type { MessageActionPayload } from "./actionHandler";
import type { Message, User } from "../../types";
import { useCallback, memo, useState } from "react";

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
  const [openDropdownMessageId, setOpenDropdownMessageId] = useState<
    string | null
  >(null);

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

        case MESSAGE_ACTION_TYPES.COPY_MESSAGE:
          const text = action.payload?.text as string;
          if (text) {
            navigator.clipboard.writeText(text).catch((err) => {
              console.error("Failed to copy message:", err);
            });
          }
          break;

        case MESSAGE_ACTION_TYPES.TOGGLE_MESSAGE_DROPDOWN: {
          const mid = action.payload?.messageId as string;
          setOpenDropdownMessageId((prev) => (prev === mid ? null : mid));
          break;
        }

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
          message={message}
          openDropdownMessageId={openDropdownMessageId}
        >
          {({ dropdownItems, isDropdownOpen, onToggleDropdown }) => {
            return (
              <UserMessage
                message={message}
                dropdownItems={dropdownItems}
                isDropdownOpen={isDropdownOpen}
                onToggleDropdown={onToggleDropdown}
              />
            );
          }}
        </MessageActionHandler>
      )}
    />
  );
});

export default MessageList;
