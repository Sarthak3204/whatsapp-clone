import { useActions } from "./useActions";
import { ACTION_TYPES, ACTIONS } from "./constants";
import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";
import EditMessageModal from "../../modals/EditMessageModal";
import type { MessageActionHandlerProps } from "./types";
import { useMemo } from "react";
import editIconUrl from "../../../assets/edit-message.svg";
import deleteIconUrl from "../../../assets/delete.svg";

export const ActionHandler = ({
  children,
  onChange,
  message,
  openDropdownMessageId,
}: MessageActionHandlerProps) => {
  const [state, onAction] = useActions(onChange);

  const isDropdownOpen = !!message && openDropdownMessageId === message.id;

  const onToggleDropdown = () => {
    if (!message) return;
    onAction({
      type: ACTION_TYPES.TOGGLE_MESSAGE_DROPDOWN,
      payload: { messageId: message.id },
    });
  };

  const dropdownItems = useMemo(() => {
    if (!message) return [];
    return [
      {
        id: `copy-message-${message.id}`,
        actionName: "Copy Message",
        onClick: () =>
          onAction({
            type: ACTION_TYPES.COPY_MESSAGE,
            payload: { messageId: message?.id, text: message?.text },
          }),
      },
      {
        id: `edit-message-${message.id}`,
        actionName: "Edit Message",
        icon: editIconUrl,
        onClick: () =>
          onAction({
            type: ACTION_TYPES.TOGGLE_EDIT_MESSAGE_MODAL,
            payload: { messageId: message?.id },
          }),
      },
      {
        id: `delete-message-${message.id}`,
        actionName: "Delete Message",
        icon: deleteIconUrl,
        onClick: () =>
          onAction({
            type: ACTION_TYPES.TOGGLE_DELETE_MESSAGE_MODAL,
            payload: { messageId: message?.id },
          }),
      },
    ];
  }, [message, onAction]);

  return (
    <>
      {children({
        onAction,
        dropdownItems,
        isDropdownOpen,
        onToggleDropdown,
      })}

      {state === ACTIONS.EDIT_MESSAGE_MODAL && (
        <EditMessageModal
          isOpen={true}
          onClose={() =>
            onAction({
              type: ACTION_TYPES.TOGGLE_EDIT_MESSAGE_MODAL,
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

      {state === ACTIONS.DELETE_MESSAGE_MODAL && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() =>
            onAction({
              type: ACTION_TYPES.TOGGLE_DELETE_MESSAGE_MODAL,
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
    </>
  );
};

export default ActionHandler;
