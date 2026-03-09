// src/components/sections/Experience.js — Timeline experience section
import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiBriefcase } from "react-icons/fi";
import useInView from "../common/useInView";

const formatDate = (dateStr) => {
  if (!dateStr) return "Present";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const Experience = ({ experiences }) => {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="experience" className="bg-slate-50 dark:bg-slate-950">
      <div className="section-container">
        <div className="mb-12">
          <div className="section-divider" />
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">My professional journey</p>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-primary-300 to-transparent" />

          {experiences.length === 0 ? (
            <p className="text-center text-slate-400 py-12 ml-12">No experience added yet.</p>
          ) : (
            experiences.map((exp, idx) => (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="relative pl-12 md:pl-20 pb-10 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-2 md:left-6 top-1 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-primary-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-500" />
                </div>

                {/* Card */}
                <div className="card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                        {exp.position}
                      </h3>
                      <div className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400 font-medium">
                        <FiBriefcase size={14} />
                        <a
                          href={exp.companyUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {exp.company}
                        </a>
                      </div>
                    </div>
                    <span className="tag">{exp.type}</span>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={13} />
                      {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <FiMapPin size={13} /> {exp.location}
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  {exp.responsibilities?.length > 0 && (
                    <ul className="space-y-1 mb-4">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="text-primary-500 mt-1">▸</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech tags */}
                  {exp.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
