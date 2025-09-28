import { ACTIONS } from "./constants";
import type { ActionHandlerProps } from "./types";
import useActions from "./useActions";
import Dropdown from "../dropdown/Dropdown";
import Drawer from "../drawer/Drawer";

export default function OverlayActionHandler({ children }: ActionHandlerProps) {
  const [overlayState, onAction] = useActions();

  return (
    <>
      {children({
        onAction,
        overlayState,
      })}

      {overlayState.state === ACTIONS.DROPDOWN && (
        <Dropdown
          actionComponents={overlayState.payload?.dropdownItems || []}
          position={overlayState.payload?.position}
        />
      )}

      {overlayState.state === ACTIONS.DRAWER && <Drawer />}

      {overlayState.state === ACTIONS.TOOLTIP && <div>Tooltip placeholder</div>}
    </>
  );
}
