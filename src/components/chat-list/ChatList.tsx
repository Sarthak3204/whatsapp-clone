import ChatItem from "./ChatItem";
import { useSelectedUser } from "../../context/SelectedUserContext";
import type { User, Message } from "../../types";
import { useCallback } from "react";

type ChatListProps = {
  connections: User[];
  setConnections: (update: (prev: User[]) => User[]) => void;
  deleteConversation: (userId: string) => void;
  getMessages: (userId: string) => Message[];
};

export default function ChatList({
  connections,
  setConnections,
  deleteConversation,
  getMessages,
}: ChatListProps) {
  const { selectedUser, setSelectedUser } = useSelectedUser();

  const handleDeleteConnection = useCallback(
    (userId: string) => {
      setConnections((prev) => prev.filter((user) => user.id !== userId));
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
      deleteConversation(userId);
    },
    [selectedUser]
  );

  const chatList = connections.map((user) => (
    <li
      key={user.id}
      className={`${
        selectedUser?.id === user.id
          ? "bg-[rgb(60,61,61)]"
          : "hover:bg-[rgb(36,38,38)]"
      } rounded-xl`}
      onClick={() => setSelectedUser(user)}
    >
      <ChatItem
        user={user}
        onDelete={handleDeleteConnection}
        messages={getMessages(user.id)}
      />
    </li>
  ));
  return <ul className="p-2 space-y-1 overflow-y-auto h-full">{chatList}</ul>;
}
