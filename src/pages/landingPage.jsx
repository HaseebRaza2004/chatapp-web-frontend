import { MessagesSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 px-4">
      {/* Card */}
      <div className="p-8 text-center max-w-sm w-full">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-amber-100 rounded-full shadow-sm">
            <MessagesSquare className="w-10 h-10 text-amber-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Connect with Ease
        </h1>

        {/* Button */}
        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-full shadow-md transition duration-200 hover:cursor-pointer"
        >
          Get Started
        </button>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} ChatApp. All rights reserved.
      </p>
    </div>
  );
};