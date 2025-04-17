import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Build Your Perfect Resume</h1>
        <p>Upload your resume, screen it for job eligibility, or create one with AI-powered suggestions.</p>
        <div className="cta-buttons">
          <Link to="/upload" className="btn primary">Upload Resume</Link> 
          <Link to="/screening" className="btn secondary">Resume Screening Tool</Link> {/* ✅ Updated Button */}
          <Link to="/create" className="btn tertiary">Create Resume</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature">
            <h3>Easy Resume Upload</h3>
            <p>Upload your resume and refine it with our tools.</p>
          </div>
          <div className="feature">
            <h3>AI-Powered Suggestions</h3>
            <p>Get recommendations for skills, experiences, and achievements.</p>
          </div>
          <div className="feature">
            <h3>ATS Screening</h3> {/* 🔥 Updated Feature */}
            <p>Analyze your resume for job fit and get an ATS Score.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p>"This tool helped me land my dream job! The AI suggestions were spot on."</p>
          <span>- Alex Johnson</span>
        </div>
        <div className="testimonial">
          <p>"Best resume builder ever! Loved the ATS screening tool."</p> {/* ✅ Updated Testimonial */}
          <span>- Sarah Lee</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
