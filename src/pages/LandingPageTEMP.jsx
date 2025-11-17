import Logo from "@/components/Logo";
import Button from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 px-4">
      {/* Card */}
      <div className="p-8 text-center max-w-sm w-full">
        {/* Logo */}
        <Logo />

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Connect with Ease
        </h1>

        {/* Button */}
        <Button
          onClick={() => navigate("/login")}
          variant="primary"
          size="lg"
          fullWidth
        >
          Get Started
        </Button>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} ChatApp. All rights reserved.
      </p>
    </div>
  );
}
