import { useState } from "react";
import type { User, Message } from "../../types";
import DeleteButton from "../buttons/DeleteButton";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import { useViewMode } from "../../context/ViewModeContext";

type ChatItemProps = {
  user: User;
  messages: Message[];
  onDelete?: (userId: string) => void;
};

export default function ChatItem({ user, messages, onDelete }: ChatItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { viewMode } = useViewMode();
  const latestMessage = messages[messages.length - 1];

  return (
    <>
      <div
        className={`relative flex p-2.5 rounded-lg transition-colors group ${
          onDelete ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <div className="flex justify-center items-center px-2">
          <img
            className="rounded-full w-12 h-12"
            src={user.profileImage}
            alt=""
          />
        </div>
        <div className="ml-2 flex flex-col justify-center text-white">
          <div className="font-medium">{user.name}</div>
          {viewMode === "compact" && onDelete && (
            <div
              className="text-sm text-gray-400 truncate max-w-[200px]"
              title={latestMessage ? latestMessage.text : "No messages yet"}
            >
              {latestMessage ? latestMessage.text : "No messages yet"}
            </div>
          )}
        </div>

        {onDelete && (
          <div className="absolute -top-2 -right-2">
            <DeleteButton
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
            />
          </div>
        )}
      </div>

      {onDelete && (
        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => onDelete(user.id)}
          title="Delete Contact"
          message={`Are you sure you want to delete ${user.name}?`}
          confirmText="Yes"
        />
      )}
    </>
  );
}
