import React from "react";
import ResumeService from "../services/ResumeService";
import "../styles/ResumeDashboardCard.css";

const ResumeDashboardCard = ({ resume }) => {
  return (
    <div className="resume-card">
      <h3>{resume.name}</h3>
      <p><strong>Email:</strong> {resume.email}</p>
      <p><strong>Skills:</strong> {resume.skills.join(", ")}</p>

      {/* ✅ Download PDF Button */}
      <button className="download-btn" onClick={() => ResumeService.downloadResume(resume._id)}>
        📥 Download PDF
      </button>
    </div>
  );
};

export default ResumeDashboardCard;
