import { createContext, useContext, useState, useEffect } from "react";
import type { Message, User } from "../types";
import { useSelectedUser } from "./SelectedUserContext";
import {
  loadConversationsFromStorage,
  saveConversationsToStorage,
  createUserKey,
  extractUserId,
} from "../utils";

type ConversationsContextType = {
  conversations: Record<string, Message[]>;
  selectedUser: User | null;
  messages: Message[];
  getMessages: (userId: string) => Message[];
  addMessage: (user: User, message: Message) => void;
  deleteMessage: (userId: string, messageId: string) => void;
  editMessage: (userId: string, messageId: string, newText: string) => void;
  deleteConversation: (userId: string) => void;
  handleOnSubmit: (text: string) => void;
  handleDeleteMessage: (messageId: string) => void;
  handleEditMessage: (messageId: string, newText: string) => void;
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
  const { selectedUser } = useSelectedUser();

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

  // Get messages for selected user
  const userKey = selectedUser ? findUserKey(selectedUser.id) : undefined;
  const messages = userKey ? conversations[userKey] || [] : [];

  // Handle functions for selected user
  const handleOnSubmit = (text: string) => {
    if (!selectedUser || text.trim() === "") return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date(),
    };
    addMessage(selectedUser, newMessage);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (!selectedUser) return;
    deleteMessage(selectedUser.id, messageId);
  };

  const handleEditMessage = (messageId: string, newText: string) => {
    if (!selectedUser) return;
    editMessage(selectedUser.id, messageId, newText);
  };

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        selectedUser,
        messages,
        getMessages,
        addMessage,
        deleteMessage,
        editMessage,
        deleteConversation,
        handleOnSubmit,
        handleDeleteMessage,
        handleEditMessage,
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
