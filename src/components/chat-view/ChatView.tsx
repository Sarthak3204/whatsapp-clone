import { useEffect, useRef } from "react";
import TextComposer from "../message-composer/TextComposer";
import MessageList from "../chat-message/MessageList";
import ChatItem from "../chat-list/ChatItem";
import { useConversations } from "../../context/ConversationsContext";

export default function ChatView() {
  const { selectedUser, messages } = useConversations();
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
        <ChatItem user={selectedUser} />
      </div>
      <div ref={scrollContainerRef} className="flex-1 z-10 overflow-y-auto">
        <MessageList />
      </div>
      <div className="z-20">
        <TextComposer />
      </div>
    </>
  );
}
