import UserMessage from "./UserMessage";
import ItemList from "../common/ItemList";
import ActionHandler from "../actions/ActionHandler";
import DeleteConfirmationAction from "../actions/DeleteConfirmationAction";
import EditMessageAction from "../actions/EditMessageAction";
import type { Message, User } from "../../types";
import { useCallback } from "react";

type MessageListProps = {
  selectedUser: User;
  messages: Message[];
  onDeleteMessage: (userId: string, messageId: string) => void;
  onEditMessage: (userId: string, messageId: string, newText: string) => void;
};

export default function MessageList({
  selectedUser,
  messages,
  onDeleteMessage,
  onEditMessage,
}: MessageListProps) {
  const createActionComponents = useCallback(
    (message: Message) => [
      {
        actionName: `delete-${message.id}`,
        component: DeleteConfirmationAction,
        props: {
          title: "Delete Message",
          message: "Are you sure you want to delete this message?",
          confirmText: "Yes",
          onConfirm: () => onDeleteMessage(selectedUser.id, message.id),
        },
      },
      {
        actionName: `edit-${message.id}`,
        component: EditMessageAction,
        props: {
          currentText: message.text,
          onSave: (newText: string) =>
            onEditMessage(selectedUser.id, message.id, newText),
        },
      },
    ],
    [selectedUser.id]
  );

  return (
    <ItemList<Message>
      items={messages}
      className="p-4"
      emptyMessage="No messages yet"
      renderItem={(message) => (
        <ActionHandler actionComponents={createActionComponents(message)}>
          {({ onAction }) => (
            <UserMessage message={message} onAction={onAction} />
          )}
        </ActionHandler>
      )}
    />
  );
}
