import BaseModal from "./BaseModal";
import CancelButton from "../buttons/CancelButton";
import PrimaryButton from "../buttons/PrimaryButton";

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
};

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Yes",
}: DeleteConfirmationModalProps) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="bg-[rgb(32,44,51)] rounded-lg p-4 w-96 max-w-md mx-4"
    >
      <div className="text-center">
        <h2 className="text-white text-xl font-medium mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <CancelButton onClick={onClose} />
          <PrimaryButton onClick={onConfirm} isDestructive={true}>
            {confirmText}
          </PrimaryButton>
        </div>
      </div>
    </BaseModal>
  );
}
