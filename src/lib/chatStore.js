const CONTACTS_KEY = "chatapp_contacts_v1";
const CHATS_KEY = "chatapp_chats_v1";

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}

// Seed with few demo contacts if empty
function ensureSeedContacts() {
  const cs = load(CONTACTS_KEY, null);
  if (!cs) {
    const demo = [
      { id: "c1", name: "Ahsan Ali", phone: "+923001234001" },
      { id: "c2", name: "Haseeb Raza", phone: "+923001234002" },
      { id: "c3", name: "Amna Khan", phone: "+923001234003" },
      { id: "c4", name: "Zain Malik", phone: "+923001234004" },
    ];
    save(CONTACTS_KEY, demo);
    return demo;
  }
  return cs;
}

export function getContacts() {
  return ensureSeedContacts();
}

export function addContact({ name, phone }) {
  const contacts = getContacts();
  const id = "c" + Date.now();
  const newC = { id, name, phone };
  contacts.unshift(newC);
  save(CONTACTS_KEY, contacts);
  return newC;
}

export function getChats() {
  return load(CHATS_KEY, []);
}

// Find private chat between current user and contactId
export function findPrivateChatWith(contactId) {
  const chats = getChats();
  return chats.find(
    (c) => c.type === "private" && c.participants?.includes(contactId)
  );
}

export function createPrivateChat(contactId) {
  const chats = getChats();
  const id = "chat_" + Date.now();
  const newChat = {
    id,
    type: "private",
    name: null, // will display contact name
    participants: [contactId],
    lastMsg: "",
    createdAt: Date.now(),
  };
  chats.unshift(newChat);
  save(CHATS_KEY, chats);
  return newChat;
}

export function createGroup({ name, memberIds = [], avatar = null }) {
  const chats = getChats();
  const id = "g_" + Date.now();
  const members = getContacts().filter((c) => memberIds.includes(c.id));
  const newGroup = {
    id,
    type: "group",
    name: name || "New Group",
    members: members.map((m) => ({ id: m.id, name: m.name })),
    lastMsg: "",
    avatar,
    createdAt: Date.now(),
  };
  chats.unshift(newGroup);
  save(CHATS_KEY, chats);
  return newGroup;
}
