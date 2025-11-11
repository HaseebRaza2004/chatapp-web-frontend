import { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import Input from "../components/ui/Input";
import Logo from "../components/Logo";

export default function ContactsPage() {
  const [search, setSearch] = useState("");

  // Dummy data – future me API/socket se aayega
  const contacts = [
    { id: 1, name: "Ahsan Ali", lastMsg: "See you soon!", online: true },
    { id: 2, name: "Haseeb Raza", lastMsg: "Got it ✅", online: false },
    { id: 3, name: "Amna Khan", lastMsg: "Typing...", online: true },
    { id: 4, name: "Zain Malik", lastMsg: "Good night 🌙", online: false },
  ];

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-stone-50">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-4 bg-white shadow-sm border-b">
        <div className="flex items-center gap-2">
          <Logo />
          <h1 className="text-lg font-semibold text-gray-800">Chats</h1>
        </div>
        <button className="text-amber-600 hover:text-amber-700">
          <MessageCircle className="w-6 h-6" />
        </button>
      </header>

      {/* Search */}
      <div className="px-4 py-3 bg-white border-b">
        <Input
          icon={<Search className="w-5 h-5" />}
          placeholder="Search or start new chat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-stone-50"
        />
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        {filtered.length ? (
          filtered.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-amber-50 cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center text-gray-800 font-semibold">
                    {c.name[0]}
                  </div>
                  {c.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    {c.name}
                  </h3>
                  <p className="text-xs text-gray-500">{c.lastMsg}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-10">No contacts found</p>
        )}
      </div>
    </div>
  );
}
