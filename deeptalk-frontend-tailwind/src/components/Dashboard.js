import React, { useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/predict",
        { message: input },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setResponse(res.data.prediction);
      setInput("");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="chat-box">
        <h2 className="title">DeepTalk AI Therapist</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How are you feeling today?"
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">Send</button>
        {response && (
          <div className="response-box">
            <strong>Bot:</strong> {response}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
