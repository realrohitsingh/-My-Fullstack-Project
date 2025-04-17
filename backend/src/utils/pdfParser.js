// backend/src/utils/pdfParser.js
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const roleSkillMap = require("../data/roleSkillsMap");

// 🔍 Extract raw text from PDF or DOCX
const extractTextFromFile = async (file) => {
  const ext = file.originalname.split('.').pop().toLowerCase();
  if (ext === 'pdf') {
    const data = await pdfParse(file.buffer);
    return data.text;
  } else if (ext === 'docx') {
    const data = await mammoth.extractRawText({ buffer: file.buffer });
    return data.value;
  } else {
    throw new Error("Unsupported file format");
  }
};

// 🧠 Name Extraction
const extractName = (text) => {
  const nameMatch = text.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+){1,2})/);
  return nameMatch ? nameMatch[0] : "Unknown";
};

// 📧 Email Extraction
const extractEmail = (text) => {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  return match ? match[0] : "Not Found";
};

// 📞 Phone Extraction
const extractPhone = (text) => {
  const match = text.match(/(?:\+91[-\s]?)?[6-9]\d{9}/);
  return match ? match[0] : "Not Found";
};

// 📜 Summary Extraction
const generateSummary = (text) => {
  const firstChunk = text.split('\n').slice(0, 10).join(' ');
  const clean = firstChunk
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g, '')
    .replace(/(?:\+91[-\s]?)?[6-9]\d{9}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return clean.length > 300 ? clean.slice(0, 300) + '...' : clean;
};

// 💼 Experience Extraction
const extractExperience = (text) => {
  const experience = [];
  const expRegex = /([A-Za-z\s]+?)\s+at\s+([A-Za-z\s]+)\s+\(?(\d{4})\s*[-–]\s*(\d{4}|Present)\)?/gi;
  let match;
  while ((match = expRegex.exec(text)) !== null) {
    experience.push({
      role: match[1].trim(),
      company: match[2].trim(),
      duration: `${match[3]} - ${match[4]}`
    });
  }
  return experience;
};

// 🛠️ Skill Matching
const extractSkills = (text) => {
  const allSkills = new Set();
  Object.values(roleSkillMap).flat().forEach(skill => {
    const regex = new RegExp(`\\b${skill}\\b`, 'i');
    if (regex.test(text)) allSkills.add(skill);
  });
  return Array.from(allSkills);
};

// 🎓 Education Extraction
const extractEducation = (text) => {
  const degreeRegex = /(Bachelor|B\.Tech|BSc|MSc|Master|PhD|Diploma|M\.Tech)[^,\n]*/i;
  const yearRegex = /(\d{4})\s*[-–]\s*(\d{4}|Present)/;

  const degreeMatch = text.match(degreeRegex);
  const yearMatch = text.match(yearRegex);

  const degree = degreeMatch ? degreeMatch[0] : "Unknown";
  const year = yearMatch ? `${yearMatch[1]} - ${yearMatch[2]}` : "Unknown";

  return {
    degree,
    institution: "Not Specified",
    year
  };
};

// 🎯 Role Matching
const getRoleMatches = (skills) => {
  return Object.entries(roleSkillMap).map(([role, requiredSkills]) => {
    const matched = requiredSkills.filter(skill => skills.includes(skill));
    const percentage = (matched.length / requiredSkills.length) * 100;
    return { role, matchPercentage: Math.round(percentage) };
  }).filter(r => r.matchPercentage >= 40).sort((a, b) => b.matchPercentage - a.matchPercentage);
};

module.exports = {
  extractTextFromFile,
  extractName,
  extractEmail,
  extractPhone,
  generateSummary,
  extractExperience,
  extractSkills,
  extractEducation,
  getRoleMatches
};
