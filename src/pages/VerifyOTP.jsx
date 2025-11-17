import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/ui/ButtonTEMP";
import Input from "../components/ui/Input";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = new URLSearchParams(location.search).get("phone") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }
    console.log("OTP verified:", otp);
    navigate("/Setup-Profile");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-fadeIn">
      <div className="w-full max-w-sm">
        <Logo />

        <h1 className="text-xl font-semibold text-center text-gray-800">
          Enter verification code
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          We’ve sent a code to <span className="font-medium">{phone}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="number"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.slice(0, 6))}
            inputMode="numeric"
            className="text-center tracking-widest text-lg"
            error={error}
          />

          <Button type="submit" variant="primary">
            Verify
          </Button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Didn’t receive code?{" "}
          <button className="text-amber-600 hover:underline">Resend</button>
        </p>
      </div>
    </div>
  );
}
