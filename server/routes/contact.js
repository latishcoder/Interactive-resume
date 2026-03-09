// routes/contact.js
const express = require("express");
const router = express.Router();
const { sendMessage, getMessages, markAsRead, deleteMessage } = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/auth");

router.post("/", sendMessage);                               // Public — submit form
router.get("/", protect, adminOnly, getMessages);            // Admin — view all
router.put("/:id/read", protect, adminOnly, markAsRead);     // Admin — mark read
router.delete("/:id", protect, adminOnly, deleteMessage);    // Admin — delete

module.exports = router;
