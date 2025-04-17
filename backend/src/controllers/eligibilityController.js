const Resume = require('../models/Resume');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const {
  extractTextFromFile,
  extractName,
  extractEmail,
  extractPhone,
  generateSummary,
  extractExperience,
  extractSkills,
  extractEducation,
  getRoleMatches
} = require('../utils/pdfParser');

// 👇 Process resume
const processResume = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file uploaded or invalid file format." });
    }

    const text = await extractTextFromFile(req.file);
    console.log("✅ Extracted Text (Preview):", text.slice(0, 300));

    const name = extractName(text);
    const email = extractEmail(text);
    const phone = extractPhone(text);
    const summary = generateSummary(text);
    const experience = extractExperience(text);
    const skills = extractSkills(text);
    const education = extractEducation(text);
    const recommendedRoles = getRoleMatches(skills);

    const resumeData = {
      name,
      email,
      phone,
      summary,
      experience,
      skills,
      education,
      role: recommendedRoles[0]?.role || "Not Matched",
      eligible: recommendedRoles.length > 0,
      reason: recommendedRoles.length > 0 ? "Matched roles based on skills" : "Not enough skill match",
      recommendedRoles
    };

    const saved = await Resume.create(resumeData);
    res.json(saved);
  } catch (err) {
    console.error("❌ Resume processing error:\n", err.stack);
    res.status(500).json({
      error: "Server error during resume processing",
      message: err.message
    });
  }
};

// 👇 Fetch all resumes
const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error("❌ Error fetching resumes:", error);
    res.status(500).json({ error: "Server error while fetching resumes" });
  }
};

// 👇 Download resume as PDF
const downloadResumePDF = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ error: "Resume not found" });

    const doc = new PDFDocument();
    const filePath = path.join(__dirname, `../../downloads/resume_${resumeId}.pdf`);
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(16).text(`Resume - ${resume.name}`, { align: 'center' }).moveDown();
    doc.fontSize(12)
      .text(`Email: ${resume.email}`)
      .text(`Phone: ${resume.phone}`)
      .text(`Education: ${resume.education.degree}`)
      .moveDown();

    doc.text("Experience:");
    if (resume.experience.length) {
      resume.experience.forEach(exp => {
        doc.text(`- ${exp.role} at ${exp.company} (${exp.duration})`);
      });
    } else {
      doc.text("- No Experience Listed");
    }

    doc.moveDown()
      .text(`Skills: ${resume.skills.join(', ')}`)
      .text(`Eligible: ${resume.eligible ? "Yes" : "No"}`)
      .text(`Recommended Roles: ${resume.recommendedRoles.map(r => `${r.role} (${r.matchPercentage}%)`).join(', ')}`);
    doc.end();

    stream.on('finish', () => {
      res.download(filePath, `resume_${resumeId}.pdf`, () => fs.unlinkSync(filePath));
    });
  } catch (err) {
    console.error("❌ Error generating resume PDF:", err.stack);
    res.status(500).json({ error: "Server error while generating resume PDF" });
  }
};

module.exports = {
  processResume,
  getAllResumes,
  downloadResumePDF
};
