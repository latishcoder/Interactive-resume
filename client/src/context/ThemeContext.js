// src/context/ThemeContext.js — Dark/Light mode management
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check saved preference or system preference
    const saved = localStorage.getItem("resumeTheme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply class to <html> element for Tailwind dark mode
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("resumeTheme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("resumeTheme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
