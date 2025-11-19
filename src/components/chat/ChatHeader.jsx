import { ArrowLeft, Users } from "lucide-react";

export default function ChatHeader({ chat, onBack }) {
  const isGroup = chat?.type === "group";

  return (
    <header className="flex items-center gap-3 px-4 py-3 border-b bg-amber-50">
      <button onClick={onBack} className="md:hidden text-gray-700">
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center">
        {isGroup ? (
          <Users className="w-5 h-5 text-gray-700" />
        ) : (
          <span className="text-gray-700 font-semibold">
            {chat?.name?.[0] || "?"}
          </span>
        )}
      </div>

      {/* Name + status */}
      <div>
        <h3 className="font-medium text-gray-800">{chat?.name || "Chat"}</h3>

        <p className="text-xs text-gray-500">
          {isGroup
            ? `${chat.members.length} members`
            : chat.online
            ? "Online"
            : "Offline"}
        </p>
      </div>
    </header>
  );
}