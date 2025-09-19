import type { User } from "../../types";
import { useState } from "react";
import BaseModal from "./BaseModal";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() === "") return;
    const newUser: User = {
      id: crypto.randomUUID(),
      name: userName.trim(),
      profileImage: "/default-profile.svg",
    };
    setNewUser(newUser);
    setUserName("");
    onClose();
  };

  const handleCancel = () => {
    setUserName("");
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} onCancel={handleCancel}>
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
          <CancelButton
            onClick={() => {
              handleCancel();
              onClose();
            }}
          />
          <PrimaryButton type="submit" disabled={userName.trim() === ""}>
            Start New Chat
          </PrimaryButton>
        </div>
      </form>
    </BaseModal>
  );
}
