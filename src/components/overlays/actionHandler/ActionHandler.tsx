import { ACTIONS } from "./constants";
import type { ActionHandlerProps } from "./types";
import useActions from "./useActions";
import Dropdown from "../dropdown/Dropdown";
import Drawer from "../drawer/Drawer";

export default function OverlayActionHandler({
  children,
  actionComponents = [],
}: ActionHandlerProps) {
  const [state, onAction] = useActions();

  return (
    <>
      {children({
        onAction,
        isPopoverOpen: !!state,
      })}

      {state === ACTIONS.DROPDOWN && (
        <Dropdown
          actionComponents={actionComponents}
          key={crypto.randomUUID()}
        />
      )}
      {state === ACTIONS.DRAWER && <Drawer />}
    </>
  );
}
