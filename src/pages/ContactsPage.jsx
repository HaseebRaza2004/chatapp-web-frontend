import { useState } from "react";
import ContactsHeader from "../components/contacts/ContactsHeader";
import ContactsSearch from "../components/contacts/ContactsSearch";
import ContactsList from "../components/contacts/ContactsList";

export default function ContactsPage() {
  const [search, setSearch] = useState("");

  const contacts = [
    { id: 1, name: "Ahsan Ali", lastMsg: "See you soon!", online: true },
    { id: 2, name: "Haseeb Raza", lastMsg: "Got it ✅", online: false },
    { id: 3, name: "Amna Khan", lastMsg: "Typing...", online: true },
    { id: 4, name: "Zain Malik", lastMsg: "Good night 🌙", online: false },
  ];

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-stone-50">
      <ContactsHeader />
      <ContactsSearch
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ContactsList contacts={filtered} />
    </div>
  );
}
