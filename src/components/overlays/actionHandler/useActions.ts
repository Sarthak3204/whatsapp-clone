import { useCallback, useState } from "react";
import type {
  UseActionsReturnType,
  ActionPayload,
  OverlayState,
} from "./types";
import { ACTIONS, ACTION_TYPES } from "./constants";

export default function useActions(): UseActionsReturnType {
  const [overlayState, setOverlayState] = useState<OverlayState>({
    state: undefined,
    payload: undefined,
  });

  const onAction: UseActionsReturnType[1] = useCallback(
    (action: ActionPayload) => {
      switch (action.type) {
        case ACTION_TYPES.TOGGLE_DROPDOWN: {
          setOverlayState((prev) => {
            const newState = {
              state:
                prev.state === ACTIONS.DROPDOWN ? undefined : ACTIONS.DROPDOWN,
              payload:
                prev.state === ACTIONS.DROPDOWN ? undefined : action.payload,
            };
            return newState;
          });
          break;
        }
        case ACTION_TYPES.TOGGLE_DRAWER: {
          setOverlayState((prev) => ({
            state: prev.state === ACTIONS.DRAWER ? undefined : ACTIONS.DRAWER,
            payload: prev.state === ACTIONS.DRAWER ? undefined : action.payload,
          }));
          break;
        }
        case ACTION_TYPES.TOGGLE_TOOLTIP: {
          setOverlayState((prev) => ({
            state: prev.state === ACTIONS.TOOLTIP ? undefined : ACTIONS.TOOLTIP,
            payload:
              prev.state === ACTIONS.TOOLTIP ? undefined : action.payload,
          }));
          break;
        }
        case ACTION_TYPES.CLOSE_DROPDOWN: {
          setOverlayState((prev) =>
            prev.state === ACTIONS.DROPDOWN
              ? { state: undefined, payload: undefined }
              : prev
          );
          break;
        }
        case ACTION_TYPES.CLOSE_DRAWER: {
          setOverlayState((prev) =>
            prev.state === ACTIONS.DRAWER
              ? { state: undefined, payload: undefined }
              : prev
          );
          break;
        }
        case ACTION_TYPES.CLOSE_TOOLTIP: {
          setOverlayState((prev) =>
            prev.state === ACTIONS.TOOLTIP
              ? { state: undefined, payload: undefined }
              : prev
          );
          break;
        }
        case ACTION_TYPES.CLOSE_ALL_OVERLAYS: {
          setOverlayState({ state: undefined, payload: undefined });
          break;
        }
        default:
      }
    },
    []
  );
  return [overlayState, onAction];
}
