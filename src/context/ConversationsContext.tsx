import { createContext, useContext, useState } from "react";
import type { Message } from "../types";

type ConversationsContextType = {
  conversations: Record<string, Message[]>;
  getMessages: (userId: string) => Message[];
  addMessage: (userId: string, message: Message) => void;
  deleteMessage: (userId: string, messageId: string) => void;
};

const ConversationsContext = createContext<
  ConversationsContextType | undefined
>(undefined);

export function ConversationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [conversations, setConversations] = useState<Record<string, Message[]>>(
    {}
  );

  const getMessages = (userId: string): Message[] => {
    return conversations[userId] || [];
  };

  const addMessage = (userId: string, message: Message) => {
    setConversations((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), message],
    }));
  };

  const deleteMessage = (userId: string, messageId: string) => {
    setConversations((prev) => ({
      ...prev,
      [userId]: (prev[userId] || []).filter((msg) => msg.id !== messageId),
    }));
  };

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        getMessages,
        addMessage,
        deleteMessage,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversations() {
  const context = useContext(ConversationsContext);
  if (context === undefined) {
    throw new Error(
      "useConversations must be used within a ConversationsProvider"
    );
  }
  return context;
}
