import { useState, useCallback } from "react";

export const ACTION_TYPES = {
  TOGGLE: "TOGGLE",
} as const; // readonly

type ValueOf<T> = T[keyof T];
type ActionType = ValueOf<typeof ACTION_TYPES>;

type ActionPayload = {
  type: ActionType;
  actionName?: string;
};

export type UseActionsReturnType = [
  string | undefined,
  (action: ActionPayload) => void
];

export const useActions = (): UseActionsReturnType => {
  const [action, setAction] = useState<UseActionsReturnType[0]>(undefined);

  const onAction: UseActionsReturnType[1] = useCallback(
    ({ type, actionName }: ActionPayload) => {
      switch (type) {
        case ACTION_TYPES.TOGGLE: {
          setAction((prev) => (prev === actionName ? undefined : actionName));
          break;
        }
        default:
      }
    },
    []
  );

  return [action, onAction];
};
