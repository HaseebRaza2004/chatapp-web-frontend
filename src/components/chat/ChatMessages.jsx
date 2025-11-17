import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatMessages({ messages }) {
  const listRef = useRef(null);

  // auto-scroll on new message
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  return (
    <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
      {messages.map((m) => (
        <MessageBubble key={m.id} text={m.text} sender={m.sender} time={m.time} />
      ))}
    </div>
  );
}
