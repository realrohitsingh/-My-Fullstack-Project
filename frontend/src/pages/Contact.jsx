import React from "react";
import "../styles/contact.css";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // X (formerly Twitter)

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Page</h1>
        <p>Let’s connect! Reach out for collaboration, queries, or just to say hi.</p>

        <div className="contact-details">
          <div className="contact-item">
            <FaEnvelope />
            <a href="mailto:youremail@example.com">resumescreeningtool@example.com</a>
          </div>
          <div className="contact-item">
            <FaPhone />
            <a href="tel:+911234567890">+91 1234 567890</a>
          </div>
        </div>

        <div className="social-icons">
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <FaXTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
