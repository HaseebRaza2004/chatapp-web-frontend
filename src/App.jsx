import { Routes, Route } from "react-router-dom";
import PhoneNumber from "./pages/PhoneNumber";
import VerifyOTP from "./pages/VerifyOTP";
import ProfileSetup from "./pages/ProfileSetup";
import ChatDashboard from "./pages/ChatDashboard";
import LandingPage from "./pages/LandingPage";
import NewChat from "./pages/NewChat";
import CreateGroup from "./pages/CreateGroup";
import AddContact from "./pages/AddContact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/Login" element={<PhoneNumber />} />
      <Route path="/VerifyOTP" element={<VerifyOTP />} />
      <Route path="/Setup-Profile" element={<ProfileSetup />} />
      {/* <Route path="/Chats" element={<ChatDashboard />} /> */}
      <Route path="/new" element={<NewChat />} />
      <Route path="/create-group" element={<CreateGroup />} />
      <Route path="/add-contact" element={<AddContact />} />
      <Route path="/chat/:id" element={<ChatDashboard />} />
    </Routes>
  );
}

export default App;
