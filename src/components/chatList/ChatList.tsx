import ChatItem from "./ChatItem";
import ItemList from "../common/ItemList";

import { ChatListActionHandler, CHAT_LIST_ACTIONS } from "./actionHandler";
import type { ActionPayload } from "./actionHandler/types";
import type { User, Message } from "../../types";
import { memo, useCallback } from "react";

type ChatListProps = {
  connections: User[];
  setConnections: (update: (prev: User[]) => User[]) => void;
  deleteConversation: (userId: string) => void;
  getMessages: (userId: string) => Message[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

const ChatList = memo(function ChatList({
  connections,
  setConnections,
  deleteConversation,
  getMessages,
  selectedUser,
  setSelectedUser,
}: ChatListProps) {
  const handleDeleteConnection = useCallback(
    (userId: string) => {
      setConnections((prev) => prev.filter((user) => user.id !== userId));
      setSelectedUser(null);
      deleteConversation(userId);
    },
    [setConnections, setSelectedUser, deleteConversation]
  );

  const handleChatAction = useCallback(
    (action: ActionPayload) => {
      switch (action.type) {
        case CHAT_LIST_ACTIONS.DELETE_CHAT_CONFIRMATION:
          handleDeleteConnection(action.payload as string);
          break;

        case CHAT_LIST_ACTIONS.DELETE_CONVERSATION_CONFIRMATION:
          setSelectedUser(null);
          deleteConversation(action.payload as string);
          break;

        default:
          console.log("Unknown chat action:", action);
          break;
      }
    },
    [handleDeleteConnection, setSelectedUser, deleteConversation]
  );

  const createChatActionComponents = useCallback(
    (user: User, onChatAction: (action: ActionPayload) => void) => [
      {
        id: `delete-contact-${user.id}`,
        actionName: "Delete Contact",
        onClick: () => {
          onChatAction({
            type: CHAT_LIST_ACTIONS.TOGGLE_DELETE_CHAT_MODAL,
            payload: user.id,
          });
        },
      },
      {
        id: `delete-conversation-${user.id}`,
        actionName: "Delete Conversation",
        onClick: () => {
          onChatAction({
            type: CHAT_LIST_ACTIONS.TOGGLE_DELETE_CONVERSATION_MODAL,
            payload: user.id,
          });
        },
      },
    ],
    []
  );

  return (
    <ItemList
      items={connections}
      className="p-2 space-y-1 overflow-y-auto h-full"
      emptyMessage="No conversations yet"
      emptyClassName="flex items-center justify-center h-full text-gray-400 text-lg"
      renderItem={(user) => (
        <ChatListActionHandler
          actionComponents={(onAction) =>
            createChatActionComponents(user, onAction)
          }
          onChange={handleChatAction}
          chatToDelete={user}
        >
          {({ onOverlayAction, isPopoverOpen }) => (
            <div
              className={`${
                selectedUser?.id === user.id
                  ? "bg-[rgb(60,61,61)]"
                  : "hover:bg-[rgb(36,38,38)]"
              } rounded-xl`}
              onClick={() => setSelectedUser(user)}
            >
              <ChatItem
                user={user}
                onAction={onOverlayAction}
                messages={getMessages(user.id)}
                isDropdownOpen={isPopoverOpen}
              />
            </div>
          )}
        </ChatListActionHandler>
      )}
    />
  );
});

export default ChatList;
