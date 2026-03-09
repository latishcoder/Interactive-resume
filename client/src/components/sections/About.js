// src/components/sections/About.js — About Me section
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiPhone, FiGlobe } from "react-icons/fi";
import useInView from "../common/useInView";
import axios from "axios";

const About = ({ profile }) => {

  // NEW STATE FOR BACKEND DATA
  const [backendProfile, setBackendProfile] = useState(null);

  // MERGE BACKEND + PROP DATA
  const data = backendProfile?.profileData || profile?.profileData || {};

  const [ref, inView] = useInView(0.2);

  // FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user");
        setBackendProfile(res.data);
      } catch (error) {
        console.log("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section id="about" className="bg-white dark:bg-slate-900/50">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section header */}
          <div className="mb-12">
            <div className="section-divider" />
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">
              A little more about who I am and what I do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left — Bio text */}
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6">
                {data.bio ||
                  `Hello! I'm ${data.fullName || "a developer"}, a passionate Full Stack Developer 
                  with expertise in building modern web applications. I love turning complex 
                  problems into simple, elegant solutions.`}
              </p>

              <p className="text-slate-500 dark:text-slate-500 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, 
                contributing to open source projects, or writing about web development.
              </p>

              {/* Quick info */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <InfoItem
                  icon={<FiMapPin />}
                  label="Location"
                  value={data.location || "City, Country"}
                />

                <InfoItem
                  icon={<FiMail />}
                  label="Email"
                  value={data.email || "you@email.com"}
                />

                {data.phone && (
                  <InfoItem
                    icon={<FiPhone />}
                    label="Phone"
                    value={data.phone}
                  />
                )}

                {data.website && (
                  <InfoItem
                    icon={<FiGlobe />}
                    label="Website"
                    value={data.website}
                  />
                )}
              </div>
            </div>

            {/* Right — Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "2+", label: "Years Experience" },
                { number: "20+", label: "Projects Completed" },
                { number: "10+", label: "Technologies" },
                { number: "100%", label: "Dedication" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="card p-6 text-center"
                >
                  <div
                    className="text-4xl font-bold gradient-text mb-2"
                    style={{ fontFamily: "DM Serif Display, serif" }}
                  >
                    {stat.number}
                  </div>

                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="text-primary-500 mt-0.5">{icon}</span>

    <div>
      <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide">
        {label}
      </p>

      <p className="text-slate-700 dark:text-slate-300 text-sm font-medium truncate">
        {value}
      </p>
    </div>
  </div>
);

export default About;