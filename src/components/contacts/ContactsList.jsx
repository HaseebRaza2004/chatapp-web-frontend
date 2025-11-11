export default function ContactsList({ contacts }) {
  if (!contacts.length)
    return <p className="text-center text-gray-400 mt-10">No contacts found</p>;

  return (
    <div className="flex-1 overflow-y-auto px-2 py-3">
      {contacts.map((c) => (
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
              <h3 className="text-sm font-medium text-gray-800">{c.name}</h3>
              <p className="text-xs text-gray-500">{c.lastMsg}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
