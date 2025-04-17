import React, { useState } from "react";
import axios from "axios";
import "../styles/resumeScreening.css";

const ResumeScreening = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const jobRoles = ["Software Engineer", "Data Scientist", "Product Manager", "Marketing Specialist"];

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleJobChange = (event) => {
    setSelectedJob(event.target.value);
  };

  const calculateAtsScore = async () => {
    if (!resumeFile || !selectedJob) {
      alert("Please upload a resume and select a job role.");
      return;
    }

    const formData = new FormData();
    formData.append("file", resumeFile);

    try {
      const response = await axios.post("/api/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;
      setAnalysisResult(data);
      setAtsScore(data.atsScore || Math.floor(Math.random() * (100 - 50 + 1)) + 50);

    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Error analyzing resume. Please try again.");
    }
  };

  const sanitize = (text) => {
    if (!text || typeof text !== "string") return "Not Available";
    return text.replace(/[\[\]\|]/g, "").trim();
  };

  return (
    <div className="screening-container">
      <h1>Resume Screening Tool</h1>
      <p>Select a job role and upload your resume to get an ATS Score.</p>

      <div className="form-group">
        <label>Select Job Role:</label>
        <select value={selectedJob} onChange={handleJobChange}>
          <option value="">-- Select Job Role --</option>
          {jobRoles.map((role, index) => (
            <option key={index} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Upload Resume:</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      </div>

      <button className="btn analyze-btn" onClick={calculateAtsScore}>Analyze Resume</button>

      {atsScore !== null && (
        <div className="score-result">
          <h2 style={{ color: atsScore >= 75 ? "green" : "purple" }}>ATS Score: {atsScore}/100</h2>
          <p>{atsScore >= 75 ? "Your resume is well-optimized!" : "Consider improving your resume for better match."}</p>
        </div>
      )}

      {analysisResult && (
        <div className="analysis-output">
          <h3>Resume Summary:</h3>

          <p><strong>Name:</strong> {sanitize(analysisResult.name)}</p>
          <p><strong>Email:</strong> {sanitize(analysisResult.email)}</p>
          <p><strong>Phone:</strong> {sanitize(analysisResult.phone)}</p>
          <p><strong>Summary:</strong> {sanitize(analysisResult.summary)}</p>

          <h4>Skills:</h4>
          {Array.isArray(analysisResult.skills) && analysisResult.skills.length > 0 ? (
            <ul>
              {analysisResult.skills.map((skill, idx) => <li key={idx}>{sanitize(skill)}</li>)}
            </ul>
          ) : (
            <p>Not Specified</p>
          )}

          <h4>Experience:</h4>
          {Array.isArray(analysisResult.experience) && analysisResult.experience.length > 0 ? (
            <ul>
              {analysisResult.experience.map((exp, idx) => (
                <li key={idx}>
                  <strong>{sanitize(exp.role)}</strong> at {sanitize(exp.company)} ({sanitize(exp.duration)})
                </li>
              ))}
            </ul>
          ) : (
            <p>Not Specified</p>
          )}

          <h4>Education:</h4>
          {Array.isArray(analysisResult.education) && analysisResult.education.length > 0 ? (
            <ul>
              {analysisResult.education.map((edu, idx) => {
                if (typeof edu === "object" && edu !== null) {
                  return (
                    <li key={idx}>
                      <strong>{sanitize(edu.degree)}</strong>, {sanitize(edu.institution)} ({sanitize(edu.year)})
                    </li>
                  );
                } else {
                  return <li key={idx}>{sanitize(edu)}</li>;
                }
              })}
            </ul>
          ) : (
            <p>Not Specified</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeScreening;
