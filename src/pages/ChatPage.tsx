import ChatList from "../components/chat-list/ChatList";
import DefaultChatView from "../components/chat-view/DefaultChatView";
import ChatView from "../components/chat-view/ChatView";
import {
  SelectedUserProvider,
  useSelectedUser,
} from "../context/SelectedUserContext";
import { ConversationsProvider } from "../context/ConversationsContext";
import Header from "../components/Header";

function ChatPageContent() {
  const { selectedUser } = useSelectedUser();

  return (
    <div className="flex h-screen bg-[rgb(22,23,23)]">
      <div className="grow-0 shrink-0 sm:basis-[45%] lg:basis-[40%] xl:basis-[30%] border-r border-gray-700">
        <Header />
        <ChatList />
      </div>
      {selectedUser ? (
        <div className="flex-1 flex flex-col bg-[url(/bg-chat-room.png)] w-full bg-repeat bg-auto bg-center">
          <ChatView />
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-7 justify-between h-full">
          <DefaultChatView />
        </div>
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <SelectedUserProvider>
      <ConversationsProvider>
        <ChatPageContent />
      </ConversationsProvider>
    </SelectedUserProvider>
  );
}
