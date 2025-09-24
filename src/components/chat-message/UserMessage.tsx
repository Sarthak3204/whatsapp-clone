import type { Message, User } from "../../types";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import Timestamp from "../Timestamp";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import EditMessageModal from "../modals/EditMessageModal";
import ActionModal from "../modals/ActionModal";
import { memo } from "react";
import { useViewMode } from "../../context/ViewModeContext";

type UserMessageProps = {
  selectedUser: User;
  message: Message;
  onDeleteMessage: (userId: string, messageId: string) => void;
  onEditMessage: (userId: string, messageId: string, newText: string) => void;
};

const UserMessage = memo(function UserMessage({
  selectedUser,
  message,
  onDeleteMessage,
  onEditMessage,
}: UserMessageProps) {
  const { viewMode } = useViewMode();

  return (
    <ActionModal>
      {(modal, setModal) => (
        <>
          <li className="flex justify-end mb-2">
            <div className="group relative max-w-xs lg:max-w-md py-2 px-3 rounded-lg bg-[rgb(0,95,78)] text-white">
              <div className="absolute -top-3 right-6">
                <EditButton onClick={() => setModal("edit")} />
              </div>
              <div className="absolute -top-3 -right-2">
                <DeleteButton onClick={() => setModal("delete")} />
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
            isOpen={modal === "delete"}
            onClose={() => setModal(null)}
            onConfirm={() => {
              onDeleteMessage(selectedUser.id, message.id);
              setModal(null);
            }}
            title="Delete Message"
            message="Are you sure you want to delete this message?"
            confirmText="Yes"
          />

          <EditMessageModal
            isOpen={modal === "edit"}
            onClose={() => setModal(null)}
            onSave={(newText) => {
              onEditMessage(selectedUser.id, message.id, newText);
              setModal(null);
            }}
            currentText={message.text}
          />
        </>
      )}
    </ActionModal>
  );
});

export default UserMessage;
