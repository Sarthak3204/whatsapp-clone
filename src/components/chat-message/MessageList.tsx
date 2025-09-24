import UserMessage from "./UserMessage";
import ItemList from "../common/ItemList";
import type { Message, User } from "../../types";

type MessageListProps = {
  selectedUser: User;
  messages: Message[];
  onDeleteMessage: (userId: string, messageId: string) => void;
  onEditMessage: (userId: string, messageId: string, newText: string) => void;
};

export default function MessageList({
  selectedUser,
  messages,
  onDeleteMessage,
  onEditMessage,
}: MessageListProps) {
  return (
    <ItemList
      items={messages}
      className="p-4"
      emptyMessage="No messages yet"
      renderItem={(message) => (
        <UserMessage
          selectedUser={selectedUser}
          message={message}
          onDeleteMessage={onDeleteMessage}
          onEditMessage={onEditMessage}
        />
      )}
    />
  );
}
