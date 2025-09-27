import { useCallback, useState } from "react";
import { ACTION_TYPES, ACTIONS } from "./constants";
import type {
  ActionPayload,
  UseChatMessageActionsReturn,
  ChatMessageState,
} from "./types";

export const useActions = (
  onChange?: (action: ActionPayload) => void
): UseChatMessageActionsReturn => {
  const [state, setState] = useState<ChatMessageState>(undefined);

  const onAction = useCallback(
    (action: ActionPayload) => {
      switch (action.type) {
        case ACTION_TYPES.TOGGLE_DELETE_MESSAGE_MODAL:
          setState((prevState) =>
            prevState === ACTIONS.DELETE_MESSAGE_MODAL
              ? undefined
              : ACTIONS.DELETE_MESSAGE_MODAL
          );
          break;

        case ACTION_TYPES.TOGGLE_EDIT_MESSAGE_MODAL:
          setState((prevState) =>
            prevState === ACTIONS.EDIT_MESSAGE_MODAL
              ? undefined
              : ACTIONS.EDIT_MESSAGE_MODAL
          );
          break;

        case ACTION_TYPES.DELETE_MESSAGE_CONFIRMATION:
          onChange?.(action);
          setState(undefined);
          break;

        case ACTION_TYPES.EDIT_MESSAGE_CONFIRMATION:
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
    (messageId: string) => {
      if (state === ACTIONS.DELETE_MESSAGE_MODAL) {
        onChange?.({
          type: ACTION_TYPES.DELETE_MESSAGE_CONFIRMATION,
          payload: messageId,
        });
        setState(undefined);
      } else if (state === ACTIONS.EDIT_MESSAGE_MODAL) {
        onChange?.({
          type: ACTION_TYPES.EDIT_MESSAGE_CONFIRMATION,
          payload: messageId,
        });
        setState(undefined);
      }
    },
    [state, onChange]
  );

  return [state, onAction, confirmAction];
};

export default useActions;
