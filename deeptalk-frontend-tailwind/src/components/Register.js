import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", { email, password });
      if (res.data.success) {
        navigate("/login");
      }
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Register</h2>
      <input type="email" placeholder="Email" className="input mb-3 w-full border p-2" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" className="input mb-3 w-full border p-2" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
    </form>
  );
}

export default Register;