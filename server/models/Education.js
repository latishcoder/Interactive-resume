// models/Education.js — Education history schema
const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: [true, "Field of study is required"],
      trim: true,
    },
    startYear: {
      type: Number,
      required: [true, "Start year is required"],
    },
    endYear: {
      type: Number,
      default: null, // null = currently studying
    },
    current: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: String,
      default: "", // e.g., "8.5 CGPA" or "First Class"
    },
    description: {
      type: String,
      default: "",
    },
    institutionUrl: {
      type: String,
      default: "",
    },
    institutionLogo: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Education", educationSchema);
