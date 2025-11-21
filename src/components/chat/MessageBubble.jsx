export default function MessageBubble({ text, sender, time }) {
  const isMe = sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          px-4 py-2 rounded-2xl text-sm 
          max-w-[96%] 
          whitespace-normal wrap-break-word 
          ${
            isMe
              ? "bg-amber-500 text-white mr-3"
              : "bg-stone-200 text-gray-800 ml-1"
          }
        `}
        style={{ wordBreak: "break-word" }}
      >
        <div>{text}</div>

        {time && (
          <div
            className={`text-[10px] mt-1 ${
              isMe ? "text-amber-100" : "text-gray-500"
            }`}
          >
            {time}
          </div>
        )}
      </div>
    </div>
  );
}