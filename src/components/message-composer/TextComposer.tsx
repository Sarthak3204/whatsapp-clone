import SendButton from "../buttons/SendButton";
import MessageInput from "./MessageInput";
import { useMessageInput } from "../../hooks/useMessageInput";
import AddButton from "../buttons/AddButton";
import EmojiButton from "../buttons/EmojiButton";

export default function TextComposer() {
  const { message, setMessage, textareaRef, handleSubmit, handleKeyDown } =
    useMessageInput();

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-end justify-between mx-3 mb-3 p-1 border-1 border-gray-700 rounded-3xl bg-[rgb(36,38,38)]">
        <AddButton />
        <EmojiButton />
        <MessageInput
          value={message}
          onChange={setMessage}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
        />
        <div className="ml-1.5">
          <SendButton />
        </div>
      </div>
    </form>
  );
}
