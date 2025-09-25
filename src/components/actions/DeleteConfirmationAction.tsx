import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import { ACTION_TYPES } from "../../hooks/useActions";
import type { UseActionsReturnType } from "../../hooks/useActions";

type DeleteConfirmationActionProps = {
  onAction: UseActionsReturnType[1];
  title?: string;
  message?: string;
  confirmText?: string;
  onConfirm?: () => void;
};

export default function DeleteConfirmationAction({
  onAction,
  title = "Delete Message",
  message = "Are you sure you want to delete this message?",
  confirmText = "Yes",
  onConfirm,
}: DeleteConfirmationActionProps) {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onAction({ type: ACTION_TYPES.TOGGLE });
  };

  return (
    <DeleteConfirmationModal
      isOpen={true}
      onClose={() => onAction({ type: ACTION_TYPES.TOGGLE })}
      onConfirm={handleConfirm}
      title={title}
      message={message}
      confirmText={confirmText}
    />
  );
}
