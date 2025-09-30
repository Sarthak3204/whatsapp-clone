import { useState } from "react";
import CancelButton from "../buttons/CancelButton";
import PrimaryButton from "../buttons/PrimaryButton";

type EditMessageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newText: string) => void;
  currentText: string;
};

export default function EditMessageModal({
  isOpen,
  onClose,
  onSave,
  currentText,
}: EditMessageModalProps) {
  const [messageText, setMessageText] = useState(currentText);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() === "") return;
    onSave(messageText.trim());
  };

  const handleCancel = () => {
    setMessageText(currentText);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMessageText(currentText);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-[rgb(32,44,51)] rounded-lg p-6 w-96 max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white text-xl font-medium mb-4">Edit Message</h2>

        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Enter message..."
              className="w-full px-3 py-2 bg-[rgb(42,55,63)] text-white border border-gray-600 rounded-lg focus:outline-none focus:border-green-500 placeholder-gray-400 resize-none"
              rows={3}
              autoFocus
            />
          </div>

          <div className="flex justify-end space-x-3">
            <CancelButton onClick={handleCancel} />
            <PrimaryButton type="submit" disabled={messageText.trim() === ""}>
              Save Changes
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
