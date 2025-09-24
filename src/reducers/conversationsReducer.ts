import type { Message, User } from "../types";
import { createUserKey, extractUserId } from "../utils";

export type ConversationsState = {
  conversations: Record<string, Message[]>;
};

export type ConversationsAction =
  | { type: "ADD_MESSAGE"; payload: { user: User; message: Message } }
  | { type: "DELETE_MESSAGE"; payload: { userId: string; messageId: string } }
  | {
      type: "EDIT_MESSAGE";
      payload: { userId: string; messageId: string; newText: string };
    }
  | { type: "DELETE_CONVERSATION"; payload: { userId: string } };

export const findUserKey = (
  conversations: Record<string, Message[]>,
  userId: string
): string | undefined => {
  return Object.keys(conversations).find(
    (key) => extractUserId(key) === userId
  );
};

export const conversationsReducer = (
  state: ConversationsState,
  action: ConversationsAction
): ConversationsState => {
  let newState: ConversationsState;

  switch (action.type) {
    case "ADD_MESSAGE": {
      const { user, message } = action.payload;
      const userKey = createUserKey(user);
      newState = {
        conversations: {
          ...state.conversations,
          [userKey]: [...(state.conversations[userKey] || []), message],
        },
      };
      break;
    }

    case "DELETE_MESSAGE": {
      const { userId, messageId } = action.payload;
      const userKey = findUserKey(state.conversations, userId);
      if (!userKey) return state;

      newState = {
        conversations: {
          ...state.conversations,
          [userKey]: (state.conversations[userKey] || []).filter(
            (msg) => msg.id !== messageId
          ),
        },
      };
      break;
    }

    case "EDIT_MESSAGE": {
      const { userId, messageId, newText } = action.payload;
      const userKey = findUserKey(state.conversations, userId);
      if (!userKey) return state;

      newState = {
        conversations: {
          ...state.conversations,
          [userKey]: (state.conversations[userKey] || []).map((msg) =>
            msg.id === messageId ? { ...msg, text: newText } : msg
          ),
        },
      };
      break;
    }

    case "DELETE_CONVERSATION": {
      const { userId } = action.payload;
      const userKey = findUserKey(state.conversations, userId);
      if (!userKey) return state;

      newState = {
        conversations: { ...state.conversations },
      };
      delete newState.conversations[userKey];
      break;
    }

    default:
      return state;
  }

  return newState;
};
