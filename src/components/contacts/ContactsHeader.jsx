import { MessageCircle } from "lucide-react";
import Logo from "../Logo";

export default function ContactsHeader() {
  return (
    <header className="flex items-center justify-between px-5 py-4 bg-white shadow-sm border-b">
      <div className="flex items-center gap-2">
        <Logo />
        <h1 className="text-lg font-semibold text-gray-800">Chats</h1>
      </div>
      <button className="text-amber-600 hover:text-amber-700">
        <MessageCircle className="w-6 h-6" />
      </button>
    </header>
  );
}
