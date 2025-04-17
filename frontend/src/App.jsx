import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ResumeTemplates from "./pages/ResumeTemplates";
import UploadResume from "./pages/UploadResume";
import CreateResume from "./pages/CreateResume";
import ResumePreview from "./pages/ResumePreview";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login"; 
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ResumeScreening from "./pages/ResumeScreening";  // ✅ New Import

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<ResumeTemplates />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/create" element={<CreateResume />} />
        <Route path="/preview" element={<ResumePreview />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ Updated: Screening route now loads the UploadForm component via ResumeScreening */}
        <Route path="/screening" element={<ResumeScreening />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
