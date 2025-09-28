import type { ReactElement } from "react";
import { ACTION_TYPES, ACTIONS } from "./constants";
import type { Message } from "../../../types";
import type { OverlayActionPayload } from "../../overlays/actionHandler";

type ValueOf<T> = T[keyof T];

export type ActionPayload = {
  type: ValueOf<typeof ACTION_TYPES>;
  payload?: {
    messageId?: string;
    newText?: string;
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
  isPopoverOpen: boolean;
};

export type ActionComponent = {
  id: string;
  actionName: string;
  onClick: () => void;
};

export type MessageActionHandlerProps = {
  children: (props: ChildrenProps) => ReactElement;
  onChange?: (action: ActionPayload) => void;
  onOverlayAction?: (action: OverlayActionPayload) => void;
  message?: Message;
};

export type UseActionsReturnType = UseMessageActionsReturn;
