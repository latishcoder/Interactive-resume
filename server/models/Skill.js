// models/Skill.js — Skills schema
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
    },
    level: {
      type: Number,
      required: [true, "Skill level is required"],
      min: 0,
      max: 100, // percentage for progress bar
    },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Other"],
      default: "Other",
    },
    icon: {
      type: String,
      default: "", // FontAwesome class or URL
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
