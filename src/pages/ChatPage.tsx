import ChatList from "../components/chat-list/ChatList";
import DefaultChatView from "../components/chat-view/DefaultChatView";
import ChatView from "../components/chat-view/ChatView";
import { ViewModeProvider } from "../context/ViewModeContext";
import Header from "../components/Header";
import { useState } from "react";
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

  return (
    <div className="flex h-screen bg-[rgb(22,23,23)] overflow-x-auto">
      <div className="flex min-w-full">
        <div className="grow-0 shrink-0 sm:basis-[45%] lg:basis-[40%] xl:basis-[30%] border-r border-gray-700 flex flex-col min-w-[280px]">
          <Header setConnections={setConnections} />
          <div className="flex-1 overflow-hidden">
            <ChatList
              connections={connections}
              setConnections={setConnections}
              deleteConversation={deleteConversation}
              getMessages={getMessages}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
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
