import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, LogOut } from "lucide-react";
import { getProfile, saveProfile, clearProfile } from "../lib/profileStore";

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    bio: "",
    avatar: null, // data URL
  });
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const p = getProfile();
    setProfile(p);
    setPreview(p.avatar || null);
  }, []);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    // keep file size reasonable (optional): skip conversion if too big
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setPreview(dataUrl);
      setProfile((s) => ({ ...s, avatar: dataUrl }));
    };
    reader.readAsDataURL(f);
  }

  function removeAvatar() {
    setPreview(null);
    setProfile((s) => ({ ...s, avatar: null }));
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    // small validation
    if (!profile.name.trim()) {
      alert("Please enter your name.");
      setSaving(false);
      return;
    }
    // phone optional but prefer E.164; no forced validation here
    saveProfile(profile);

    // little delay so user sees saving state (UX)
    setTimeout(() => {
      setSaving(false);
      // go to chat dashboard
      navigate("/");
    }, 300);
  }

  function handleLogout() {
    // clear profile + optionally other app data
    clearProfile();
    // navigate to landing / login
    navigate("/"); // or landing page route
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-xl font-semibold text-gray-800 text-center">
          Set up your profile
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-4">
          Add your name and an optional profile photo. You can change this
          later.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-amber-100 overflow-hidden flex items-center justify-center text-2xl font-semibold text-amber-700 shadow">
                {preview ? (
                  <img
                    src={preview}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (profile.name && profile.name[0]) || "U"
                )}
              </div>

              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute right-0 bottom-0 bg-white border px-2 py-1 rounded-full shadow text-gray-600 hover:bg-stone-50"
                aria-label="Change photo"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {preview && (
              <button
                type="button"
                onClick={removeAvatar}
                className="mt-2 text-xs text-red-600 hover:underline"
              >
                Remove photo
              </button>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile((s) => ({ ...s, name: e.target.value }))
              }
              placeholder="Your name"
              className="w-full rounded-lg border border-stone-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input
              value={profile.phone}
              onChange={(e) =>
                setProfile((s) => ({ ...s, phone: e.target.value }))
              }
              placeholder="+92 3xx xxxxxx"
              className="w-full rounded-lg border border-stone-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200"
            />
            <p className="text-xs text-gray-400 mt-1">
              You can use this number to sign in with phone OTP later.
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">About</label>
            <textarea
              value={profile.bio}
              onChange={(e) =>
                setProfile((s) => ({ ...s, bio: e.target.value }))
              }
              placeholder="Say something about yourself"
              rows={3}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-200 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-amber-500 text-white py-2 rounded-lg font-medium hover:bg-amber-600 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save & Continue"}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border text-gray-700 hover:bg-stone-50"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}