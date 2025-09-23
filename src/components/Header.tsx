import NewChatIcon from "../assets/new-chat-icon.svg";
import type { User } from "../types";
import { useState } from "react";
import NewChatModal from "./modals/NewChatModal";
import { useViewMode } from "../context/ViewModeContext";

export default function Header({
  setConnections,
}: {
  setConnections: (connections: (prev: User[]) => User[]) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <>
      <div className="m-2 px-2 flex justify-between items-center">
        <div className="p-2.5 text-white text-2xl font-medium">
          <h1>WhatsApp</h1>
        </div>
        <div className="p-2.5 gap-4 flex items-center space-x-3">
          <button className="" onClick={() => setIsModalOpen(true)}>
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setNewUser={(newUser: User) =>
          setConnections((prev) => [...prev, newUser])
        }
      />
    </>
  );
}
