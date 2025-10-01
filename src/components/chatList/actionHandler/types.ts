import type { ReactElement } from "react";
import { ACTION_TYPES, ACTIONS } from "./constants";
import type { User } from "../../../types";

type ValueOf<T> = T[keyof T];

export type ActionPayload = {
  type: ValueOf<typeof ACTION_TYPES>;
  payload?: {
    userId?: string;
  };
};

export type ChatState = ValueOf<typeof ACTIONS> | undefined;

export type UseChatActionsReturn = [ChatState, (action: ActionPayload) => void];

export type ChildrenProps = {
  onAction: (action: ActionPayload) => void;
  dropdownItems: ActionComponent[];
};

export type ActionComponent = {
  id: string;
  actionName: string;
  onClick: () => void;
  icon?: string;
};

export type ChatActionHandlerProps = {
  children: (props: ChildrenProps) => ReactElement;
  onChange?: (action: ActionPayload) => void;
  user?: User;
};

export type UseActionsReturnType = UseChatActionsReturn;
