// src/controllers/resumeController.js
const fs = require('fs');
const pdfParse = require('pdf-parse');
const Resume = require('../models/Resume');

const predefinedSkills = [
  'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'HTML', 'CSS'
];

const extractTextFromPDF = async (buffer) => {
  const data = await pdfParse(buffer);
  return data.text;
};

const analyzeResume = (text) => {
  const nameMatch = text.match(/Name\s*[:\-]?\s*(.+)/i);
  const roleMatch = text.match(/Role\s*[:\-]?\s*(.+)/i);
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  const phoneMatch = text.match(/\+?[0-9][0-9.\-\s]{8,}/);

  const foundSkills = predefinedSkills.filter(skill =>
    new RegExp(skill, 'i').test(text)
  );

  const score = Math.round((foundSkills.length / predefinedSkills.length) * 100);
  const eligible = score >= 50;

  return {
    name: nameMatch?.[1]?.trim() || 'Unknown',
    role: roleMatch?.[1]?.trim() || 'Unspecified',
    email: emailMatch?.[0] || 'Not found',
    phone: phoneMatch?.[0] || 'Not found',
    skills: foundSkills,
    score,
    eligible
  };
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No resume uploaded' });

    const text = await extractTextFromPDF(req.file.buffer);
    const analysis = analyzeResume(text);

    const resume = new Resume({
      name: analysis.name,
      role: analysis.role,
      email: analysis.email,
      phone: analysis.phone,
      skills: analysis.skills,
      score: analysis.score,
      eligible: analysis.eligible
    });

    await resume.save();

    return res.json(resume);
  } catch (err) {
    console.error("Resume processing error:", err);
    return res.status(500).json({ error: 'Failed to analyze resume' });
  }
};

module.exports = { uploadResume };
