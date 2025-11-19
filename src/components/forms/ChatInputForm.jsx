import { useState } from "react";
import { Send, Image, Paperclip } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function ChatInputForm({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-2 p-3 border-t"
    >
      <Paperclip className="w-8 h-8 text-gray-500" />
      <Image className="w-8 h-8 text-gray-500" />

      <Input
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1"
      />

      <Button 
      type="submit" 
      variant="primary"
      size="md"
      fullWidth={false}
>
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}