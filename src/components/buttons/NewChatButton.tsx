import NewChatIcon from "../../assets/new-chat-icon.svg";

type NewChatButtonProps = {
  onClick: () => void;
};

export default function NewChatButton({ onClick }: NewChatButtonProps) {
  return (
    <button className="" onClick={onClick}>
      <img
        src={NewChatIcon}
        alt="New Chat"
        className="w-7 h-7 cursor-pointer hover:opacity-80"
      />
    </button>
  );
}
