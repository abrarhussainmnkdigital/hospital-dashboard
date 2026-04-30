const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

// ✅ CORS (allow all)
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Serve frontend (optional locally)
app.use(express.static(path.join(__dirname, "dashboard")));

// ✅ GET data
app.get("/queue", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read data" });
  }
});

// ✅ UPDATE data
app.post("/update", (req, res) => {
  try {
    fs.writeFileSync("data.json", JSON.stringify(req.body, null, 2));
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update data" });
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Hospital API is running...");
});

// ✅ Dynamic PORT (REQUIRED for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});