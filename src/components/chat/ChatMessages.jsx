import MessageBubble from "./MessageBubble";

export default function ChatMessages({ messages = [], isGroup }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => {
        const isMe = msg.senderId === "me";

        return (
          <div
            key={msg.id}
            className={`flex ${
              isMe ? "justify-end pr-2" : "justify-start pl-1"
            }`}
          >
            <div>
              {/* GROUP: sender name */}
              {isGroup && !isMe && msg.senderName && (
                <p className="text-[11px] text-gray-600 mb-0.5 ml-1">
                  {msg.senderName}
                </p>
              )}

              <MessageBubble
                text={msg.text}
                sender={isMe ? "me" : msg.senderId}
                time={msg.time}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
