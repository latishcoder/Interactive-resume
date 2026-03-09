// routes/skills.js
const express = require("express");
const router = express.Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require("../controllers/skillController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", getSkills);
router.post("/", protect, adminOnly, createSkill);
router.put("/:id", protect, adminOnly, updateSkill);
router.delete("/:id", protect, adminOnly, deleteSkill);

module.exports = router;
