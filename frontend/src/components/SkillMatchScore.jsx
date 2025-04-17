import React from "react";
import "../styles/skillmatch.css"; // ✅ Custom CSS for styling bars

const SkillMatchScore = ({ skills = [], matchPercentage = 0, eligibilityScore = 0 }) => {
  return (
    <div className="skill-match-box">
      <h2>Skill Match & Eligibility</h2>

      <div className="score-section">
        <div>
          <p className="score-label">Match Percentage:</p>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${matchPercentage}%` }} />
          </div>
          <span>{matchPercentage}%</span>
        </div>

        <div>
          <p className="score-label">Eligibility Score:</p>
          <div className="progress-bar">
            <div className="fill green" style={{ width: `${eligibilityScore}%` }} />
          </div>
          <span>{eligibilityScore}/100</span>
        </div>
      </div>

      <div className="skills-list">
        <h3>Matched Skills:</h3>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>✅ {skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SkillMatchScore;
