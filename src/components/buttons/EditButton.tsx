import EditIcon from "../../assets/edit.svg";

export default function EditButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 bg-blue-500 hover:bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
    >
      <img src={EditIcon} alt="Edit" className="w-3 h-3" />
    </button>
  );
}
