// src/pages/HomePage.js — Main portfolio page
import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import { Education, Certifications } from "../components/sections/Education";
import Contact from "../components/sections/Contact";

import {
  userAPI,
  projectsAPI,
  skillsAPI,
  experienceAPI,
  educationAPI,
} from "../utils/api";

const HomePage = () => {
  const [data, setData] = useState({
    profile: null,
    projects: [],
    skills: [],
    experiences: [],
    educations: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all data in parallel for fast load
    const fetchAll = async () => {
      try {
        const [profile, projects, skills, experiences, educations] =
          await Promise.allSettled([
            userAPI.getProfile(),
            projectsAPI.getAll(),
            skillsAPI.getAll(),
            experienceAPI.getAll(),
            educationAPI.getAll(),
          ]);

        setData({
          profile: profile.value?.data?.data || null,
          projects: projects.value?.data?.data || [],
          skills: skills.value?.data?.data || [],
          experiences: experiences.value?.data?.data || [],
          educations: educations.value?.data?.data || [],
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Fixed navigation */}
      <Navbar profile={data.profile} />

      {/* Main content */}
      <main>
        <Hero profile={data.profile} />
        <About profile={data.profile} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Experience experiences={data.experiences} />
        <Education educations={data.educations} />
        <Certifications />
        <Contact profile={data.profile} />
      </main>

      <Footer profile={data.profile} />
    </div>
  );
};

export default HomePage;
