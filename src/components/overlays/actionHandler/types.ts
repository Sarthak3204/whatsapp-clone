import { ACTIONS, ACTION_TYPES } from "./constants";
import React from "react";

type ValueOf<T> = T[keyof T];

export type ActionPayload = {
  type: ValueOf<typeof ACTION_TYPES>;
  payload: unknown;
};

export type UseActionsReturnType = [
  ValueOf<typeof ACTIONS> | undefined,
  (action: ActionPayload) => void
];

export type ChildrenProps = {
  onAction: (action: ActionPayload) => void;
  isPopoverOpen: boolean;
};

export type ActionComponent = {
  id: string;
  actionName: string;
  onClick: () => void;
};

export type ActionHandlerProps = {
  actionComponents?: ActionComponent[];
  children: (params: ChildrenProps) => React.ReactNode;
};
