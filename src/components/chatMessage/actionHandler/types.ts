import type { ReactElement } from "react";
import { ACTION_TYPES, ACTIONS } from "./constants";
import type { OverlayActionPayload } from "../../overlays/actionHandler";

type ValueOf<T> = T[keyof T];

export type ActionPayload = {
  type: ValueOf<typeof ACTION_TYPES>;
  payload: unknown;
};

export type ChatMessageState = ValueOf<typeof ACTIONS> | undefined;

export type UseChatMessageActionsReturn = [
  ChatMessageState,
  (action: ActionPayload) => void,
  (messageId: string) => void
];

export type ChildrenProps = {
  onAction: (action: ActionPayload) => void;
  onOverlayAction: (action: OverlayActionPayload) => void;
  isPopoverOpen?: boolean;
};

export type ActionComponent = {
  id: string;
  actionName: string;
  onClick: () => void;
};

export type ChatMessageActionHandlerProps = {
  children: (props: ChildrenProps) => ReactElement;
  onChange?: (action: ActionPayload) => void;
  deleteModalTitle?: string;
  deleteModalMessage?: string;
  deleteModalConfirmText?: string;
  editModalTitle?: string;
  messageToEdit?: { id: string; text: string };
  actionComponents?:
    | ActionComponent[]
    | ((onAction: (action: ActionPayload) => void) => ActionComponent[]);
};

export type UseActionsReturnType = UseChatMessageActionsReturn;
