import { ArrowLeft, Info, Users, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function ChatHeader({
  chat,
  onBack,
  onOpenInfo,
  partnerTyping,
}) {
  const [openMenu, setOpenMenu] = useState(false);

  if (!chat) return null;
  const isGroup = chat.type === "group";
  const members = Array.isArray(chat.members) ? chat.members : [];

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-amber-50 relative">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="md:hidden text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center text-gray-800 font-semibold">
          {chat.name[0]}
        </div>

        <div>
          <h3 className="font-medium text-gray-800">{chat.name}</h3>

          {partnerTyping ? (
            <p className="text-xs text-amber-600 animate-pulse">Typing…</p>
          ) : isGroup ? (
            <p className="text-xs text-gray-500">{members.length} members</p>
          ) : (
            <p className="text-xs text-gray-500">
              {chat.online ? "Online" : "Offline"}
            </p>
          )}

          {/* GROUP MEMBERS AVATAR ROW */}
          {isGroup && (
            <div className="flex items-center gap-1 mt-1">
              {members.slice(0, 5).map((m) => (
                <div
                  key={m.id}
                  className="w-6 h-6 rounded-full bg-amber-300 flex items-center justify-center text-[10px] font-semibold text-gray-800"
                >
                  {m.name.charAt(0)}
                </div>
              ))}

              {members.length > 5 && (
                <div className="text-xs text-gray-600 ml-1">
                  +{members.length - 5} more
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 relative">
        {isGroup && (
          <button
            onClick={onOpenInfo}
            className="text-gray-700 hover:text-amber-600 hidden md:flex"
          >
            <Users className="w-5 h-5" />
          </button>
        )}

        {/* MENU BUTTON */}
        <button
          onClick={() => setOpenMenu((p) => !p)}
          className="text-gray-700 hover:text-amber-600"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {/* DROPDOWN */}
        {openMenu && (
          <div className="absolute right-0 top-10 w-44 bg-white border rounded-lg shadow-lg py-2 z-50">
            {isGroup ? (
              <>
                <MenuItem label="Group Info" onClick={onOpenInfo} />
                <MenuItem label="Add Members" />
                <MenuItem label="Mute Notifications" />
                <MenuItem label="Clear Chat" danger />
                <MenuItem label="Exit Group" danger />
              </>
            ) : (
              <>
                <MenuItem label="View Contact" onClick={onOpenInfo} />
                <MenuItem label="Search Messages" />
                <MenuItem label="Mute Notifications" />
                <MenuItem label="Clear Chat" danger />
                <MenuItem label="Block User" danger />
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function MenuItem({ label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm hover:bg-stone-100 ${
        danger ? "text-red-600" : "text-gray-700"
      }`}
    >
      {label}
    </button>
  );
}
