import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { User, Image as ImageIcon } from "lucide-react";

export default function ProfileSetupForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setError("");
    onSubmit({ name, photo });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-8">
      {/* 👤 Name Input */}
      <Input
        name="name"
        placeholder="Your name"
        icon={<User className="w-5 h-5" />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error}
      />

      {/* 🖼️ Photo Upload */}
      <div className="text-center">
        <label
          htmlFor="photo"
          className="cursor-pointer inline-flex flex-col items-center justify-center border-2 border-dashed border-amber-400 hover:bg-amber-50 transition rounded-xl p-4 w-full"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover shadow-md mb-2"
            />
          ) : (
            <ImageIcon className="w-10 h-10 text-amber-500 mb-1" />
          )}
          <span className="text-sm text-gray-600">
            {preview ? "Change photo" : "Upload photo (optional)"}
          </span>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Continue */}
      <Button type="submit" variant="primary">
        Continue
      </Button>
    </form>
  );
}
