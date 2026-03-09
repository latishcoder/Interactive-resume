// controllers/userController.js — Public profile data
const User = require("../models/User");

// @desc    Get public profile data
// @route   GET /api/user/profile
// @access  Public
const getProfile = async (req, res) => {
  try {
    const admin = await User.findOne({ role: "admin" }).select("-password");
    if (!admin) return res.status(404).json({ success: false, message: "Profile not found" });
    res.json({ success: true, data: admin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update profile data
// @route   PUT /api/user/profile
// @access  Private (Admin)
const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profileData: req.body.profileData, name: req.body.name },
      { new: true, runValidators: true }
    ).select("-password");
    res.json({ success: true, message: "Profile updated!", data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getProfile, updateProfile };
