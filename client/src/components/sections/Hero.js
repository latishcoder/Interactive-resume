// src/components/sections/Hero.js — Hero section
import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiArrowDown } from "react-icons/fi";

const Hero = ({ profile }) => {
  const data = profile?.profileData || {};

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  // Stagger animation for children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/10 dark:bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent-400/10 dark:bg-accent-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(to right, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="section-container text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          {/* Avatar */}
          {data.avatarUrl && (
            <motion.div variants={item} className="mb-8 flex justify-center">
              <div className="relative">
                <img
                  src={data.avatarUrl}
                  alt={data.fullName}
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-primary-100 dark:ring-primary-900/50 shadow-xl"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-slate-950" />
              </div>
            </motion.div>
          )}

          {/* Greeting chip */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6 border border-primary-100 dark:border-primary-800/50">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl lg:text-8xl text-slate-900 dark:text-white mb-4 leading-none"
            style={{ fontFamily: "DM Serif Display, serif" }}
          >
            {data.fullName || "Latish Salunkhe"}
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={item}
            className="text-2xl md:text-3xl font-light mb-6"
          >
            <span className="text-slate-500 dark:text-slate-400">I'm a </span>
            <span className="gradient-text font-medium">
              {data.tagline || "Full Stack Developer"}
            </span>
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={item}
            className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {data.bio || "Passionate about building beautiful, scalable web applications."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary"
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline"
            >
              Get in Touch
            </button>
            {data.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex items-center gap-2"
              >
                Download CV
              </a>
            )}
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex gap-4 justify-center">
            {data.github && (
              <SocialLink href={data.github} icon={<FiGithub />} label="GitHub" />
            )}
            {data.linkedin && (
              <SocialLink href={data.linkedin} icon={<FiLinkedin />} label="LinkedIn" />
            )}
            {data.twitter && (
              <SocialLink href={data.twitter} icon={<FiTwitter />} label="Twitter" />
            )}
            {data.email && (
              <SocialLink href={`mailto:${data.email}`} icon={<FiMail />} label="Email" />
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-primary-500 transition-colors"
          aria-label="Scroll down"
        >
          <FiArrowDown size={24} />
        </motion.button>
      </div>
    </section>
  );
};

// Social icon button
const SocialLink = ({ href, icon, label }) => (
  <motion.a
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full flex items-center justify-center
               text-slate-600 dark:text-slate-400 
               bg-white dark:bg-slate-800 
               border border-slate-200 dark:border-slate-700
               hover:text-primary-600 hover:border-primary-300
               dark:hover:text-primary-400 dark:hover:border-primary-700
               shadow-sm transition-all duration-200"
  >
    {icon}
  </motion.a>
);

export default Hero;
