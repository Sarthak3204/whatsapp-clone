import type { Message } from "../types";
import { useSelectedUser } from "../context/SelectedUserContext";
import { useConversations } from "../context/ConversationsContext";

export function useChatMessages() {
  const { selectedUser } = useSelectedUser();
  const { getMessages, addMessage, deleteMessage, editMessage } =
    useConversations();

  if (!selectedUser) {
    return {
      selectedUser: null,
      messages: [],
      handleOnSubmit: () => {},
      handleDeleteMessage: () => {},
      handleEditMessage: () => {},
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
    addMessage(selectedUser, newMessage);
  };

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(selectedUser.id, messageId);
  };

  const handleEditMessage = (messageId: string, newText: string) => {
    editMessage(selectedUser.id, messageId, newText);
  };

  return {
    selectedUser,
    messages,
    handleOnSubmit,
    handleDeleteMessage,
    handleEditMessage,
  };
}
