export default function ChatMessages({ messages, isGroup }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.senderId === "me" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-2xl text-sm max-w-[70%] ${
              msg.senderId === "me"
                ? "bg-amber-500 text-white"
                : "bg-stone-200 text-gray-800"
            }`}
          >
            {/* Show sender name only in group chats */}
            {isGroup && msg.senderId !== "me" && (
              <p className="text-xs font-semibold text-amber-600 mb-1">
                {msg.senderName}
              </p>
            )}

            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
}