import connections from "../../constants/connections";
import ChatItem from "./ChatItem";
import { useSelectedUser } from "../../context/SelectedUserContext";

export default function ChatList() {
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
      <ChatItem user={user} />
    </li>
  ));
  return <ul className="p-2 space-y-1">{chatList}</ul>;
}
