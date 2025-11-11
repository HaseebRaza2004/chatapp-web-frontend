import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import PhoneNumber from "./pages/PhoneNumber";
import VerifyOTP from "./pages/VerifyOTP";
import ProfileSetup from "./pages/ProfileSetup";
import ContactsPage from "./pages/ContactsPage";
import ChatDashboard from "./pages/ChatDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Login" element={<PhoneNumber />} />
      <Route path="/VerifyOTP" element={<VerifyOTP />} />
      <Route path="/Setup-Profile" element={<ProfileSetup />} />
      <Route path="/Contacts" element={<ChatDashboard />} />
    </Routes>
  )
};

export default App;