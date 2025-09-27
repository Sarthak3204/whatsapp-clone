// Inline SVG component
const InvertedTriangleIcon = ({ className }: { className?: string }) => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    className={className}
  >
    <path d="M6 8L0 0H12L6 8Z" fill="currentColor" />
  </svg>
);

type DropdownButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  isOpen?: boolean;
  disabled?: boolean;
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export default function DropdownButton({
  onClick,
  className = "",
  isOpen = false,
  disabled = false,
  variant = "ghost",
  size = "sm",
}: DropdownButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group";

  const variantClasses = {
    default:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
    ghost:
      "text-gray-400 hover:bg-gray-600/20 hover:text-white focus-visible:ring-gray-500 active:bg-gray-600/30",
    outline:
      "border border-gray-600 bg-transparent text-gray-400 hover:bg-gray-600/20 hover:text-white hover:border-gray-500 focus-visible:ring-gray-500",
  };

  const sizeClasses = {
    sm: "h-8 w-8 p-1.5",
    md: "h-10 w-10 p-2",
    lg: "h-12 w-12 p-2.5",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isOpen ? "bg-gray-600/30 text-white" : ""}
        ${className}
      `}
    >
      <InvertedTriangleIcon
        className={`${iconSizes[size]} transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        } group-hover:scale-110`}
      />
    </button>
  );
}
