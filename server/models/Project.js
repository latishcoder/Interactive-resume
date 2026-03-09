// models/Project.js — Portfolio projects schema
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    longDescription: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "https://via.placeholder.com/600x400?text=Project+Image",
    },
    technologies: {
      type: [String], // e.g. ["React", "Node.js", "MongoDB"]
      default: [],
    },
    githubUrl: {
      type: String,
      default: "",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["Web", "Mobile", "AI/ML", "Other"],
      default: "Web",
    },
    order: {
      type: Number,
      default: 0, // Used for custom sorting
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
