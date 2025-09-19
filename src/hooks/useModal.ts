import { useEffect } from "react";

type UseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCancel?: () => void;
};

export function useModal({ isOpen, onClose, onCancel }: UseModalProps) {
  const handleCancel = () => {
    if (onCancel) onCancel();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, handleCancel]);

  return {
    handleCancel,
    handleBackdropClick,
  };
}
