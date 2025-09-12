import AddIcon from "../../assets/add.svg";

export default function AddButton() {
  return (
    <button
      type="button"
      className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80"
    >
      <img src={AddIcon} alt="Add" />
    </button>
  );
}
