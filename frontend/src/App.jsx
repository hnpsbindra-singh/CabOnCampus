import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/StudentDashboard";
import CaptainDashboard from "./pages/CaptainDashboard";
import "./App.css";
import Footer from "./Footer";
import Header from "../Header";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/captain" element={<CaptainDashboard />} />
       
      </Routes>
       <Footer/>
    </Router>
    
  );
}

export default App;
