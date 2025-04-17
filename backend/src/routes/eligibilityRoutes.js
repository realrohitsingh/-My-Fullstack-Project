const processResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Process resume file here (PDF parsing, AI analysis, etc.)
        res.json({ success: true, message: "Resume processed successfully" });
    } catch (error) {
        console.error("Resume processing error:", error);
        res.status(500).json({ error: "Server error during resume processing" });
    }
};

module.exports = { processResume };
