import { useReducer, useCallback, useEffect } from "react";
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
    try {
      saveConversationsToStorage(state.conversations);
    } catch (error) {
      console.error("Failed to save conversations:", error);
    }
  }, [state.conversations]);

  const getMessages = useCallback(
    (userId: string): Message[] => {
      const userKey = findUserKey(state.conversations, userId);
      return userKey ? state.conversations[userKey] || [] : [];
    },
    [state.conversations]
  );

  const addMessage = useCallback((user: User, message: Message) => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: { user, message },
    });
  }, []);

  const deleteMessage = useCallback((userId: string, messageId: string) => {
    dispatch({
      type: "DELETE_MESSAGE",
      payload: { userId, messageId },
    });
  }, []);

  const editMessage = useCallback(
    (userId: string, messageId: string, newText: string) => {
      dispatch({
        type: "EDIT_MESSAGE",
        payload: { userId, messageId, newText },
      });
    },
    []
  );

  const deleteConversation = useCallback((userId: string) => {
    dispatch({
      type: "DELETE_CONVERSATION",
      payload: { userId },
    });
  }, []);

  return {
    conversations: state.conversations,
    getMessages,
    addMessage,
    deleteMessage,
    editMessage,
    deleteConversation,
  };
}
