export default function Timestamp({ timestamp }: { timestamp: Date }) {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex items-center">
      <span className="text-xs text-gray-300">{formatTime(timestamp)}</span>
    </div>
  );
}
