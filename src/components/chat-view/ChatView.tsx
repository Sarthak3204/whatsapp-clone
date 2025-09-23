import { useEffect, useRef } from "react";
import TextComposer from "../message-composer/TextComposer";
import MessageList from "../chat-message/MessageList";
import ChatItem from "../chat-list/ChatItem";
import { useSelectedUser } from "../../context/SelectedUserContext";
import type { Message, User } from "../../types";

type ChatViewProps = {
  messages: Message[];
  onAddMessage: (user: User, message: Message) => void;
  onDeleteMessage: (userId: string, messageId: string) => void;
  onEditMessage: (userId: string, messageId: string, newText: string) => void;
};

export default function ChatView({
  messages,
  onAddMessage,
  onDeleteMessage,
  onEditMessage,
}: ChatViewProps) {
  const { selectedUser } = useSelectedUser();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <>
      <div className="bg-black border-b z-20">
        <ChatItem user={selectedUser} messages={messages} />
      </div>
      <div ref={scrollContainerRef} className="flex-1 z-10 overflow-y-auto">
        <MessageList
          messages={messages}
          onDeleteMessage={(messageId) =>
            selectedUser && onDeleteMessage(selectedUser.id, messageId)
          }
          onEditMessage={(messageId, newText) =>
            selectedUser && onEditMessage(selectedUser.id, messageId, newText)
          }
        />
      </div>
      <div className="z-20">
        <TextComposer
          onSubmit={(text) => {
            if (!selectedUser || text.trim() === "") return;
            const newMessage: Message = {
              id: Date.now().toString(),
              text: text.trim(),
              timestamp: new Date(),
            };
            onAddMessage(selectedUser, newMessage);
          }}
        />
      </div>
    </>
  );
}
