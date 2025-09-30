import ChatList from "../components/chatList/ChatList";
import DefaultChatView from "../components/chatView/DefaultChatView";
import ChatView from "../components/chatView/ChatView";
import { ViewModeProvider } from "../context/ViewModeContext";
import ChatListHeader from "../components/chatList/ChatListHeader";
import { useState, useCallback } from "react";
import type { User } from "../types";
import { loadConnectionsFromStorage } from "../utils";
import { useConversations } from "../hooks/useConversations";

function ChatPageContent() {
  const [connections, setConnections] = useState<User[]>(
    loadConnectionsFromStorage()
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const {
    getMessages,
    addMessage,
    deleteMessage,
    editMessage,
    deleteConversation,
  } = useConversations();

  const handleDeleteConnection = useCallback((userId: string) => {
    setConnections((prev) => prev.filter((user) => user.id !== userId));
    setSelectedUser(null);
    deleteConversation(userId);
  }, []);

  const handleDeleteConversation = useCallback((userId: string) => {
    setSelectedUser(null);
    deleteConversation(userId);
  }, []);

  const handleNewUser = useCallback((newUser: User) => {
    setConnections((prev) => [...prev, newUser]);
  }, []);

  return (
    <div className="flex h-screen bg-[rgb(22,23,23)] overflow-x-auto">
      <div className="flex min-w-full">
        <div className="grow-0 shrink-0 sm:basis-[45%] lg:basis-[40%] xl:basis-[30%] border-r border-gray-700 flex flex-col min-w-[280px]">
          <ChatListHeader onNewUser={handleNewUser} />
          <div className="flex-1 overflow-hidden">
            <ChatList
              connections={connections}
              getMessages={getMessages}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              onDeleteConnection={handleDeleteConnection}
              onDeleteConversation={handleDeleteConversation}
            />
          </div>
        </div>
        {selectedUser ? (
          <div className="flex-1 flex flex-col bg-[url(/bg-chat-room.png)] bg-repeat bg-auto bg-center min-w-[320px]">
            <ChatView
              selectedUser={selectedUser}
              messages={getMessages(selectedUser.id)}
              onAddMessage={addMessage}
              onDeleteMessage={deleteMessage}
              onEditMessage={editMessage}
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col p-7 justify-between h-full min-w-[320px]">
            <DefaultChatView />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <ViewModeProvider>
      <ChatPageContent />
    </ViewModeProvider>
  );
}
