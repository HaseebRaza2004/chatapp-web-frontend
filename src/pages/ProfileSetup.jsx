import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import ProfileSetupForm from "../components/forms/ProfileSetupForm";

export default function ProfileSetup() {
  const navigate = useNavigate();

  const handleProfileSubmit = ({ name, photo }) => {
    console.log("Profile data:", { name, photo });
    navigate("/Contacts");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 px-4 animate-fadeIn">
      <div className="p-8 w-full max-w-sm">
        <Logo />

        <h1 className="text-xl font-semibold text-center text-gray-800">
          Set up your profile
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Add your name and optional profile picture
        </p>

        {/* Profile Setup Form Component */}
        <ProfileSetupForm onSubmit={handleProfileSubmit} />
      </div>
    </div>
  );
}
