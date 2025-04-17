import React from 'react';

const SkillMatchBar = ({ skills }) => {
  return (
    <div>
      <h4>Skills</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {skills.map((skill, idx) => (
          <span
            key={idx}
            style={{
              background: '#eee',
              borderRadius: '12px',
              padding: '4px 10px',
              fontSize: '0.9rem'
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillMatchBar;
