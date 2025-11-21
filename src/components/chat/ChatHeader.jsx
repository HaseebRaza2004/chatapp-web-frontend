import { ArrowLeft, Info, Users } from "lucide-react";

export default function ChatHeader({ chat, onBack, onOpenInfo }) {
  if (!chat) return null;

  const isGroup = chat.type === "group";
  const members = Array.isArray(chat.members) ? chat.members : [];

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-amber-50">
      {/* LEFT: Back + Avatar + Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Back Button */}
        <button onClick={onBack} className="md:hidden text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center text-gray-800 font-semibold">
            {chat.name?.[0] || "?"}
          </div>
        </div>

        {/* Title + Status */}
        <div>
          <h3 className="font-medium text-gray-800">{chat.name}</h3>

          {/* PRIVATE STATUS */}
          {!isGroup && (
            <p className="text-xs text-gray-500">
              {chat.online ? "Online" : "Offline"}
            </p>
          )}

          {/* GROUP MEMBERS */}
          {isGroup && (
            <p className="text-xs text-gray-500">{members.length} members</p>
          )}

          {/* OPTIONAL: TYPING INDICATOR (Group or Private) */}
          {chat.isTyping && (
            <p className="text-[11px] text-amber-600 animate-pulse">
              {isGroup ? `${chat.typingName} is typing…` : "Typing…"}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT: action icons */}
      <div className="flex items-center gap-2">
        {isGroup && (
          <button
            onClick={onOpenInfo}
            className="text-gray-700 hover:text-amber-600 hidden md:flex"
          >
            <Users className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={onOpenInfo}
          className="text-gray-700 hover:text-amber-600"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}