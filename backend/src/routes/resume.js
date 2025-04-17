const { getAllResumes } = require("../controllers/eligibilityController");

router.get("/", getAllResumes);
