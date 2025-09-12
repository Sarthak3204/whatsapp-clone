import type { Message } from "../types";
import { useSelectedUser } from "../context/SelectedUserContext";
import { useConversations } from "../context/ConversationsContext";

export function useChatMessages() {
  const { selectedUser } = useSelectedUser();
  const { getMessages, addMessage, deleteMessage } = useConversations();

  if (!selectedUser) {
    return {
      selectedUser: null,
      messages: [],
      handleOnSubmit: () => {},
      handleDeleteMessage: () => {},
    };
  }

  const messages = getMessages(selectedUser.id);

  const handleOnSubmit = (text: string) => {
    if (text.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date(),
    };

    addMessage(selectedUser.id, newMessage);
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(selectedUser.id, messageId);
  };

  return {
    selectedUser,
    messages,
    handleOnSubmit,
    handleDeleteMessage,
  };
}
