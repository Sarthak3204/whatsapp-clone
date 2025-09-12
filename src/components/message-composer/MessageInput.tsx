type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  ref: React.Ref<HTMLTextAreaElement>;
};

export default function MessageInput({
  value,
  onChange,
  onKeyDown,
  placeholder = "Type a message...",
  ref,
}: MessageInputProps) {
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className="px-3 py-2 w-full bg-transparent outline-none text-white placeholder-gray-400 resize-none max-h-32 min-h-[2.5rem]"
      placeholder={placeholder}
      rows={1}
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement;
        target.style.height = Math.min(target.scrollHeight, 128) + "px";
      }}
    />
  );
}
