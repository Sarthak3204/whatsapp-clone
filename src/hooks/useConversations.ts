import { useReducer, useEffect } from "react";
import type { Message, User } from "../types";
import {
  loadConversationsFromStorage,
  saveConversationsToStorage,
} from "../utils";
import {
  conversationsReducer,
  findUserKey,
  type ConversationsState,
} from "../reducers/conversationsReducer";

export function useConversations() {
  const [state, dispatch] = useReducer(
    conversationsReducer,
    { conversations: {} } as ConversationsState,
    () => {
      const loadedConversations = loadConversationsFromStorage();
      console.log("Initial load from localStorage:", loadedConversations);
      return { conversations: loadedConversations };
    }
  );

  useEffect(() => {
    console.log("Saving conversations to localStorage:", state.conversations);
    saveConversationsToStorage(state.conversations);
  }, [state.conversations]);

  // Helper functions
  const getMessages = (userId: string): Message[] => {
    const userKey = findUserKey(state.conversations, userId);
    return userKey ? state.conversations[userKey] || [] : [];
  };

  const addMessage = (user: User, message: Message) => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: { user, message },
    });
  };

  const deleteMessage = (userId: string, messageId: string) => {
    dispatch({
      type: "DELETE_MESSAGE",
      payload: { userId, messageId },
    });
  };

  const editMessage = (userId: string, messageId: string, newText: string) => {
    dispatch({
      type: "EDIT_MESSAGE",
      payload: { userId, messageId, newText },
    });
  };

  const deleteConversation = (userId: string) => {
    dispatch({
      type: "DELETE_CONVERSATION",
      payload: { userId },
    });
  };

  return {
    conversations: state.conversations,
    getMessages,
    addMessage,
    deleteMessage,
    editMessage,
    deleteConversation,
  };
}
