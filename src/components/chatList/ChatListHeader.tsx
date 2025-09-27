import { memo, useState } from "react";
import NewChatButton from "../buttons/NewChatButton";
import NewChatModal from "../modals/NewChatModal";
import { useViewMode } from "../../context/ViewModeContext";
import type { User } from "../../types";

type ChatListHeaderProps = {
  onNewUser: (user: User) => void;
};

const ChatListHeader = memo(function ChatListHeader({
  onNewUser,
}: ChatListHeaderProps) {
  const { viewMode, toggleViewMode } = useViewMode();
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const handleNewUser = (user: User) => {
    onNewUser(user);
    setIsNewChatModalOpen(false);
  };

  return (
    <>
      <div className="m-2 px-2 flex justify-between items-center">
        <div className="p-2.5 text-white text-2xl font-medium">
          <h1>WhatsApp</h1>
        </div>
        <div className="p-2.5 gap-4 flex items-center space-x-3">
          <NewChatButton onClick={() => setIsNewChatModalOpen(true)} />
          <button
            onClick={toggleViewMode}
            className="text-white text-xs px-2 py-1 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
            title={`Switch to ${
              viewMode === "compact" ? "spacious" : "compact"
            } mode`}
          >
            {viewMode === "compact" ? "Compact" : "Spacious"}
          </button>
        </div>
      </div>

      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        setNewUser={handleNewUser}
      />
    </>
  );
});

export default ChatListHeader;
