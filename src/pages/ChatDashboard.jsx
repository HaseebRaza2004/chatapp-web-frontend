import { useState } from "react";
import ContactsPage from "./ContactsPage";
import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInputForm from "../components/forms/ChatInputForm";
import GroupInfoPanel from "../components/chat/GroupInfoPanel";

export default function ChatDashboard() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  // opponent typing state
  const [partnerTyping, setPartnerTyping] = useState(false);

  // ------- SAMPLE CONTACT LIST -------
  const Contacts = [
    {
      id: 1,
      type: "private",
      name: "Ahsan Ali",
      online: true,
    },
    {
      id: 2,
      type: "private",
      name: "Haseeb Raza",
      online: false,
    },
    {
      id: 3,
      type: "private",
      name: "Amna Khan",
      online: true,
    },
    {
      id: 4,
      type: "group",
      name: "Family Group",
      members: [
        { id: "u1", name: "Ali" },
        { id: "u2", name: "Haseeb" },
        { id: "u3", name: "Areeba" },
      ],
    },
  ];

  // ------- SAMPLE MESSAGES -------

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
        text: "Hello family! What's the plan?",
        time: "09:00",
      },
      { id: 11, senderId: "me", text: "Hi!", time: "09:02" },
      {
        id: 13,
        senderId: "u2",
        senderName: "Issa",
        text: "Hey everyone!",
        time: "09:30",
      },
    ],
  });

  // send message
  function handleSend(text) {
    if (!selectedChat) return;

    const chatId = selectedChat.id;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const msg = {
      id: Date.now(),
      senderId: "me",
      text,
      time,
    };

    setMessagesMap((m) => ({
      ...m,
      [chatId]: [...(m[chatId] || []), msg],
    }));

    // stop my typing indicator
    setPartnerTyping(false);
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
            setPartnerTyping(false);
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
          partnerTyping={partnerTyping}
          onBack={() => setSelectedChat(null)}
          onOpenInfo={() => setShowInfo((s) => !s)}
        />

        <ChatMessages
          messages={messages}
          isGroup={selectedChat?.type === "group"}
          partnerTyping={partnerTyping}
        />

        <ChatInputForm
          onSend={handleSend}
          onTyping={(isTyping) => {
            setPartnerTyping(isTyping);
          }}
        />
      </div>

      {/* GROUP INFO PANEL */}
      {selectedChat?.type === "group" && showInfo && (
        <>
          {/* DESKTOP */}
          <div className="hidden lg:block fixed right-0 top-0 h-full w-80 border-l bg-stone-50 z-40">
            <GroupInfoPanel
              group={selectedChat}
              onClose={() => setShowInfo(false)}
            />
          </div>

          {/* MOBILE */}
          <div className="lg:hidden fixed inset-0 bg-white z-50 animate-fadeIn">
            <GroupInfoPanel
              group={selectedChat}
              onClose={() => setShowInfo(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}
