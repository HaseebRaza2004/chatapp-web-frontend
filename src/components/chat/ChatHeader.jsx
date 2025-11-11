import { ArrowLeft } from "lucide-react";

export default function ChatHeader({ chat, onBack }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-amber-50">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="md:hidden text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center text-gray-800 font-semibold">
          {chat?.name?.[0] || "A"}
        </div>
        <div>
          <h3 className="font-medium text-gray-800">
            {chat?.name || "Select a chat"}
          </h3>
          <p className="text-xs text-gray-500">
            {chat?.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
}
