import { useState } from "react";
import ContactsHeader from "../components/contacts/ContactsHeader";
import ContactsSearch from "../components/contacts/ContactsSearch";
import ContactsList from "../components/contacts/ContactsList";

export default function ContactsPage({ contacts = [], onSelect }) {
  const [search, setSearch] = useState("");

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