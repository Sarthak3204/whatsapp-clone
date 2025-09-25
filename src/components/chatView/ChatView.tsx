import { useEffect, useRef } from "react";
import TextComposer from "../messageComposer/TextComposer";
import MessageList from "../chatMessage/MessageList";
import ChatHeader from "./ChatHeader";
import type { Message, User } from "../../types";

type ChatViewProps = {
  selectedUser: User;
  messages: Message[];
  onAddMessage: (user: User, message: Message) => void;
  onDeleteMessage: (userId: string, messageId: string) => void;
  onEditMessage: (userId: string, messageId: string, newText: string) => void;
};

export default function ChatView({
  selectedUser,
  messages,
  onAddMessage,
  onDeleteMessage,
  onEditMessage,
}: ChatViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      <div className="bg-black border-b z-20">
        <ChatHeader user={selectedUser} />
      </div>
      <div ref={scrollContainerRef} className="flex-1 z-10 overflow-y-auto">
        <MessageList
          selectedUser={selectedUser}
          messages={messages}
          onDeleteMessage={onDeleteMessage}
          onEditMessage={onEditMessage}
        />
      </div>
      <div className="z-20">
        <TextComposer
          key={selectedUser.id}
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
