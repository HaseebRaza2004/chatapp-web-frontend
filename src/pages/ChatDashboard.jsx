import { useState } from "react";
import ContactsPage from "./ContactsPage";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInputForm from "../components/forms/ChatInputForm";

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: "me", text: "Hey! How are you?" },
    { id: 2, sender: "them", text: "I'm good! You?" },
    { id: 3, sender: "me", text: "All good 😊" },
  ]);

  const handleSend = (text) => {
    const newMsg = { id: Date.now(), sender: "me", text };
    setMessages([...messages, newMsg]);
  };

  return (
    <div className="flex h-screen bg-stone-50">
      {/* LEFT: Contacts */}
      <div
        className={`${
          selectedChat ? "hidden md:flex" : "flex"
        } w-full md:w-1/3 lg:w-1/4 flex-col border-r`}
      >
        <ContactsPage onSelect={setSelectedChat} />
      </div>

      {/* RIGHT: Chat Window */}
      <div
        className={`${
          selectedChat ? "flex" : "hidden md:flex"
        } flex-col flex-1 bg-white`}
      >
        <ChatHeader chat={selectedChat} onBack={() => setSelectedChat(null)} />
        <ChatMessages messages={messages} />
        <ChatInputForm onSend={handleSend} />
      </div>
    </div>
  );
}
