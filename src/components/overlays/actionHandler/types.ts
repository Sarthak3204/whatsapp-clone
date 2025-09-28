import { ACTIONS, ACTION_TYPES } from "./constants";
import React from "react";

type ValueOf<T> = T[keyof T];

export type ActionPayload = {
  type: ValueOf<typeof ACTION_TYPES>;
  payload?: {
    dropdownItems?: ActionComponent[];
    position?: { x: number; y: number };
    data?: Record<string, unknown>;
  };
};

export type OverlayState = {
  state: ValueOf<typeof ACTIONS> | undefined;
  payload?: {
    dropdownItems?: ActionComponent[];
    position?: { x: number; y: number };
    data?: Record<string, unknown>;
  };
};

export type UseActionsReturnType = [
  OverlayState,
  (action: ActionPayload) => void
];

export type ChildrenProps = {
  onAction: (action: ActionPayload) => void;
  overlayState: OverlayState;
};

export type ActionComponent = {
  id: string;
  actionName: string;
  onClick: () => void;
};

// Provider function type
export type OverlayProvider = (
  data: Record<string, unknown> | undefined,
  onBusinessAction: (action: any) => void
) => ActionComponent[];

// Registry of providers
export type OverlayProviders = {
  dropdown?: Record<string, OverlayProvider>;
  drawer?: Record<string, OverlayProvider>;
  tooltip?: Record<string, OverlayProvider>;
};

export type ActionHandlerProps = {
  children: (params: ChildrenProps) => React.ReactNode;
};
