import WhatsAppWebLogo from "../../assets/whatsapp-web.svg";
import LockIcon from "../../assets/lock.svg";

export default function DefaultChatView() {
  return (
    <>
      <div className="flex flex-1 flex-col justify-center items-center">
        <img className="max-w-xs" src={WhatsAppWebLogo} alt="WhatsApp Web" />
        <div className="mt-10">
          <h1 className="flex justify-center font-medium text-2xl text-white">
            WhatsApp Web
          </h1>
        </div>
        <div className="text-center mt-4 text-gray-400">
          Send and receive messages without keeping your phone online.
          <br />
          Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
        </div>
      </div>

      <div className="flex justify-center items-center text-gray-400">
        <img src={LockIcon} alt="Lock" className="w-5 h-5 mr-2 invert" />
        Your personal messages are end-to-end encrypted
      </div>
    </>
  );
}
