import { useModal } from "../../hooks/useModal";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function BaseModal({
  isOpen,
  onClose,
  onCancel,
  children,
  className = "bg-[rgb(32,44,51)] rounded-lg p-6 w-96 max-w-md mx-4",
}: BaseModalProps) {
  const { handleBackdropClick } = useModal({
    isOpen,
    onClose,
    onCancel,
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className={className} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
