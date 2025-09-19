type ModalActionsProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ModalActions({
  children,
  className = "flex justify-end space-x-3",
}: ModalActionsProps) {
  return <div className={className}>{children}</div>;
}
