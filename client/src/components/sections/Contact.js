// src/components/sections/Contact.js — Contact form with API integration
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";
import toast from "react-hot-toast";
import { contactAPI } from "../../utils/api";
import useInView from "../common/useInView";

const Contact = ({ profile }) => {
  const data = profile?.profileData || {};
  const [ref, inView] = useInView(0.1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await contactAPI.send(formData);
      toast.success("Message sent! I'll get back to you soon 🎉");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send. Try emailing directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-white dark:bg-slate-900/50">
      <div className="section-container">
        <div className="mb-12">
          <div className="section-divider" />
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have a project in mind? I'd love to hear from you.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-5 gap-10 max-w-5xl mx-auto"
        >
          {/* Left — Contact info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3"
                  style={{ fontFamily: "DM Serif Display, serif" }}>
                Let's talk
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                I'm currently open to new opportunities. Whether you have a project,
                question, or just want to say hi — my inbox is always open!
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              {data.email && (
                <ContactInfo icon={<FiMail />} label="Email" value={data.email} href={`mailto:${data.email}`} />
              )}
              {data.location && (
                <ContactInfo icon={<FiMapPin />} label="Location" value={data.location} />
              )}
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {data.github && (
                <SocialBtn href={data.github} icon={<FiGithub />} label="GitHub" />
              )}
              {data.linkedin && (
                <SocialBtn href={data.linkedin} icon={<FiLinkedin />} label="LinkedIn" />
              )}
            </div>
          </div>

          {/* Right — Contact form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project collaboration"
                className="input"
                required
              />
            </div>

            <div>
              <label className="label">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                className="input resize-none"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend size={16} /> Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, label, value, href }) => (
  <div className="flex items-start gap-3">
    <span className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 shrink-0">
      {icon}
    </span>
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wide">{label}</p>
      {href ? (
        <a href={href} className="text-slate-700 dark:text-slate-300 text-sm hover:text-primary-600 transition-colors">
          {value}
        </a>
      ) : (
        <p className="text-slate-700 dark:text-slate-300 text-sm">{value}</p>
      )}
    </div>
  </div>
);

const SocialBtn = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-xl flex items-center justify-center
               text-slate-600 dark:text-slate-400 
               border border-slate-200 dark:border-slate-700
               hover:bg-primary-500 hover:text-white hover:border-primary-500
               transition-all duration-200"
  >
    {icon}
  </a>
);

export default Contact;
