import { Search } from "lucide-react";
import Input from "../ui/Input";

export default function ContactsSearch({ value, onChange }) {
  return (
    <div className="px-4 py-3 bg-white border-b">
      <Input
        icon={<Search className="w-5 h-5" />}
        placeholder="Search or start new chat"
        value={value}
        onChange={onChange}
        className="bg-stone-50"
      />
    </div>
  );
}
