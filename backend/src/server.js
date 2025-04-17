// backend/src/server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // ✅ fixed relative path
const resumeRoutes = require("./routes/resumeRoutes"); // ✅ fixed relative path

dotenv.config();

// ✅ Initialize app
const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Route mount
app.use("/api/resume", resumeRoutes); // ✅ Correct prefix for your API

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
