import { useEffect, useRef } from "react";

/**
 * messages: [{ id, senderId, senderName?, text, time? }]
 * isGroup: boolean
 */
export default function ChatMessages({ messages = [], isGroup = false }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
      {messages.map((m) => {
        const isMe = m.senderId === "me";
        return (
          <div
            key={m.id}
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl text-sm max-w-[78%] break-all whitespace-pre-wrap ${
                isMe
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-800 border border-stone-200"
              }`}
            >
              {isGroup && !isMe && m.senderName && (
                <div className="text-xs font-semibold text-amber-600 mb-1">
                  {m.senderName}
                </div>
              )}
              <div>{m.text}</div>
              {m.time && (
                <div
                  className={`text-[10px] mt-1 ${
                    isMe ? "text-amber-100" : "text-gray-400"
                  }`}
                >
                  {m.time}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}