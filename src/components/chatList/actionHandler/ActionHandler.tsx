import { useActions } from "./useActions";
import { ACTION_TYPES, ACTIONS } from "./constants";
import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";
import type { ChatActionHandlerProps } from "./types";
import { useMemo } from "react";

export const ActionHandler = ({
  children,
  onChange,
  user,
  openDropdownUserId,
}: ChatActionHandlerProps) => {
  const [state, onAction] = useActions(onChange);

  const isDropdownOpen = !!user && openDropdownUserId === user.id;

  const onToggleDropdown = () => {
    if (!user) return;
    onAction({
      type: ACTION_TYPES.TOGGLE_CHAT_DROPDOWN,
      payload: { userId: user.id },
    });
  };

  const dropdownItems = useMemo(() => {
    if (!user) return [];
    return [
      {
        id: `delete-contact-${user.id}`,
        actionName: "Delete Contact",
        onClick: () =>
          onAction({
            type: ACTION_TYPES.TOGGLE_DELETE_CHAT_MODAL,
            payload: { userId: user?.id },
          }),
      },
      {
        id: `delete-conversation-${user.id}`,
        actionName: "Delete Conversation",
        onClick: () =>
          onAction({
            type: ACTION_TYPES.TOGGLE_DELETE_CONVERSATION_MODAL,
            payload: { userId: user?.id },
          }),
      },
    ];
  }, [user, onAction]);

  return (
    <>
      {children({
        onAction,
        dropdownItems,
        isDropdownOpen,
        onToggleDropdown,
      })}

      {state === ACTIONS.DELETE_CHAT_MODAL && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() =>
            onAction({ type: ACTION_TYPES.TOGGLE_DELETE_CHAT_MODAL })
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
            onAction({ type: ACTION_TYPES.TOGGLE_DELETE_CONVERSATION_MODAL })
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
