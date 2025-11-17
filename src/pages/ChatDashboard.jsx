import { useState } from "react";
import ContactsPage from "./ContactsPage";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInputForm from "../components/forms/ChatInputForm";

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messagesMap, setMessagesMap] = useState({
    // chatId -> messages array
    1: [
      { id: 1, sender: "me", text: "Hey! How are you?", time: "10:00" },
      { id: 2, sender: "them", text: "I'm good! You?", time: "10:01" },
    ],
    2: [{ id: 3, sender: "them", text: "Hello from chat 2", time: "09:45" }],
  });

  const handleSend = (text) => {
    if (!selectedChat) return;
    const chatId = selectedChat.id;
    const newMsg = {
      id: Date.now(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessagesMap((m) => ({ ...m, [chatId]: [...(m[chatId] || []), newMsg] }));

    // simulate reply for dev/testing (remove when real backend)
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: "them",
        text: "Auto-reply: got it",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessagesMap((m) => ({
        ...m,
        [chatId]: [...(m[chatId] || []), newMsg, reply],
      }));
    }, 800);
  };

  const messages = selectedChat ? messagesMap[selectedChat.id] || [] : [];

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
