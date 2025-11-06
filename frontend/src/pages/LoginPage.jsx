import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password, role });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", role);
      navigate(role === "student" ? "/student" : "/captain");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container" >
      <h2>Cab on Campus - Login</h2>
      <form onSubmit={handleLogin}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="captain">Captain</option>
        </select>

        <input
          
          placeholder="Enter Mobile Number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p onClick={() => navigate("/signup")} className="link">
        Don’t have an account? Signup
      </p>
    </div>
  );
}

export default LoginPage;
