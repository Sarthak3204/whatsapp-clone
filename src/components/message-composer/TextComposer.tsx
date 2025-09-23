import SendButton from "../buttons/SendButton";
import MessageInput from "./MessageInput";
import AddButton from "../buttons/AddButton";
import EmojiButton from "../buttons/EmojiButton";
import { useState, useEffect, useRef } from "react";
import { useSelectedUser } from "../../context/SelectedUserContext";

type TextComposerProps = {
  onSubmit: (text: string) => void;
};

export default function TextComposer({ onSubmit }: TextComposerProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { selectedUser } = useSelectedUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      onSubmit(message);
      setMessage("");
    }
  };

  useEffect(() => {
    if (message === "" && textareaRef.current) {
      textareaRef.current.style.height = "2.5rem";
    }
  }, [message]);

  useEffect(() => {
    setMessage("");
  }, [selectedUser]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-end justify-between mx-3 mb-3 p-1 border-1 border-gray-700 rounded-3xl bg-[rgb(36,38,38)] min-w-[300px]">
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
