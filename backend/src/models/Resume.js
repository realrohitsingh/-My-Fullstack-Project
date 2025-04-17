const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  duration: String
}, { _id: false }); // prevent auto _id in sub-documents

const resumeSchema = new mongoose.Schema({
  name: String,
  role: String,
  summary: String,
  experience: {
    type: [experienceSchema],
    default: []
  },
  skills: {
    type: [String],
    default: []
  },
  education: {
    degree: String,
    institution: String,
    year: String
  },
  eligible: Boolean,
  reason: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

// 🧼 Sanitize string passed to experience field
resumeSchema.pre('validate', function (next) {
  if (typeof this.experience === 'string') {
    this.experience = [];
  }
  next();
});

module.exports = mongoose.model('Resume', resumeSchema);
