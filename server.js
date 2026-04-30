const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// File path
const DATA_FILE = path.join(__dirname, "data.json");

// Helper functions
function readData() {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ================= API ROUTES =================

// Get all data
app.get("/api/data", (req, res) => {
  const data = readData();
  res.json(data);
});

// Add doctor
app.post("/api/doctors", (req, res) => {
  const data = readData();
  const newDoctor = req.body;

  data.doctors.push(newDoctor);
  writeData(data);

  res.json({ message: "Doctor added", data });
});

// Add room
app.post("/api/rooms", (req, res) => {
  const data = readData();
  const newRoom = req.body;

  data.rooms.push(newRoom);
  writeData(data);

  res.json({ message: "Room added", data });
});

// ================= SERVE FRONTEND =================

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "dashboard")));

// Fallback route (important)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard", "index.html"));
});

// ================= START SERVER =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});