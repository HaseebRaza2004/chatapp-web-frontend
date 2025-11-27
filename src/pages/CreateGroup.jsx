import { useState } from "react";
import { ArrowLeft, Search, Users, X } from "lucide-react";

export default function CreateGroup({ onBack, users = [], onCreate }) {
  const [search, setSearch] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selected, setSelected] = useState([]);

  function toggleUser(u) {
    if (selected.find((s) => s.id === u.id)) {
      setSelected(selected.filter((s) => s.id !== u.id));
    } else {
      setSelected([...selected, u]);
    }
  }

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  function createGroupHandler() {
    if (!groupName.trim() || selected.length === 0) return;

    onCreate({
      id: Date.now(),
      name: groupName,
      members: selected,
      type: "group",
    });
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* HEADER */}
      <header className="flex items-center gap-3 px-4 py-3 border-b bg-amber-50">
        <button onClick={onBack} className="text-gray-700 md:hidden">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-gray-800">Create Group</h2>
      </header>

      {/* GROUP NAME */}
      <div className="px-4 py-3 border-b bg-white flex gap-3">
        <div className="w-12 h-12 rounded-full bg-amber-300 text-gray-800 flex items-center justify-center font-semibold">
          <Users className="w-6 h-6" />
        </div>

        <input
          type="text"
          className="flex-1 border-b outline-none py-2 text-sm"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      {/* SELECTED MEMBERS CHIPS */}
      {selected.length > 0 && (
        <div className="px-4 py-2 flex flex-wrap gap-2 border-b bg-amber-50">
          {selected.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-2 bg-white border px-3 py-1 rounded-full"
            >
              <span className="text-sm">{u.name}</span>
              <X
                className="w-4 h-4 text-gray-600 cursor-pointer"
                onClick={() => toggleUser(u)}
              />
            </div>
          ))}
        </div>
      )}

      {/* SEARCH BAR */}
      <div className="flex items-center gap-2 px-4 py-3 border-b">
        <Search className="w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search contacts..."
          className="flex-1 outline-none text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((u) => {
          const selectedUser = selected.find((s) => s.id === u.id);

          return (
            <div
              key={u.id}
              onClick={() => toggleUser(u)}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-amber-50 border-b"
            >
              <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center text-gray-800 font-semibold">
                {u.name[0]}
              </div>

              <p className="font-medium text-gray-800">{u.name}</p>

              {selectedUser && (
                <div className="ml-auto bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                  Selected
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CREATE GROUP BUTTON */}
      <div className="p-4 border-t">
        <button
          onClick={createGroupHandler}
          className="w-full bg-amber-500 text-white py-2 rounded-lg font-medium hover:bg-amber-600"
        >
          Create Group
        </button>
      </div>
    </div>
  );
}