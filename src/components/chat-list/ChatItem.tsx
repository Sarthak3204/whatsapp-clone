import type { User } from "../../types";

export default function ChatItem({ user }: { user: User }) {
  return (
    <div className="flex p-2.5 cursor-pointer rounded-lg transition-colors">
      <div className="flex justify-center items-center px-2">
        <img
          className="rounded-full w-12 h-12"
          src={user.profileImage}
          alt=""
        />
      </div>
      <div className="flex justify-center items-center text-white">
        {user.name}
      </div>
    </div>
  );
}
