import React, { useState } from "react";
import "../styles/UploadResume.css";

const UploadResume = () => {
  const [uploadedResume, setUploadedResume] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);  // ✅ Fixed key to match backend

    try {
      const response = await fetch('/api/resume/upload', { // ✅ Ensure correct API endpoint
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload resume");
      }

      const data = await response.json();
      console.log("Resume Data Received:", data);
      setUploadedResume(data);
    } catch (err) {
      console.error("Upload Error:", err.message);
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-resume-container">
      <div className="upload-box">
        <h1>📄 Upload Your Resume</h1>
        <p>Let our AI scan and tell you your eligibility for a job</p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          className="file-input"
        />
        {isUploading && <p className="uploading">⏳ Uploading and analyzing resume...</p>}
        {error && <p className="error">{error}</p>}
      </div>

      {uploadedResume && (
        <div className="result-card">
          <h2>✅ Resume Analysis Result</h2>
          <p><strong>Name:</strong> {uploadedResume.name}</p>
          <p><strong>Role:</strong> {uploadedResume.role}</p>
          <p><strong>Summary:</strong> {uploadedResume.summary}</p>

          {uploadedResume.experience && (
            <div className="section">
              <h3>💼 Experience</h3>
              {uploadedResume.experience.map((exp, idx) => (
                <div key={idx} className="item">
                  <strong>{exp.role}</strong> at {exp.company}
                  <br />
                  <span>{exp.duration}</span>
                </div>
              ))}
            </div>
          )}

          {uploadedResume.skills && (
            <div className="section">
              <h3>🛠️ Skills</h3>
              <ul className="skill-tags">
                {uploadedResume.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {uploadedResume.education && (
            <div className="section">
              <h3>🎓 Education</h3>
              <p>
                {uploadedResume.education.degree},<br />
                {uploadedResume.education.institution}, {uploadedResume.education.year}
              </p>
            </div>
          )}

          <div className="eligibility-box">
            <h3>🔍 Eligibility Status</h3>
            <p className={uploadedResume.eligible ? "eligible" : "not-eligible"}>
              {uploadedResume.eligible ? "✅ You are eligible for the job!" : "❌ You are currently not eligible."}
            </p>
            {uploadedResume.reason && (
              <p className="reason">Reason: {uploadedResume.reason}</p>
            )}
          </div>
          {uploadedResume.recommendedRoles && uploadedResume.recommendedRoles.length > 0 && (
  <div className="section">
    <h3>💼 Recommended Job Roles</h3>
    <ul className="recommended-roles">
      {uploadedResume.recommendedRoles.map((role, idx) => (
        <li key={idx}>
          <strong>{role.role}</strong> - {role.matchPercentage}% match
        </li>
      ))}
    </ul>
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default UploadResume;