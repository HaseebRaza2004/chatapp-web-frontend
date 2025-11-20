import { ArrowLeft, Info, Users } from "lucide-react";

export default function ChatHeader({ chat, onBack, onOpenInfo }) {
  if (!chat) return null;

  const isGroup = chat.type === "group";

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-amber-50">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        {/* BACK BUTTON — only mobile */}
        <button onClick={onBack} className="md:hidden text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center text-gray-800 font-semibold">
            {chat.name?.[0] || "?"}
          </div>
        </div>

        {/* TEXT AREA */}
        <div>
          <h3 className="font-medium text-gray-800">{chat.name}</h3>

          {/* PRIVATE STATUS */}
          {!isGroup && (
            <p className="text-xs text-gray-600">
              {chat.online ? "Online" : "Offline"}
            </p>
          )}

          {/* GROUP INFO (members count + avatars row) */}
          {isGroup && (
            <>
              <p className="text-xs text-gray-600">
                {chat.members?.length || 0} members
              </p>

              {/* MEMBER AVATARS */}
              <div className="flex items-center mt-1 -space-x-2">
                {chat.members?.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center text-[10px] font-medium border border-white"
                  >
                    {m.name?.[0] || "?"}
                  </div>
                ))}

                {chat.members?.length > 3 && (
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-[10px] border border-white">
                    +{chat.members.length - 3}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex items-center gap-3">
        {/* GROUP ICON (desktop only) */}
        {isGroup && <Users className="hidden md:block w-5 h-5 text-gray-700" />}

        {/* INFO BUTTON */}
        <button
          onClick={onOpenInfo}
          className="text-gray-700 hover:text-gray-900 transition"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
