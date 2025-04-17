import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/resumepreview.css";
import SkillMatchScore from "../components/SkillMatchScore"; // ✅ Importing Skill Match Component

const ResumePreview = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return <div className="preview-error">No resume data to preview.</div>;
  }

  return (
    <div className="resume-preview-container">
      <div className="resume-card">
        <h1>{data.name}</h1>
        <p>Email: {data.email}</p>
        <p>Phone: {data.phone}</p>

        <section>
          <h2>Education</h2>
          <ul>
            <li><strong>10th:</strong> {data.tenth}</li>
            <li><strong>12th:</strong> {data.twelfth}</li>
            <li><strong>College:</strong> {data.college}</li>
          </ul>
        </section>

        <section>
          <h2>Experience</h2>
          <p>{data.experience}</p>
        </section>

        <section>
          <h2>Certifications</h2>
          <p>{data.certifications}</p>
        </section>

        <section>
          <h2>Extra-Curricular Activities</h2>
          <p>{data.extracurricular}</p>
        </section>

        <section>
          <h2>Links</h2>
          <p>GitHub: {data.github}</p>
          <p>LinkedIn: {data.linkedin}</p>
        </section>
      </div>

      {/* ✅ Skill Match & Eligibility Component */}
      <SkillMatchScore
        skills={["JavaScript", "React", "Node.js", "HTML", "CSS"]}
        matchPercentage={88}
        eligibilityScore={91}
      />
    </div>
  );
};

export default ResumePreview;
