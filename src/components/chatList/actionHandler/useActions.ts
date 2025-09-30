import { useCallback, useState } from "react";
import { ACTION_TYPES, ACTIONS } from "./constants";
import type { ActionPayload, UseChatActionsReturn, ChatState } from "./types";

export const useActions = (
  onChange?: (action: ActionPayload) => void
): UseChatActionsReturn => {
  const [state, setState] = useState<ChatState>(undefined);

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

  return [state, onAction];
};
