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
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-[rgb(32,44,51)] rounded-lg p-4 w-96 max-w-md mx-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-xl font-medium mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <CancelButton onClick={onClose} />
          <PrimaryButton onClick={onConfirm} isDestructive={true}>
            {confirmText}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
