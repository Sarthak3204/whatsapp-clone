import { useActions } from "./useActions";
import { ACTION_TYPES, ACTIONS } from "./constants";
import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";
import EditMessageModal from "../../modals/EditMessageModal";
import type { MessageActionHandlerProps } from "./types";
import { OVERLAY_ACTION_TYPES } from "../../overlays/actionHandler";
import { useCallback, useMemo } from "react";

export const ActionHandler = ({
  children,
  onChange,
  onOverlayAction,
  message,
}: MessageActionHandlerProps) => {
  const [state, onAction] = useActions(onChange);

  const closeDropdown = useCallback(() => {
    onOverlayAction?.({
      type: OVERLAY_ACTION_TYPES.CLOSE_DROPDOWN,
      payload: undefined,
    });
  }, [onOverlayAction]);

  const handleEditMessage = useCallback(() => {
    closeDropdown();
    onAction({
      type: ACTION_TYPES.TOGGLE_EDIT_MESSAGE_MODAL,
      payload: { messageId: message?.id },
    });
  }, [closeDropdown, onAction, message?.id]);

  const handleDeleteMessage = useCallback(() => {
    closeDropdown();
    onAction({
      type: ACTION_TYPES.TOGGLE_DELETE_MESSAGE_MODAL,
      payload: { messageId: message?.id },
    });
  }, [closeDropdown, onAction, message?.id]);

  const dropdownItems = useMemo(() => {
    if (!message) return [];
    return [
      {
        id: `edit-message-${message.id}`,
        actionName: "Edit Message",
        onClick: handleEditMessage,
      },
      {
        id: `delete-message-${message.id}`,
        actionName: "Delete Message",
        onClick: handleDeleteMessage,
      },
    ];
  }, [message, handleDeleteMessage, handleEditMessage]);

  return (
    <>
      {children({
        onAction,
        dropdownItems,
        isPopoverOpen: !!state,
      })}

      {state === ACTIONS.DELETE_MESSAGE_MODAL && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() =>
            onAction({
              type: ACTION_TYPES.CLOSE_DELETE_MESSAGE_MODAL,
              payload: undefined,
            })
          }
          onConfirm={() =>
            onAction({
              type: ACTION_TYPES.DELETE_MESSAGE_CONFIRMATION,
              payload: { messageId: message?.id },
            })
          }
          title="Delete Message"
          message="Are you sure you want to delete the message?"
          confirmText="Delete"
        />
      )}

      {state === ACTIONS.EDIT_MESSAGE_MODAL && (
        <EditMessageModal
          isOpen={true}
          onClose={() =>
            onAction({
              type: ACTION_TYPES.CLOSE_EDIT_MESSAGE_MODAL,
              payload: undefined,
            })
          }
          onSave={(newText: string) =>
            onAction({
              type: ACTION_TYPES.EDIT_MESSAGE_CONFIRMATION,
              payload: { messageId: message?.id, newText: newText },
            })
          }
          currentText={message?.text || ""}
        />
      )}
    </>
  );
};

export default ActionHandler;
