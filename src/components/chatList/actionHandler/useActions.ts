import { useCallback, useState } from "react";
import { ACTION_TYPES, ACTIONS } from "./constants";
import type {
  ActionPayload,
  UseChatListActionsReturn,
  ChatListState,
} from "./types";

export const useActions = (
  onChange?: (action: ActionPayload) => void
): UseChatListActionsReturn => {
  const [state, setState] = useState<ChatListState>(undefined);

  const onAction = useCallback(
    (action: ActionPayload) => {
      switch (action.type) {
        case ACTION_TYPES.TOGGLE_DELETE_CHAT_MODAL:
          setState((prevState) =>
            prevState === ACTIONS.DELETE_CHAT_MODAL
              ? undefined
              : ACTIONS.DELETE_CHAT_MODAL
          );
          break;

        case ACTION_TYPES.TOGGLE_DELETE_CONVERSATION_MODAL:
          setState((prevState) =>
            prevState === ACTIONS.DELETE_CONVERSATION_MODAL
              ? undefined
              : ACTIONS.DELETE_CONVERSATION_MODAL
          );
          break;

        case ACTION_TYPES.DELETE_CHAT_CONFIRMATION:
          onChange?.(action);
          setState(undefined);
          break;

        case ACTION_TYPES.DELETE_CONVERSATION_CONFIRMATION:
          onChange?.(action);
          setState(undefined);
          break;

        default:
          onChange?.(action);
          break;
      }
    },
    [onChange]
  );

  const confirmAction = useCallback(
    (userId: string) => {
      if (state === ACTIONS.DELETE_CHAT_MODAL) {
        onChange?.({
          type: ACTION_TYPES.DELETE_CHAT_CONFIRMATION,
          payload: userId,
        });
        setState(undefined);
      } else if (state === ACTIONS.DELETE_CONVERSATION_MODAL) {
        onChange?.({
          type: ACTION_TYPES.DELETE_CONVERSATION_CONFIRMATION,
          payload: userId,
        });
        setState(undefined);
      }
    },
    [state, onChange]
  );

  return [state, onAction, confirmAction];
};
