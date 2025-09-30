import type { ReactElement } from "react";
import { ACTION_TYPES, ACTIONS } from "./constants";
import type { Message } from "../../../types";

type ValueOf<T> = T[keyof T];

export type ActionPayload = {
  type: ValueOf<typeof ACTION_TYPES>;
  payload?: {
    messageId?: string;
    newText?: string;
    text?: string;
  };
};

export type MessageState = ValueOf<typeof ACTIONS> | undefined;

export type UseMessageActionsReturn = [
  MessageState,
  (action: ActionPayload) => void
];

export type ChildrenProps = {
  onAction: (action: ActionPayload) => void;
  dropdownItems: ActionComponent[];
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
};

export type ActionComponent = {
  id: string;
  actionName: string;
  onClick: () => void;
  icon?: string;
};

export type MessageActionHandlerProps = {
  children: (props: ChildrenProps) => ReactElement;
  onChange?: (action: ActionPayload) => void;
  message?: Message;
  openDropdownMessageId: string | null;
};

export type UseActionsReturnType = UseMessageActionsReturn;
