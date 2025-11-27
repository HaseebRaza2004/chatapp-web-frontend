export default function SelectedChips({ items = [], onRemove }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <div
          key={it.id}
          className="inline-flex items-center gap-2 bg-stone-100 px-2 py-1 rounded-full text-sm"
        >
          <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-xs">
            {it.name?.[0]}
          </div>
          <div className="truncate max-w-[120px]">{it.name}</div>
          <button
            onClick={() => onRemove(it.id)}
            className="text-gray-400 hover:text-red-600 ml-1"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}