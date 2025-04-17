import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="modern-navbar">
      <div className="navbar-logo">Resume AI</div>
      <ul className="navbar-links">
        <li><NavLink to="/" activeclassname="active">Home</NavLink></li>
        <li><NavLink to="/upload" activeclassname="active">Upload Resume</NavLink></li>
        <li><NavLink to="/create" activeclassname="active">Create Resume</NavLink></li>
        <li><NavLink to="/contact" activeclassname="active">Contact</NavLink></li>
        <li><NavLink to="/about" activeclassname="active">About</NavLink></li>
      </ul>
      <div className="navbar-auth">
        <button className="btn-outline">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
