const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();


app.use(express.json());
app.use(cors());


connectDB();

app.use(express.static(path.join(__dirname, "../frontend")));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/project", require("./routes/projectRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "login.html"));
});
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dashboard.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});