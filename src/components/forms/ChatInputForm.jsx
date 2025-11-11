import { useState } from "react";
import { Send, Image, Paperclip } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ChatInputForm({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 border-t"
    >
      <button type="button" className="text-gray-500 hover:text-amber-600">
        <Paperclip className="w-5 h-5" />
      </button>
      <button type="button" className="text-gray-500 hover:text-amber-600">
        <Image className="w-5 h-5" />
      </button>
      <Input
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" variant="primary" size="md" fullWidth={false}>
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
