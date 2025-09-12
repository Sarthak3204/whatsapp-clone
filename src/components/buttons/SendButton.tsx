import SendIcon from "../../assets/send.svg";

export default function SendButton() {
  return (
    <button
      type="submit"
      className="w-10 h-10 rounded-full bg-[rgb(33,192,99)] flex items-center justify-center cursor-pointer hover:opacity-90"
    >
      <img src={SendIcon} alt="Send" className="w-6 h-6" />
    </button>
  );
}
