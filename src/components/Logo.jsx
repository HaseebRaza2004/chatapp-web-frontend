import { MessagesSquare } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex justify-center mb-6 animate-scaleUp">
      <div className="p-3 bg-amber-100 rounded-full shadow">
        <MessagesSquare className="w-10 h-10 text-amber-600" />
      </div>
    </div>
  );
};
