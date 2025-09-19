type CancelButtonProps = {
  onClick: () => void;
  className?: string;
};

export default function CancelButton({
  onClick,
  className = "px-4 py-2 text-gray-300 hover:text-white transition-colors cursor-pointer",
}: CancelButtonProps) {
  return (
    <button type="button" onClick={onClick} className={className}>
      Cancel
    </button>
  );
}
