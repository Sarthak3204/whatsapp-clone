import NewChatIcon from "../assets/new-chat-icon.svg";
import MoreMenuIcon from "../assets/more-menu.svg";

export default function Header() {
  return (
    <div className="m-2 px-2 flex justify-between items-center">
      <div className="p-2.5 text-white text-2xl font-medium">
        <h1>WhatsApp</h1>
      </div>
      <div className="p-2.5 gap-4 flex items-center space-x-3">
        <img
          src={NewChatIcon}
          alt="New Chat"
          className="w-7 h-7 cursor-pointer hover:opacity-80"
        />
        <img
          src={MoreMenuIcon}
          alt="More Menu"
          className="w-7 h-7 cursor-pointer hover:opacity-80"
        />
      </div>
    </div>
  );
}
