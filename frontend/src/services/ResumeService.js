import axios from "axios";

const ResumeService = {
  // ✅ Fetch all resumes
  getResumes: () => axios.get("/api/resumes"),

  // ✅ Download resume as PDF
  downloadResume: async (id) => {
    try {
      const response = await axios.get(`/api/download/${id}`, {
        responseType: "blob", // 🟢 Ensures PDF is downloaded as a file
      });

      // 🟢 Create a downloadable PDF link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Resume_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  },
};

export default ResumeService;
