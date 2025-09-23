import type { Message } from "../../types";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import Timestamp from "../Timestamp";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import EditMessageModal from "../modals/EditMessageModal";
import { useState, memo } from "react";
import { useViewMode } from "../../context/ViewModeContext";
import { useSelectedUser } from "../../context/SelectedUserContext";

type UserMessageProps = {
  message: Message;
  onDeleteMessage: (userId: string, messageId: string) => void;
  onEditMessage: (userId: string, messageId: string, newText: string) => void;
};

const UserMessage = memo(function UserMessage({
  message,
  onDeleteMessage,
  onEditMessage,
}: UserMessageProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { viewMode } = useViewMode();
  const { selectedUser } = useSelectedUser();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  return (
    <>
      <li className="flex justify-end mb-2">
        <div className="group relative max-w-xs lg:max-w-md py-2 px-3 rounded-lg bg-[rgb(0,95,78)] text-white">
          <div className="absolute -top-3 right-6">
            <EditButton onClick={handleEditClick} />
          </div>
          <div className="absolute -top-3 -right-2">
            <DeleteButton onClick={handleDeleteClick} />
          </div>
          <p
            className={`text-sm whitespace-pre-wrap ${
              viewMode === "compact" && "pr-14"
            }`}
          >
            {message.text}
          </p>
          {viewMode === "compact" && (
            <div className="absolute bottom-1 right-2">
              <Timestamp timestamp={message.timestamp} />
            </div>
          )}
        </div>
      </li>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => onDeleteMessage(selectedUser!.id, message.id)}
        title="Delete Message"
        message="Are you sure you want to delete this message?"
        confirmText="Yes"
      />

      <EditMessageModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={(newText) =>
          onEditMessage(selectedUser!.id, message.id, newText)
        }
        currentText={message.text}
      />
    </>
  );
});

export default UserMessage;
