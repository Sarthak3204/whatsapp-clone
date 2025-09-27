import { useActions } from "./useActions";
import { ACTION_TYPES, ACTIONS } from "./constants";
import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";
import type { ChatListActionHandlerProps } from "./types";
import { OverlayActionHandler } from "../../overlays/actionHandler";

export const ActionHandler = ({
  children,
  onChange,
  deleteModalTitle = "Delete Chat",
  deleteModalMessage = "Are you sure you want to delete this chat?",
  deleteModalConfirmText = "Delete",
  chatToDelete,
  actionComponents,
}: ChatListActionHandlerProps) => {
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

      {(state === ACTIONS.DELETE_CHAT_MODAL ||
        state === ACTIONS.DELETE_CONVERSATION_MODAL) && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() =>
            onAction({
              type:
                state === ACTIONS.DELETE_CHAT_MODAL
                  ? ACTION_TYPES.TOGGLE_DELETE_CHAT_MODAL
                  : ACTION_TYPES.TOGGLE_DELETE_CONVERSATION_MODAL,
              payload: undefined,
            })
          }
          onConfirm={() => confirmAction(chatToDelete?.id || "")}
          title={
            state === ACTIONS.DELETE_CHAT_MODAL
              ? "Delete Contact"
              : state === ACTIONS.DELETE_CONVERSATION_MODAL
              ? "Delete Conversation"
              : deleteModalTitle
          }
          message={
            chatToDelete
              ? state === ACTIONS.DELETE_CHAT_MODAL
                ? `Are you sure you want to delete ${chatToDelete.name} and all conversations?`
                : state === ACTIONS.DELETE_CONVERSATION_MODAL
                ? `Are you sure you want to delete the conversation with ${chatToDelete.name}?`
                : `Are you sure you want to delete ${chatToDelete.name}?`
              : deleteModalMessage
          }
          confirmText={deleteModalConfirmText}
        />
      )}
    </>
  );
};

export default ActionHandler;
