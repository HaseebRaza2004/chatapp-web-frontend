import { useState } from "react";
import { ArrowLeft, Search } from "lucide-react";

export default function NewChat({ onBack, users = [], onStartChat }) {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* HEADER */}
      <header className="flex items-center gap-3 px-4 py-3 border-b bg-amber-50">
        <button onClick={onBack} className="text-gray-700 md:hidden">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-gray-800">New Chat</h2>
      </header>

      {/* SEARCH BAR */}
      <div className="px-4 py-3 border-b bg-white flex items-center gap-2">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search users..."
          className="flex-1 outline-none text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((u) => (
          <div
            key={u.id}
            onClick={() => onStartChat(u)}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-amber-50 border-b"
          >
            <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center text-gray-800 font-semibold">
              {u.name[0]}
            </div>

            <div>
              <p className="font-medium text-gray-800">{u.name}</p>
              <p className="text-xs text-gray-500">
                {u.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No users found</p>
        )}
      </div>
    </div>
  );
}
