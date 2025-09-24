import UserMessage from "./UserMessage";
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
  const userMessages = messages.map((message) => (
    <UserMessage
      key={message.id}
      selectedUser={selectedUser}
      message={message}
      onDeleteMessage={onDeleteMessage}
      onEditMessage={onEditMessage}
    />
  ));

  return (
    <>
      {messages.length !== 0 ? (
        <ul className="p-4">{userMessages}</ul>
      ) : (
        <div className="text-center text-gray-400 mt-20">No messages yet</div>
      )}
    </>
  );
}
