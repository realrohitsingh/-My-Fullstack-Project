// backend/src/routes/resumeRoutes.js

const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

// ✅ Corrected path to controller
const {
  processResume,
  getAllResumes,
  downloadResumePDF,
} = require("../controllers/eligibilityController");

// ✅ POST: Upload and Process Resume
router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    await processResume(req, res, next);
  } catch (error) {
    console.error("Error in /upload route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ GET: Fetch All Resumes
router.get("/resumes", async (req, res, next) => {
  try {
    await getAllResumes(req, res, next);
  } catch (error) {
    console.error("Error in /resumes route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ GET: Download Resume PDF
router.get("/download/:id", async (req, res, next) => {
  try {
    await downloadResumePDF(req, res, next);
  } catch (error) {
    console.error("Error in /download route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
