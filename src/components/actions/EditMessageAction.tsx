import EditMessageModal from "../modals/EditMessageModal";
import { ACTION_TYPES } from "../../hooks/useActions";
import type { UseActionsReturnType } from "../../hooks/useActions";

type EditMessageActionProps = {
  onAction: UseActionsReturnType[1];
  currentText: string;
  onSave?: (newText: string) => void;
};

export default function EditMessageAction({
  onAction,
  currentText,
  onSave,
}: EditMessageActionProps) {
  const handleSave = (newText: string) => {
    if (onSave) {
      onSave(newText);
    }
    onAction({ type: ACTION_TYPES.TOGGLE });
  };

  return (
    <EditMessageModal
      isOpen={true}
      onClose={() => onAction({ type: ACTION_TYPES.TOGGLE })}
      onSave={handleSave}
      currentText={currentText}
    />
  );
}
