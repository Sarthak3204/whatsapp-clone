import { ChatViewLayout, SLOT_NAMES } from "./layout";
import TextComposer from "../messageComposer/TextComposer";
import MessageList from "../messageList/MessageList";
import ChatHeader from "./ChatHeader";
import type { Message, User } from "../../types";

type ChatViewProps = {
  selectedUser: User;
  messages: Message[];
  onAddMessage: (user: User, message: Message) => void;
  onDeleteMessage: (userId: string, messageId: string) => void;
  onEditMessage: (userId: string, messageId: string, newText: string) => void;
};

export default function ChatView({
  selectedUser,
  messages,
  onAddMessage,
  onDeleteMessage,
  onEditMessage,
}: ChatViewProps) {
  return (
    <ChatViewLayout autoScroll={true}>
      <ChatViewLayout.Slot name={SLOT_NAMES.HEADER}>
        <ChatHeader user={selectedUser} />
      </ChatViewLayout.Slot>

      <ChatViewLayout.Slot name={SLOT_NAMES.BODY}>
        <MessageList
          selectedUser={selectedUser}
          messages={messages}
          onDeleteMessage={onDeleteMessage}
          onEditMessage={onEditMessage}
        />
      </ChatViewLayout.Slot>

      <ChatViewLayout.Slot name={SLOT_NAMES.FOOTER}>
        <TextComposer
          key={selectedUser.id}
          onSubmit={(text) => {
            if (!selectedUser || text.trim() === "") return;
            const newMessage: Message = {
              id: Date.now().toString(),
              text: text.trim(),
              timestamp: new Date(),
            };
            onAddMessage(selectedUser, newMessage);
          }}
        />
      </ChatViewLayout.Slot>
    </ChatViewLayout>
  );
}
