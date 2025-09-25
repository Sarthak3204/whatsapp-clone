import NewChatModal from "../modals/NewChatModal";
import { ACTION_TYPES } from "../../hooks/useActions";
import type { UseActionsReturnType } from "../../hooks/useActions";
import type { User } from "../../types";

type NewChatActionProps = {
  onAction: UseActionsReturnType[1];
  onNewUser?: (user: User) => void;
};

export default function NewChatAction({
  onAction,
  onNewUser,
}: NewChatActionProps) {
  const handleNewUser = (newUser: User) => {
    if (onNewUser) {
      onNewUser(newUser);
    }
    onAction({ type: ACTION_TYPES.TOGGLE });
  };

  return (
    <NewChatModal
      isOpen={true}
      onClose={() => onAction({ type: ACTION_TYPES.TOGGLE })}
      setNewUser={handleNewUser}
    />
  );
}
