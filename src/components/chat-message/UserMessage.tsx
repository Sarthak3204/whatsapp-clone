import type { Message } from "../../types";
import { useChatMessages } from "../../hooks/useChatMessages";
import DeleteButton from "../buttons/DeleteButton";
import Timestamp from "../Timestamp";

export default function UserMessage({ message }: { message: Message }) {
  const { selectedUser, handleDeleteMessage } = useChatMessages();

  if (!selectedUser) return null;

  return (
    <li className="flex justify-end mb-2">
      <div className="group relative max-w-xs lg:max-w-md py-2 px-3 rounded-lg bg-[rgb(0,95,78)] text-white">
        <div className="absolute -top-2 -right-2">
          <DeleteButton onClick={() => handleDeleteMessage(message.id)} />
        </div>
        <p className="text-sm pr-14 whitespace-pre-wrap">{message.text}</p>
        <div className="absolute bottom-1 right-2">
          <Timestamp timestamp={message.timestamp} />
        </div>
      </div>
    </li>
  );
}
