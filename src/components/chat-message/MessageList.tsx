import UserMessage from "./UserMessage";
import { useConversations } from "../../context/ConversationsContext";

export default function MessageList() {
  const { selectedUser, messages } = useConversations();

  if (!selectedUser) return null;

  const userMessages = messages.map((message) => (
    <UserMessage key={message.id} message={message} />
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
