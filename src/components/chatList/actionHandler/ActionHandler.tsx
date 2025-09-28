import { useActions } from "./useActions";
import { ACTION_TYPES, ACTIONS } from "./constants";
import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";
import type { ChatActionHandlerProps } from "./types";
import { OVERLAY_ACTION_TYPES } from "../../overlays/actionHandler";
import { useCallback, useMemo } from "react";

export const ActionHandler = ({
  children,
  onChange,
  onOverlayAction,
  user,
}: ChatActionHandlerProps) => {
  const [state, onAction] = useActions(onChange);

  const closeDropdown = useCallback(() => {
    onOverlayAction?.({
      type: OVERLAY_ACTION_TYPES.CLOSE_DROPDOWN,
      payload: undefined,
    });
  }, [onOverlayAction]);
  const handleDeleteContact = useCallback(() => {
    closeDropdown();
    onAction({
      type: ACTION_TYPES.TOGGLE_DELETE_CHAT_MODAL,
      payload: { userId: user?.id },
    });
  }, [closeDropdown, onAction, user?.id]);

  const handleDeleteConversation = useCallback(() => {
    closeDropdown();
    onAction({
      type: ACTION_TYPES.TOGGLE_DELETE_CONVERSATION_MODAL,
      payload: { userId: user?.id },
    });
  }, [closeDropdown, onAction, user?.id]);

  const dropdownItems = useMemo(() => {
    if (!user) {
      return [];
    }
    return [
      {
        id: `delete-contact-${user.id}`,
        actionName: "Delete Contact",
        onClick: handleDeleteContact,
      },
      {
        id: `delete-conversation-${user.id}`,
        actionName: "Delete Conversation",
        onClick: handleDeleteConversation,
      },
    ];
  }, [user, handleDeleteContact, handleDeleteConversation]);

  return (
    <>
      {children({
        onAction,
        dropdownItems,
        isPopoverOpen: !!state,
      })}

      {state === ACTIONS.DELETE_CHAT_MODAL && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() =>
            onAction({ type: ACTION_TYPES.CLOSE_DELETE_CHAT_MODAL })
          }
          onConfirm={() =>
            onAction({
              type: ACTION_TYPES.DELETE_CHAT_CONFIRMATION,
              payload: { userId: user?.id },
            })
          }
          title="Delete Contact"
          message={`Are you sure you want to delete ${user?.name} and all conversations?`}
          confirmText="Delete"
        />
      )}
      {state === ACTIONS.DELETE_CONVERSATION_MODAL && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() =>
            onAction({ type: ACTION_TYPES.CLOSE_DELETE_CONVERSATION_MODAL })
          }
          onConfirm={() =>
            onAction({
              type: ACTION_TYPES.DELETE_CONVERSATION_CONFIRMATION,
              payload: { userId: user?.id },
            })
          }
          title="Delete Conversation"
          message={`Are you sure you want to delete the conversation with ${user?.name}?`}
          confirmText="Delete"
        />
      )}
    </>
  );
};

export default ActionHandler;
