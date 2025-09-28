import ChatItem from "./ChatItem";
import ItemList from "../common/ItemList";

import { ChatActionHandler, CHAT_ACTION_TYPES } from "./actionHandler";
import type { ChatActionPayload } from "./actionHandler";
import type { OverlayActionPayload } from "../overlays/actionHandler";
import type { User, Message } from "../../types";
import { memo, useCallback } from "react";

type ChatListProps = {
  connections: User[];
  setConnections: (update: (prev: User[]) => User[]) => void;
  deleteConversation: (userId: string) => void;
  getMessages: (userId: string) => Message[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  onOverlayAction: (action: OverlayActionPayload) => void;
};

const ChatList = memo(function ChatList({
  connections,
  setConnections,
  deleteConversation,
  getMessages,
  selectedUser,
  setSelectedUser,
  onOverlayAction,
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
    (action: ChatActionPayload) => {
      switch (action.type) {
        case CHAT_ACTION_TYPES.DELETE_CHAT_CONFIRMATION:
          handleDeleteConnection(action.payload?.userId as string);
          break;

        case CHAT_ACTION_TYPES.DELETE_CONVERSATION_CONFIRMATION:
          setSelectedUser(null);
          deleteConversation(action.payload?.userId as string);
          break;

        default:
          console.log("Unknown chat action:", action);
          break;
      }
    },
    [handleDeleteConnection, setSelectedUser, deleteConversation]
  );

  return (
    <ItemList
      items={connections}
      className="p-2 space-y-1 overflow-y-auto h-full"
      emptyMessage="No conversations yet"
      emptyClassName="flex items-center justify-center h-full text-gray-400 text-lg"
      renderItem={(user) => (
        <ChatActionHandler
          onChange={handleChatAction}
          onOverlayAction={onOverlayAction}
          user={user}
        >
          {({ dropdownItems, isPopoverOpen }) => (
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
                onOverlayAction={onOverlayAction}
                dropdownItems={dropdownItems}
                messages={getMessages(user.id)}
                isDropdownOpen={isPopoverOpen}
              />
            </div>
          )}
        </ChatActionHandler>
      )}
    />
  );
});

export default ChatList;
