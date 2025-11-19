import { useState } from "react";
import ContactsHeader from "../components/contacts/ContactsHeader";
import ContactsSearch from "../components/contacts/ContactsSearch";
import ContactsList from "../components/contacts/ContactsList";

export default function ContactsPage({ onSelect }) {
  const [search, setSearch] = useState("");

  const contacts = [
    {
      id: 1,
      name: "Ahsan Ali",
      lastMsg: "See you soon!",
      online: true,
      type: "private",
    },
    {
      id: 2,
      name: "Haseeb Raza",
      lastMsg: "Got it ✅",
      online: false,
      type: "private",
    },
    {
      id: 3,
      name: "Amna Khan",
      lastMsg: "Typing...",
      online: true,
      type: "private",
    },
    {
      id: 4,
      name: "Family Group",
      lastMsg: "Areeba: ok!",
      online: false,
      type: "group",
      members: 5,
    },
  ];

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-stone-50">
      <ContactsHeader />
      <ContactsSearch
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ContactsList contacts={filtered} onSelect={onSelect} />
    </div>
  );
}