import { useCallback, useState } from "react";
import { ACTION_TYPES, ACTIONS } from "./constants";
import type {
  ActionPayload,
  UseMessageActionsReturn,
  MessageState,
} from "./types";

export const useActions = (
  onChange?: (action: ActionPayload) => void
): UseMessageActionsReturn => {
  const [state, setState] = useState<MessageState>(undefined);

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

        case ACTION_TYPES.CLOSE_DELETE_MESSAGE_MODAL:
          setState(undefined);
          break;

        case ACTION_TYPES.CLOSE_EDIT_MESSAGE_MODAL:
          setState(undefined);
          break;

        case ACTION_TYPES.DELETE_MESSAGE_CONFIRMATION:
          onChange?.(action);
          setState(undefined); // Close modal after confirmation
          break;

        case ACTION_TYPES.EDIT_MESSAGE_CONFIRMATION:
          onChange?.(action);
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

export default useActions;
