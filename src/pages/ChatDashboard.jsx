import { useState } from "react";
import ContactsPage from "./ContactsPage";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInputForm from "../components/forms/ChatInputForm";
import GroupInfoPanel from "../components/chat/GroupInfoPanel";

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  // Sample data
  const Contacts = [
    {
      id: 1,
      type: "private",
      name: "Ahsan Ali",
      lastMsg: "See you soon!",
      online: true,
    },
    {
      id: 2,
      type: "private",
      name: "Haseeb Raza",
      lastMsg: "Got it ✅",
      online: false,
    },
    {
      id: 3,
      type: "private",
      name: "Amna Khan",
      lastMsg: "Typing...",
      online: true,
    },
    {
      id: 4,
      type: "group",
      name: "Family Group",
      lastMsg: "Ali: I'll come",
      members: [
        { id: "u1", name: "Ali" },
        { id: "u2", name: "Haseeb" },
        { id: "u3", name: "Areeba" },
      ],
    },
  ];

  // messages map
  const [messagesMap, setMessagesMap] = useState({
    1: [
      { id: 1, senderId: "me", text: "Hey! How are you?", time: "10:00" },
      { id: 2, senderId: "them", text: "I'm good! You?", time: "10:01" },
    ],
    4: [
      {
        id: 10,
        senderId: "u1",
        senderName: "Ali",
        text: "Hello family!",
        time: "09:00",
      },
      { id: 11, senderId: "me", text: "Hi!", time: "09:02" },
    ],
  });

  function handleSend(text) {
    if (!selectedChat) return;

    const chatId = selectedChat.id;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg = { id: Date.now(), senderId: "me", text, time };

    setMessagesMap((m) => ({
      ...m,
      [chatId]: [...(m[chatId] || []), newMsg],
    }));
  }

  const messages = selectedChat ? messagesMap[selectedChat.id] || [] : [];

  return (
    <div className="flex h-screen bg-stone-50 relative">
      {/* LEFT CONTACTS */}
      <div
        className={`${
          selectedChat ? "hidden md:flex" : "flex"
        } w-full md:w-1/3 lg:w-1/4 flex-col border-r`}
      >
        <ContactsPage
          contacts={Contacts}
          onSelect={(c) => {
            setSelectedChat(c);
            setShowInfo(false);
          }}
        />
      </div>

      {/* RIGHT CHAT WINDOW */}
      <div
        className={`${
          selectedChat ? "flex" : "hidden md:flex"
        } flex-col flex-1 bg-white`}
      >
        <ChatHeader
          chat={selectedChat}
          onBack={() => setSelectedChat(null)}
          onOpenInfo={() => setShowInfo((s) => !s)}
        />

        <ChatMessages
          messages={messages}
          isGroup={selectedChat?.type === "group"}
        />

        <ChatInputForm
          onSend={handleSend}
          placeholder={
            selectedChat?.type === "group"
              ? "Message group..."
              : "Type a message"
          }
        />
      </div>

      {/* DESKTOP GROUP INFO (right sidebar) */}
      <div className="hidden md:block">
        {selectedChat?.type === "group" && showInfo && (
          <GroupInfoPanel
            group={selectedChat}
            onClose={() => setShowInfo(false)}
          />
        )}
      </div>

      {/* MOBILE FULL SCREEN GROUP INFO */}
      <div className="md:hidden">
        {selectedChat?.type === "group" && showInfo && (
          <div className="fixed inset-0 bg-white z-50 animate-fadeIn">
            <GroupInfoPanel
              group={selectedChat}
              onClose={() => setShowInfo(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}