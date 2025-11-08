import { useNavigate } from "react-router-dom";
import PhoneInputForm from "../components/PhoneInputForm";
import Logo from "@/components/Logo";

export default function PhoneNumber() {
  const navigate = useNavigate();

  const handleFormSubmit = ({ phone }) => {
    navigate(`/verify?phone=${encodeURIComponent(phone)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen animate-fadeIn px-5">
      <div className="w-full max-w-sm p-7">
        {/* Logo */}
        <Logo />

        {/* Title */}
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Verify your phone number
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          We’ll send you a verification code
        </p>

        {/* Form Component */}
        <PhoneInputForm onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
