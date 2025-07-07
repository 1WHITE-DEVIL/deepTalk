import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const res = await axios.post("http://localhost:5000/predict", {
        message: input,
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setResponse(res.data.prediction);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-20">
      <h2 className="text-3xl font-bold mb-4">DeepTalk AI Therapist</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type how you feel..."
        className="w-full p-3 border rounded mb-4"
      />
      <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      {response && (
        <p className="mt-4 text-lg bg-white p-4 shadow rounded"><strong>Bot:</strong> {response}</p>
      )}
    </div>
  );
}

export default Dashboard;