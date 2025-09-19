import CrossIcon from "../../assets/cross.svg";

export default function DeleteButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
    >
      <img src={CrossIcon} alt="Delete" className="w-3 h-3 invert" />
    </button>
  );
}
