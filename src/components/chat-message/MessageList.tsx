import UserMessage from "./UserMessage";
import type { Message } from "../../types";

type MessageListProps = {
  messages: Message[];
  onDeleteMessage: (messageId: string) => void;
  onEditMessage: (messageId: string, newText: string) => void;
};

export default function MessageList({
  messages,
  onDeleteMessage,
  onEditMessage,
}: MessageListProps) {
  const userMessages = messages.map((message) => (
    <UserMessage
      key={message.id}
      message={message}
      onDeleteMessage={() => onDeleteMessage(message.id)}
      onEditMessage={(newText) => onEditMessage(message.id, newText)}
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
