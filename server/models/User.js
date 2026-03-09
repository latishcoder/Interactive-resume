// models/User.js — Admin user schema
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    // Public profile data
    profileData: {
      fullName: { type: String, default: "Your Name" },
      tagline: { type: String, default: "Full Stack Developer" },
      bio: { type: String, default: "Welcome to my portfolio!" },
      location: { type: String, default: "City, Country" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      website: { type: String, default: "" },
      resumeUrl: { type: String, default: "" },
      avatarUrl: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
