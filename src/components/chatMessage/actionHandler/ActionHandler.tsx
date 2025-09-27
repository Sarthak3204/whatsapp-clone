import { useActions } from "./useActions";
import { ACTION_TYPES, ACTIONS } from "./constants";
import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";
import EditMessageModal from "../../modals/EditMessageModal";
import type { ChatMessageActionHandlerProps } from "./types";
import { OverlayActionHandler } from "../../overlays/actionHandler";

export const ActionHandler = ({
  children,
  onChange,
  deleteModalTitle = "Delete Message",
  deleteModalMessage = "Are you sure you want to delete this message?",
  deleteModalConfirmText = "Delete",
  editModalTitle = "Edit Message",
  messageToEdit,
  actionComponents,
}: ChatMessageActionHandlerProps) => {
  const [state, onAction, confirmAction] = useActions(onChange);

  return (
    <>
      <OverlayActionHandler
        actionComponents={
          typeof actionComponents === "function"
            ? actionComponents(onAction)
            : actionComponents
        }
      >
        {({ onAction: onOverlayAction, isPopoverOpen }) => {
          return children({
            onAction,
            onOverlayAction,
            isPopoverOpen,
          });
        }}
      </OverlayActionHandler>

      {state === ACTIONS.DELETE_MESSAGE_MODAL && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() =>
            onAction({
              type: ACTION_TYPES.TOGGLE_DELETE_MESSAGE_MODAL,
              payload: undefined,
            })
          }
          onConfirm={() => confirmAction(messageToEdit?.id || "")}
          title={deleteModalTitle}
          message={
            messageToEdit
              ? `Are you sure you want to delete this message: "${messageToEdit.text}"?`
              : deleteModalMessage
          }
          confirmText={deleteModalConfirmText}
        />
      )}

      {state === ACTIONS.EDIT_MESSAGE_MODAL && (
        <EditMessageModal
          isOpen={true}
          onClose={() =>
            onAction({
              type: ACTION_TYPES.TOGGLE_EDIT_MESSAGE_MODAL,
              payload: undefined,
            })
          }
          onSave={(newText: string) => {
            onChange?.({
              type: ACTION_TYPES.EDIT_MESSAGE_CONFIRMATION,
              payload: { messageId: messageToEdit?.id, newText },
            });
            // Modal will be closed by useActions setting state to undefined
          }}
          currentText={messageToEdit?.text || ""}
        />
      )}
    </>
  );
};

export default ActionHandler;
