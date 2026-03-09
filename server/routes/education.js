// routes/education.js
const express = require("express");
const router = express.Router();
const { getEducations, createEducation, updateEducation, deleteEducation } = require("../controllers/educationController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", getEducations);
router.post("/", protect, adminOnly, createEducation);
router.put("/:id", protect, adminOnly, updateEducation);
router.delete("/:id", protect, adminOnly, deleteEducation);

module.exports = router;
