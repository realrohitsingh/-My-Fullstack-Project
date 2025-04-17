// frontend/src/components/UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a resume file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      setError(null);
      const res = await axios.post('http://localhost:5000/api/resume/upload', formData);
      setResult(res.data);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📤 Upload Your Resume</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload & Analyze'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3>✅ Resume Analysis Result</h3>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Role:</strong> {result.role}</p>
          <p><strong>Summary:</strong> {result.summary}</p>

          <h4>💼 Experience</h4>
          {result.experience && result.experience.length > 0 ? (
            <ul>
              {result.experience.map((exp, index) => (
                <li key={index}>
                  {exp.role} at {exp.company} ({exp.duration})
                </li>
              ))}
            </ul>
          ) : (
            <p>No experience data found.</p>
          )}

          <h4>🛠️ Skills</h4>
          <ul>
            {result.skills.map((skill, index) => <li key={index}>{skill}</li>)}
          </ul>

          <h4>🎓 Education</h4>
          <p>{result.education.degree}, {result.education.institution} ({result.education.year})</p>

          <h4>🔍 Eligibility Status</h4>
          <p><strong>{result.eligible ? '✅ You are eligible!' : '❌ Not eligible'}</strong></p>
          <p>Reason: {result.reason}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
