import ChatItem from "./ChatItem";
import { useSelectedUser } from "../../context/SelectedUserContext";
import type { User, Message } from "../../types";

type ChatListProps = {
  connections: User[];
  onDeleteConnection: (userId: string) => void;
  getMessages: (userId: string) => Message[];
};

export default function ChatList({
  connections,
  onDeleteConnection,
  getMessages,
}: ChatListProps) {
  const { selectedUser, setSelectedUser } = useSelectedUser();

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
        onDelete={onDeleteConnection}
        messages={getMessages(user.id)}
      />
    </li>
  ));
  return <ul className="p-2 space-y-1 overflow-y-auto h-full">{chatList}</ul>;
}
