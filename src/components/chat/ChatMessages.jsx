export default function ChatMessages({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`flex ${
            m.sender === "me" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-2xl text-sm max-w-[70%] ${
              m.sender === "me"
                ? "bg-amber-500 text-white"
                : "bg-stone-200 text-gray-800"
            }`}
          >
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
}
