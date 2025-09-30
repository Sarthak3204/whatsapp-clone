import type { User } from "../../types";
import { useState } from "react";
import CancelButton from "../buttons/CancelButton";
import PrimaryButton from "../buttons/PrimaryButton";

type NewChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setNewUser: (user: User) => void;
};

export default function NewChatModal({
  isOpen,
  onClose,
  setNewUser,
}: NewChatModalProps) {
  const [userName, setUserName] = useState<string>("");

  if (!isOpen) return null;

  const handleCancel = () => {
    setUserName("");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() === "") return;
    const newUser: User = {
      id: crypto.randomUUID(),
      name: userName.trim(),
      profileImage: "/default-profile.svg",
    };
    setNewUser(newUser);
    handleCancel();
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
        <h2 className="text-white text-xl font-medium mb-4">Start New Chat</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Contact Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter contact name..."
              className="w-full px-3 py-2 bg-[rgb(42,55,63)] text-white border border-gray-600 rounded-lg focus:outline-none focus:border-green-500 placeholder-gray-400"
              autoFocus
            />
          </div>

          <div className="flex justify-end space-x-3">
            <CancelButton onClick={handleCancel} />
            <PrimaryButton type="submit" disabled={userName.trim() === ""}>
              Start New Chat
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
