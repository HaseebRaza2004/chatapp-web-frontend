import { useState } from "react";
import { ArrowLeft, Send, Image, Paperclip } from "lucide-react";
import ContactsPage from "./ContactsPage";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");

  const Chats = [
    { id: 1, name: "Ahsan Ali", online: true },
    { id: 2, name: "Amna Khan", online: false },
  ];

  const messages = [
    { id: 1, sender: "me", text: "Hey! How are you?" },
    { id: 2, sender: "them", text: "I'm good! You?" },
    { id: 3, sender: "me", text: "All good 😊" },
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log("Sent:", message);
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-stone-50">
      {/* ===== LEFT PANEL (Contacts) ===== */}
      <div
        className={`${
          selectedChat ? "hidden md:flex" : "flex"
        } w-full md:w-1/3 lg:w-1/4 flex-col border-r`}
      >
        <ContactsPage />
      </div>

      {/* ===== RIGHT PANEL (Chat Window) ===== */}
      <div
        className={`${
          selectedChat ? "flex" : "hidden md:flex"
        } flex-col flex-1 bg-white`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-amber-50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedChat(null)}
              className="md:hidden text-gray-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center text-gray-800 font-semibold">
              {selectedChat?.name?.[0] || "A"}
            </div>
            <div>
              <h3 className="font-medium text-gray-800">
                {selectedChat?.name || "Select a chat"}
              </h3>
              <p className="text-xs text-gray-500">
                {selectedChat?.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl text-sm max-w-[70%] ${
                  m.sender === "me"
                    ? "bg-amber-500 text-white"
                    : "bg-stone-200 text-gray-800"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-2 p-3 border-t"
        >
          <button type="button" className="text-gray-500 hover:text-amber-600">
            <Paperclip className="w-5 h-5" />
          </button>
          <button type="button" className="text-gray-500 hover:text-amber-600">
            <Image className="w-5 h-5" />
          </button>
          <Input
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="primary" size="md" fullWidth={false}>
            <Send className="w-4 h-4 " />
          </Button>
        </form>
      </div>
    </div>
  );
}
