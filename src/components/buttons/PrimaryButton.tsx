type PrimaryButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  isDestructive?: boolean;
};

export default function PrimaryButton({
  onClick,
  type = "button",
  disabled = false,
  children,
  className,
  isDestructive = false,
}: PrimaryButtonProps) {
  const defaultClassName = isDestructive
    ? "px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
    : "px-6 py-2 bg-[rgb(33,192,99)] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity cursor-pointer";

  const finalClassName = className || defaultClassName;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClassName}
    >
      {children}
    </button>
  );
}
