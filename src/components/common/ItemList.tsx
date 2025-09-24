type ItemWithId = {
  id: string;
};

type ItemListProps<T extends ItemWithId> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  emptyMessage?: string;
  emptyClassName?: string;
};

export default function ItemList<T extends ItemWithId>({
  items,
  renderItem,
  className = "",
  emptyMessage,
  emptyClassName = "text-center text-gray-400 mt-20",
}: ItemListProps<T>) {
  if (items.length === 0 && emptyMessage) {
    return <div className={emptyClassName}>{emptyMessage}</div>;
  }

  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item.id}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
