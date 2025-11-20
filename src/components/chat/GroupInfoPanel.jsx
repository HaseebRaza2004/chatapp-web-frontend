export default function GroupInfoPanel({ group, onClose }) {
  if (!group || group.type !== "group") return null;

  // Convert members into a SAFE ARRAY
  const members = Array.isArray(group.members) ? group.members : [];

  return (
    <div className="w-full lg:w-80 border-l bg-stone-50 p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Group Info</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>

      <div className="text-center mb-4">
        <div className="w-24 h-24 rounded-full mx-auto bg-amber-300 flex items-center justify-center text-2xl font-semibold">
          G
        </div>
        <h4 className="mt-3 font-medium text-gray-800">{group.name}</h4>
        <p className="text-sm text-gray-500 mt-1">{members.length} members</p>
      </div>

      <div>
        <h5 className="text-sm font-semibold mb-2 text-gray-700">Members</h5>

        <div className="space-y-3">
          {members.length === 0 ? (
            <p className="text-gray-400 text-sm">No members found</p>
          ) : (
            members.map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center font-medium text-gray-800">
                  {m.name?.[0] || "?"}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {m.name || "Unknown"}
                  </div>
                  <div className="text-xs text-gray-500">Member</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
