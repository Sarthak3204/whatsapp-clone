import { useState } from "react";

type ModalType = "edit" | "delete" | "newChat" | null;

type ActionModalProps = {
  children: (
    modal: ModalType,
    setModal: (modal: ModalType) => void
  ) => React.ReactNode;
};

export default function ActionModal({ children }: ActionModalProps) {
  const [modal, setModal] = useState<ModalType>(null);

  return <>{children(modal, setModal)}</>;
}
