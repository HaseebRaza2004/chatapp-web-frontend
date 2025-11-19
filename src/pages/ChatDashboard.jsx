import { useState } from "react";
import ContactsPage from "./ContactsPage";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInputForm from "../components/forms/ChatInputForm";

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState('offline');

  const [messagesMap, setMessagesMap] = useState({
    1: [
      { id: 1, senderId: "me", text: "Hey! How are you?" },
      { id: 2, senderId: "them", text: "I'm good! You?" },
    ],
    3: [
      // group data example
      { id: 10, senderId: "2", senderName: "Haseeb", text: "Dinner tonight?" },
      { id: 11, senderId: "me", text: "Yes!" },
    ],
  });

  const handleSend = (text) => {
    if (!selectedChat) return;

    const chatId = selectedChat.id;

    const newMsg = {
      id: Date.now(),
      senderId: "me",
      text,
    };

    setMessagesMap((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMsg],
    }));
  };

  const messages = selectedChat ? messagesMap[selectedChat.id] || [] : [];
  
  return (
    <div className="flex h-screen bg-stone-50">
      {/* LEFT: CONTACTS */}
      <div
        className={`${
          selectedChat ? "hidden md:flex" : "flex"
        } w-full md:w-1/3 lg:w-1/4 flex-col border-r`}
      >
        <ContactsPage onSelect={setSelectedChat} />
      </div>

      {/* RIGHT: CHAT WINDOW */}
      <div
        className={`${
          selectedChat ? "flex" : "hidden md:flex"
        } flex-col flex-1 bg-white`}
      >
        <ChatHeader chat={selectedChat} onBack={() => setSelectedChat(null)} />
        <ChatMessages
          messages={messages}
          isGroup={selectedChat?.type === "group"}
        />
        <ChatInputForm onSend={handleSend} />
      </div>
    </div>
  );
}
