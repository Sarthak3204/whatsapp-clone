import ChatItem from "./ChatItem";
import ItemList from "../common/ItemList";

import { ChatActionHandler, CHAT_ACTION_TYPES } from "./actionHandler";
import type { ChatActionPayload } from "./actionHandler";
import type { User, Message } from "../../types";
import { memo, useCallback, useState } from "react";

type ChatListProps = {
  connections: User[];
  getMessages: (userId: string) => Message[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  onDeleteConnection: (userId: string) => void;
  onDeleteConversation: (userId: string) => void;
};

const ChatList = memo(function ChatList({
  connections,
  getMessages,
  selectedUser,
  setSelectedUser,
  onDeleteConnection,
  onDeleteConversation,
}: ChatListProps) {
  const [openDropdownUserId, setOpenDropdownUserId] = useState<string | null>(
    null
  );

  const handleChatAction = useCallback(
    (action: ChatActionPayload) => {
      const userId = action.payload?.userId as string;
      switch (action.type) {
        case CHAT_ACTION_TYPES.DELETE_CHAT_CONFIRMATION:
          onDeleteConnection(userId);
          break;

        case CHAT_ACTION_TYPES.DELETE_CONVERSATION_CONFIRMATION:
          onDeleteConversation(userId);
          break;

        case CHAT_ACTION_TYPES.TOGGLE_CHAT_DROPDOWN: {
          const uid = action.payload?.userId as string;
          setOpenDropdownUserId((prev) => (prev === uid ? null : uid));
          break;
        }

        default:
          console.log("Unknown chat action:", action);
          break;
      }
    },
    [onDeleteConnection, onDeleteConversation]
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
          user={user}
          openDropdownUserId={openDropdownUserId}
        >
          {({ dropdownItems, isDropdownOpen, onToggleDropdown }) => (
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
                dropdownItems={dropdownItems}
                messages={getMessages(user.id)}
                isDropdownOpen={isDropdownOpen}
                onToggleDropdown={onToggleDropdown}
              />
            </div>
          )}
        </ChatActionHandler>
      )}
    />
  );
});

export default ChatList;
