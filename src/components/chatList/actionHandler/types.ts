import type { ReactElement } from "react";
import { ACTION_TYPES, ACTIONS } from "./constants";
import type { OverlayActionPayload } from "../../overlays/actionHandler";

type ValueOf<T> = T[keyof T];

export type ActionPayload = {
  type: ValueOf<typeof ACTION_TYPES>;
  payload: unknown;
};

export type ChatListState = ValueOf<typeof ACTIONS> | undefined;

export type UseChatListActionsReturn = [
  ChatListState,
  (action: ActionPayload) => void,
  (userId: string) => void
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

export type ChatListActionHandlerProps = {
  children: (props: ChildrenProps) => ReactElement;
  onChange?: (action: ActionPayload) => void;
  // Delete modal props
  deleteModalTitle?: string;
  deleteModalMessage?: string;
  deleteModalConfirmText?: string;
  chatToDelete?: { id: string; name: string };
  // Dropdown props (passed to OverlayActionHandler)
  actionComponents?:
    | ActionComponent[]
    | ((onAction: (action: ActionPayload) => void) => ActionComponent[]);
};

export type UseActionsReturnType = UseChatListActionsReturn;
