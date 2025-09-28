import type { ActionComponent } from "../actionHandler/types";

export type DropdownProps = {
  actionComponents: ActionComponent[];
  position?: { x: number; y: number };
};
