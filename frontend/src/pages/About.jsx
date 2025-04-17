import React from "react";
import "../styles/About.css";

const teamMembers = [
  {
    name: "Rohit Singh",
    title: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Designing for users is designing for the future.",
  },
  {
    name: "Priya Sharma",
    title: "AI Engineer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "Intelligent resumes powered by real intelligence.",
  },
  {
    name: "Ankit Verma",
    title: "UX Specialist",
    image: "https://randomuser.me/api/portraits/men/47.jpg",
    quote: "User delight is my ultimate goal.",
  },
];

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header animate-fade">
        <h1>Empowering the Future of Resume Building</h1>
        <p>
          At <span className="highlight">AI ResumeCraft</span>, we combine the power of GPT-based intelligence with your creativity
          to help you build world-class resumes effortlessly. Our mission is simple – to provide you with the most intuitive, powerful, and modern resume-building experience on the internet.
        </p>
      </div>

      <div className="about-cards animate-fade-up">
        <div className="card">
          <h3>💡 User-First Design</h3>
          <p>Every feature is designed to be smooth, fast, and user-friendly — because your time matters.</p>
        </div>
        <div className="card">
          <h3>🤖 GPT-Powered Intelligence</h3>
          <p>Get smart suggestions, real-time skill matching, and resume enhancement using GPT.</p>
        </div>
        <div className="card">
          <h3>🌍 Global Standards</h3>
          <p>Stay ahead with resumes that follow international job market standards.</p>
        </div>
        <div className="card">
          <h3>🚀 Built for the Future</h3>
          <p>We keep evolving with user feedback to deliver a smarter platform every day.</p>
        </div>
      </div>

      <div className="team-section animate-fade">
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          {teamMembers.map((member, idx) => (
            <div className="team-card" key={idx}>
              <img src={member.image} alt={member.name} />
              <h4>{member.name}</h4>
              <p className="title">{member.title}</p>
              <blockquote>"{member.quote}"</blockquote>
            </div>
          ))}
        </div>
      </div>

      <div className="get-started animate-fade-up">
        <h2>Ready to build your dream resume?</h2>
        <button onClick={() => window.location.href = "/create"}>Get Started</button>
      </div>
    </div>
  );
};

export default About;
