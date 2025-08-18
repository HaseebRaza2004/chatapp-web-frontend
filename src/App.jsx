import { Routes, Route } from "react-router-dom";
import Landing from "./pages/public/Landing";
import PhoneNumber from "./pages/auth/PhoneNumber";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<PhoneNumber />} />
    </Routes>
  )
};

export default App;