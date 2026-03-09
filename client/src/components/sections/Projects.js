// src/components/sections/Projects.js — Project cards grid
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import useInView from "../common/useInView";

const Projects = ({ projects }) => {
  const [filter, setFilter] = useState("All");
  const [ref, inView] = useInView(0.1);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="bg-white dark:bg-slate-900/50">
      <div className="section-container">
        <div className="mb-12">
          <div className="section-divider" />
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Some of my recent work and side projects
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          ref={ref}
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.length === 0 ? (
              <p className="col-span-3 text-center text-slate-400 py-12">
                No projects yet. Check back soon!
              </p>
            ) : (
              filtered.map((project, idx) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  delay={idx * 0.08}
                  inView={inView}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

// Project card component
const ProjectCard = ({ project, delay, inView }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ delay, duration: 0.5 }}
    className="card group overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-xl transition duration-300"
  >
    {/* Project image */}
    <div className="relative overflow-hidden h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-slate-800">
      
      <img
        src={
          project.imageUrl ||
          `https://via.placeholder.com/600x400/0ea5e9/ffffff?text=${encodeURIComponent(
            project.title
          )}`
        }
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 rounded-full text-black hover:scale-110 transition"
          >
            <FiGithub size={18} />
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-500 p-3 rounded-full text-white hover:scale-110 transition"
          >
            <FiExternalLink size={18} />
          </a>
        )}

      </div>

      {/* Featured badge */}
      {project.featured && (
        <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
          ⭐ Featured
        </span>
      )}
    </div>

    {/* Card content */}
    <div className="p-5 flex flex-col flex-1">

      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-slate-800 dark:text-white text-base leading-tight">
          {project.title}
        </h3>

        <span className="tag ml-2 shrink-0 text-xs">
          {project.category}
        </span>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.technologies?.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 pt-2 border-t border-slate-100 dark:border-slate-700/50">

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            <FiGithub size={14} /> Code
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            <FiExternalLink size={14} /> Live Demo
          </a>
        )}

      </div>

    </div>
  </motion.div>
);

export default Projects;