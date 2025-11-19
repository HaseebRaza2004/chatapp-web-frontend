import { ArrowLeft, Info } from "lucide-react";

export default function ChatHeader({ chat, onBack, onOpenInfo }) {
  const isGroup = chat?.type === "group";

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-amber-50">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="md:hidden text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center">
          {isGroup ? (
            <span className="text-gray-700 font-semibold">G</span>
          ) : (
            <span className="text-gray-700 font-semibold">
              {chat?.name?.[0] || "?"}
            </span>
          )}
        </div>

        <div>
          <h3 className="font-medium text-gray-800">
            {chat?.name || "Select a chat"}
          </h3>
          <p className="text-xs text-gray-500">
            {isGroup
              ? `${chat?.members?.length ?? 0} members`
              : chat?.online
              ? "Online"
              : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {chat && (
          <button
            title="Chat info"
            onClick={onOpenInfo}
            className="text-gray-700 hover:text-amber-600 transition"
          >
            <Info className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
}