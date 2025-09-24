import ChatItem from "./ChatItem";
import ItemList from "../common/ItemList";
import type { User, Message } from "../../types";
import { memo, useCallback } from "react";

type ChatListProps = {
  connections: User[];
  setConnections: (update: (prev: User[]) => User[]) => void;
  deleteConversation: (userId: string) => void;
  getMessages: (userId: string) => Message[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

const ChatList = memo(function ChatList({
  connections,
  setConnections,
  deleteConversation,
  getMessages,
  selectedUser,
  setSelectedUser,
}: ChatListProps) {
  const handleDeleteConnection = useCallback((userId: string) => {
    setConnections((prev) => prev.filter((user) => user.id !== userId));
    setSelectedUser(null);
    deleteConversation(userId);
  }, []);

  return (
    <ItemList
      items={connections}
      className="p-2 space-y-1 overflow-y-auto h-full"
      emptyMessage="No conversations yet"
      emptyClassName="flex items-center justify-center h-full text-gray-400 text-lg"
      renderItem={(user) => (
        <div
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
        </div>
      )}
    />
  );
});

export default ChatList;
