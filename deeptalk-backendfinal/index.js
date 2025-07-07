import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(bodyParser.json());

const users = [];

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const userExists = users.find((u) => u.email === email);
  if (userExists) return res.status(400).json({ success: false, message: "User already exists" });
  users.push({ email, password });
  res.json({ success: true });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ success: true, token });
});

// app.post("/predict", (req, res) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(403).json({ success: false, message: "No token provided" });

//   const token = authHeader.split(" ")[1];
//   try {
//     jwt.verify(token, SECRET_KEY);
//     const { message } = req.body;

//     const prediction = message.includes("sad")
//       ? "I'm here for you. It's okay to feel sad sometimes."
//       : "That's great to hear. Keep it up!";

//     res.json({ success: true, prediction });
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Invalid token" });
//   }
// });

app.post('/predict', async (req, res) => {
  try {

    console.log("Incoming request body:", req.body); // 👈 Add this

    const response = await axios.post('http://127.0.0.1:8800/predict', {
      message: req.body.message
    });
    console.log('Response from Python API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Python API:', error.message);
    res.status(500).json({ error: 'Failed to get prediction' });
  }
});

app.listen(PORT, () => {
  console.log(`DeepTalk backend running on http://localhost:${PORT}`);
});
