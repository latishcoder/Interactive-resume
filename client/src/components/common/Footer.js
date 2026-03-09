// src/components/common/Footer.js
import React from "react";
import { FiHeart } from "react-icons/fi";

const Footer = ({ profile }) => {
  const name = profile?.profileData?.fullName || "Developer";
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm flex items-center justify-center gap-1.5">
          Built with <FiHeart className="text-red-400" size={13} /> by{" "}
          <span className="text-white font-medium">{name}</span>
        </p>
        <p className="text-xs mt-1 text-slate-500">
          MERN Stack • React • Node.js • MongoDB •{" "}
          {new Date().getFullYear()}
        </p>
        <div className="mt-4">
          <a
            href="/admin/login"
            className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
          >
            Admin →
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
