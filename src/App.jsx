import { Routes, Route } from "react-router-dom";
import PhoneNumber from "./pages/auth/PhoneNumber";
import LandingPage from "./pages/landingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<PhoneNumber />} />
    </Routes>
  )
};

export default App;