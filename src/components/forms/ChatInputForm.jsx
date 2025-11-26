import { useRef } from "react";
import { Paperclip, Image, Smile, Mic, Send } from "lucide-react";
import Button from "../ui/Button";

export default function ChatInputForm({
  onSend,
  placeholder = "Type a message",
  onTyping,
}) {
  const inputRef = useRef(null);
  const typingTimeout = useRef(null);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
      return;
    }

    // notify parent that *I* am typing
    if (onTyping) onTyping(true);

    // clear previous timer
    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    // stop typing after 1.2s inactivity
    typingTimeout.current = setTimeout(() => {
      if (onTyping) onTyping(false);
    }, 1200);
  }

  function submit() {
    const raw = inputRef.current?.value ?? "";
    const text = raw.trim();
    if (!text) return;

    onSend(text);

    inputRef.current.value = "";

    // stop typing
    if (onTyping) onTyping(false);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex items-center gap-2 p-3 border-t bg-white"
    >
      <button type="button" className="text-gray-500 hover:text-amber-600 p-2">
        <Paperclip className="w-5 h-5" />
      </button>

      <button type="button" className="text-gray-500 hover:text-amber-600 p-2">
        <Image className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => {
          const el = inputRef.current;
          if (!el) return;
          el.value = el.value + " 😊";
          el.focus();
        }}
        className="text-gray-500 hover:text-amber-600 p-2"
      >
        <Smile className="w-5 h-5" />
      </button>

      <textarea
        ref={inputRef}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        rows={1}
        className="flex-1 min-h-[38px] max-h-40 resize-none rounded-full border border-stone-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-200 bg-stone-50"
      />

      <button type="button" className="text-gray-500 hover:text-amber-600 p-2">
        <Mic className="w-5 h-5" />
      </button>

      <Button type="submit" variant="primary" size="md" fullWidth={false}>
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}