import { createContext, useContext, useState, useEffect } from "react";
import type { Message, User } from "../types";
import {
  loadConversationsFromStorage,
  saveConversationsToStorage,
  createUserKey,
  extractUserId,
} from "../utils";

type ConversationsContextType = {
  conversations: Record<string, Message[]>;
  getMessages: (userId: string) => Message[];
  addMessage: (user: User, message: Message) => void;
  deleteMessage: (userId: string, messageId: string) => void;
  editMessage: (userId: string, messageId: string, newText: string) => void;
  deleteConversation: (userId: string) => void;
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
    loadConversationsFromStorage()
  );

  useEffect(() => {
    saveConversationsToStorage(conversations);
  }, [conversations]);

  const findUserKey = (userId: string): string | undefined => {
    return Object.keys(conversations).find(
      (key) => extractUserId(key) === userId
    );
  };

  const getMessages = (userId: string): Message[] => {
    const userKey = findUserKey(userId);
    return userKey ? conversations[userKey] || [] : [];
  };

  const addMessage = (user: User, message: Message) => {
    const userKey = createUserKey(user);
    setConversations((prev) => ({
      ...prev,
      [userKey]: [...(prev[userKey] || []), message],
    }));
  };

  const deleteMessage = (userId: string, messageId: string) => {
    const userKey = findUserKey(userId);
    if (!userKey) return;
    setConversations((prev) => ({
      ...prev,
      [userKey]: (prev[userKey] || []).filter((msg) => msg.id !== messageId),
    }));
  };

  const editMessage = (userId: string, messageId: string, newText: string) => {
    const userKey = findUserKey(userId);
    if (!userKey) return;
    setConversations((prev) => ({
      ...prev,
      [userKey]: (prev[userKey] || []).map((msg) =>
        msg.id === messageId ? { ...msg, text: newText } : msg
      ),
    }));
  };

  const deleteConversation = (userId: string) => {
    const userKey = findUserKey(userId);
    if (!userKey) return;
    setConversations((prev) => {
      const newConversations = { ...prev };
      delete newConversations[userKey];
      return newConversations;
    });
  };

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        getMessages,
        addMessage,
        deleteMessage,
        editMessage,
        deleteConversation,
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
