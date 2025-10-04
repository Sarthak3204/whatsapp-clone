import type { ReactElement } from "react";
import { SLOT_NAMES } from "./constants";

type ValueOf<T> = T[keyof T];
export type SlotName = ValueOf<typeof SLOT_NAMES>;

export interface SlotProps {
  name: SlotName;
  children?: React.ReactNode;
}

export interface ChatViewLayoutProps {
  children?: ReactElement<SlotProps> | ReactElement<SlotProps>[];
  autoScroll?: boolean;
}

export type SlotType = (props: SlotProps) => null;

export type ChatViewLayoutType = ((
  props: ChatViewLayoutProps
) => React.ReactElement) & {
  Slot: SlotType;
};
