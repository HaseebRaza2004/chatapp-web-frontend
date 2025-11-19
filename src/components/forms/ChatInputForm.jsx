import { Paperclip, Image, Send } from "lucide-react";
import Button from "../ui/Button";
import { useRef } from "react";

export default function ChatInputForm({
  onSend,
  placeholder = "Type a message",
}) {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const text = inputRef.current?.value?.trim();
    if (!text) return;

    onSend(text);
    inputRef.current.value = "";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 border-t bg-white"
    >
      {/* Attachments */}
      <button type="button" className="text-gray-500 hover:text-amber-600">
        <Paperclip className="w-5 h-5" />
      </button>

      <button type="button" className="text-gray-500 hover:text-amber-600">
        <Image className="w-5 h-5" />
      </button>

      {/* ✔ Only ONE input now */}
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="flex-1 border border-stone-300 rounded-lg px-3 py-2 outline-none
                   focus:ring-2 focus:ring-amber-400 focus:border-amber-500 bg-stone-50"
      />

      <Button type="submit" variant="primary" size="md" fullWidth={false}>
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
