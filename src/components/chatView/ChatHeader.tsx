import { memo } from "react";
import type { User } from "../../types";

const ChatHeader = memo(function ChatHeader({ user }: { user: User }) {
  return (
    <div className="flex p-2.5 rounded-lg">
      <div className="flex justify-center items-center px-2">
        <img
          className="rounded-full w-12 h-12"
          src={user.profileImage}
          alt=""
        />
      </div>
      <div className="ml-2 flex flex-col justify-center text-white">
        <div className="font-medium">{user.name}</div>
      </div>
    </div>
  );
});

export default ChatHeader;
