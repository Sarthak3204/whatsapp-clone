import { useCallback, useState } from "react";
import type { UseActionsReturnType, ActionPayload } from "./types";
import { ACTIONS, ACTION_TYPES } from "./constants";

export default function useActions(): UseActionsReturnType {
  const [action, setAction] = useState<UseActionsReturnType[0]>(undefined);

  const onAction: UseActionsReturnType[1] = useCallback(
    (action: ActionPayload) => {
      switch (action.type) {
        case ACTION_TYPES.TOGGLE_DROPDOWN: {
          setAction((prev) =>
            prev === ACTIONS.DROPDOWN ? undefined : ACTIONS.DROPDOWN
          );
          break;
        }
        case ACTION_TYPES.TOGGLE_DRAWER: {
          setAction((prev) =>
            prev === ACTIONS.DRAWER ? undefined : ACTIONS.DRAWER
          );
          break;
        }
        default:
      }
    },
    []
  );
  return [action, onAction];
}
