type ModalContentProps = {
  title?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export default function ModalContent({
  title,
  children,
  actions,
  className = "text-center",
}: ModalContentProps) {
  return (
    <div className={className}>
      {title && (
        <h2 className="text-white text-xl font-medium mb-4">{title}</h2>
      )}
      <div className="mb-6">{children}</div>
      {actions && <div className="flex justify-end space-x-3">{actions}</div>}
    </div>
  );
}
