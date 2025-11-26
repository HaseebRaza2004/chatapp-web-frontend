import MessageBubble from "./MessageBubble";

export default function ChatMessages({
  messages = [],
  isGroup,
  partnerTyping,
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, index) => {
        const isMe = msg.senderId === "me";
        const prev = messages[index - 1];

        const showSender =
          isGroup &&
          !isMe &&
          msg.senderName &&
          (!prev || prev.senderId !== msg.senderId);

        return (
          <div
            key={msg.id}
            className={`flex ${
              isMe ? "justify-end pr-2" : "justify-start pl-1"
            }`}
          >
            <div>
              {showSender && (
                <p className="text-[11px] text-gray-600 mb-0.5 ml-1 font-medium">
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

      {/* TYPING INDICATOR */}
      {partnerTyping && (
        <div className="text-[12px] text-gray-500 ml-2 animate-pulse">
          Typing…
        </div>
      )}
    </div>
  );
}