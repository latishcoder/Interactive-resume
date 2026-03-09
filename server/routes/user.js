// routes/user.js
const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/profile", getProfile);                         // Public
router.put("/profile", protect, adminOnly, updateProfile);  // Admin only

module.exports = router;
