import { useState, useEffect, useRef } from "react";
import { useConversations } from "../context/ConversationsContext";

export function useMessageInput() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { selectedUser, handleOnSubmit } = useConversations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleOnSubmit(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      handleOnSubmit(message);
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

  return {
    message,
    setMessage,
    textareaRef,
    handleSubmit,
    handleKeyDown,
  };
}
