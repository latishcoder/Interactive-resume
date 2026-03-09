// src/components/sections/Skills.js — Skills with animated progress bars
import React, { useState } from "react";
import { motion } from "framer-motion";
import useInView from "../common/useInView";

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "DevOps", "Mobile", "Other"];

const Skills = ({ skills }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [ref, inView] = useInView(0.2);

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  // Group skills by category for display
  const grouped = filtered.reduce((acc, skill) => {
    const cat = skill.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="bg-slate-50 dark:bg-slate-950">
      <div className="section-container">
        <div className="mb-12">
          <div className="section-divider" />
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Technologies I work with on a daily basis
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/30"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-primary-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div ref={ref}>
          {Object.keys(grouped).length === 0 ? (
            <p className="text-center text-slate-400 py-12">No skills found.</p>
          ) : (
            Object.entries(grouped).map(([category, categorySkills]) => (
              <div key={category} className="mb-10">
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-500" />
                  {category}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill, idx) => (
                    <SkillCard
                      key={skill._id}
                      skill={skill}
                      delay={idx * 0.05}
                      inView={inView}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Individual skill card with animated progress bar
const SkillCard = ({ skill, delay, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay, duration: 0.5 }}
    className="card p-5"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">
        {skill.name}
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
        {skill.level}%
      </span>
    </div>
    <div className="skill-bar">
      <motion.div
        className="skill-bar-fill"
        initial={{ width: 0 }}
        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
        transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

export default Skills;
