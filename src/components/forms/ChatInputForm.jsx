import { Paperclip, Image, Send } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ChatInputForm({ onSend }) {
  // controlled internal state so component is reusable
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.elements.message?.value?.trim();
    if (!text) return;
    onSend(text);
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 border-t bg-white"
    >
      <label className="text-gray-500 hover:text-amber-600 cursor-pointer">
        <Paperclip className="w-5 h-5" />
        <input type="file" className="hidden" />
      </label>

      <label className="text-gray-500 hover:text-amber-600 cursor-pointer">
        <Image className="w-5 h-5" />
        <input type="file" accept="image/*" className="hidden" />
      </label>

      <Input
        name="message"
        placeholder="Type a message"
        className="flex-1 bg-stone-50"
        // Input supports uncontrolled usage with form element, so we don't pass value/onChange here
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth={false}
        className="px-3"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}