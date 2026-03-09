// src/components/sections/Education.js — Education section
import React from "react";
import { motion } from "framer-motion";
import { FiBook,  } from "react-icons/fi";
import useInView from "../common/useInView";

export const Education = ({ educations }) => {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="education" className="bg-white dark:bg-slate-900/50">
      <div className="section-container">
        <div className="mb-12">
          <div className="section-divider" />
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">My academic background</p>
        </div>

        <div ref={ref} className="max-w-3xl mx-auto space-y-6">
          {educations.length === 0 ? (
            <p className="text-center text-slate-400 py-12">No education added yet.</p>
          ) : (
            educations.map((edu, idx) => (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.12, duration: 0.6 }}
                className="card p-6 flex gap-5"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 shrink-0">
                  <FiBook size={22} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h3>
                      <a
                        href={edu.institutionUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-primary-400 text-sm hover:underline"
                      >
                        {edu.institution}
                      </a>
                    </div>
                    <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {edu.startYear} — {edu.current ? "Present" : edu.endYear}
                    </span>
                  </div>

                  {edu.grade && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Grade: <span className="font-medium text-slate-700 dark:text-slate-300">{edu.grade}</span>
                    </p>
                  )}

                  {edu.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {edu.description}
                    </p>
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

// ── Certifications Section ────────────────────────────────
// Sample static certifications data — you can make this dynamic too
const SAMPLE_CERTS = [
  { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2023", badge: "🏆" },
  { name: "React Developer Certificate", issuer: "Meta (Coursera)", year: "2023", badge: "⚛️" },
  { name: "Node.js Application Development", issuer: "OpenJS Foundation", year: "2022", badge: "🟢" },
  { name: "MongoDB Developer Path", issuer: "MongoDB University", year: "2022", badge: "🍃" },
];

export const Certifications = () => {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="certifications" className="bg-slate-50 dark:bg-slate-950">
      <div className="section-container">
        <div className="mb-12">
          <div className="section-divider" />
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Credentials and achievements</p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {SAMPLE_CERTS.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="card p-5 text-center"
            >
              <div className="text-4xl mb-3">{cert.badge}</div>
              <h3 className="font-semibold text-slate-800 dark:text-white text-sm mb-1 leading-tight">
                {cert.name}
              </h3>
              <p className="text-xs text-primary-600 dark:text-primary-400 mb-1">{cert.issuer}</p>
              <p className="text-xs text-slate-400">{cert.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
