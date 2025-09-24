import NewChatIcon from "../assets/new-chat-icon.svg";
import type { User } from "../types";
import { memo } from "react";
import NewChatModal from "./modals/NewChatModal";
import ActionModal from "./modals/ActionModal";
import { useViewMode } from "../context/ViewModeContext";

const Header = memo(function Header({
  setConnections,
}: {
  setConnections: (connections: (prev: User[]) => User[]) => void;
}) {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <ActionModal>
      {(modal, setModal) => (
        <>
          <div className="m-2 px-2 flex justify-between items-center">
            <div className="p-2.5 text-white text-2xl font-medium">
              <h1>WhatsApp</h1>
            </div>
            <div className="p-2.5 gap-4 flex items-center space-x-3">
              <button className="" onClick={() => setModal("newChat")}>
                <img
                  src={NewChatIcon}
                  alt="New Chat"
                  className="w-7 h-7 cursor-pointer hover:opacity-80"
                />
              </button>
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
            isOpen={modal === "newChat"}
            onClose={() => setModal(null)}
            setNewUser={(newUser: User) =>
              setConnections((prev) => [...prev, newUser])
            }
          />
        </>
      )}
    </ActionModal>
  );
});

export default Header;
