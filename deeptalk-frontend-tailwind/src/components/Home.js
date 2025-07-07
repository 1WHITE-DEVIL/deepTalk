import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to DeepTalk</h1>
      <p className="mb-6">Your mental health companion</p>
      <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded mr-2">Login</Link>
      <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded">Register</Link>
    </div>
  );
}

export default Home;