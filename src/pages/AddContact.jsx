import { ArrowLeft, UserPlus } from "lucide-react";
import { useState } from "react";

export default function AddContact({ onBack, onSave }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !number.trim()) return;

    onSave({ id: Date.now(), name, number });
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* HEADER */}
      <header className="flex items-center gap-3 px-4 py-3 border-b bg-amber-50">
        <button onClick={onBack} className="text-gray-700 md:hidden">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-gray-800">Add Contact</h2>
      </header>

      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:ring-2 ring-amber-300"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Phone Number</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1 outline-none focus:ring-2 ring-amber-300"
            placeholder="03XXXXXXXXX"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-amber-600"
        >
          <UserPlus className="w-4 h-4" /> Save Contact
        </button>
      </form>
    </div>
  );
}