import EmojiIcon from "../../assets/emoji.svg";

export default function EmojiButton() {
  return (
    <button
      type="button"
      className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80"
    >
      <img src={EmojiIcon} alt="Emoji" />
    </button>
  );
}
