const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// ===== DATA FILE =====
const DATA_FILE = path.join(__dirname, "data.json");

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ===== API ROUTES =====

// Get all data
app.get("/api/data", (req, res) => {
  res.json(readData());
});

// Add doctor
app.post("/api/doctors", (req, res) => {
  const data = readData();
  data.doctors.push(req.body);
  writeData(data);
  res.json({ message: "Doctor added" });
});

// Add room
app.post("/api/rooms", (req, res) => {
  const data = readData();
  data.rooms.push(req.body);
  writeData(data);
  res.json({ message: "Room added" });
});

// ===== SERVE FRONTEND =====
app.use(express.static(path.join(__dirname, "dashboard")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard", "index.html"));
});

// ===== START SERVER =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});