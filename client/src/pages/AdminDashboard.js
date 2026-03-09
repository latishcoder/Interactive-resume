// src/pages/AdminDashboard.js — Full admin panel with CRUD operations
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiGrid, FiCode, FiZap, FiBriefcase, FiBook,
  FiMail, FiLogOut, FiPlus, FiEdit3, FiTrash2,
  FiCheck, FiX, FiUser, FiMenu
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import {
  projectsAPI, skillsAPI, experienceAPI,
  educationAPI, contactAPI, userAPI
} from "../utils/api";

// ── Sidebar nav items ───────────────────────────────────────
const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: <FiGrid /> },
  { id: "projects", label: "Projects", icon: <FiCode /> },
  { id: "skills", label: "Skills", icon: <FiZap /> },
  { id: "experience", label: "Experience", icon: <FiBriefcase /> },
  { id: "education", label: "Education", icon: <FiBook /> },
  { id: "messages", label: "Messages", icon: <FiMail /> },
  { id: "profile", label: "Profile", icon: <FiUser /> },
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState({
    projects: [], skills: [], experiences: [],
    educations: [], messages: [], profile: null,
  });
  const [loading, setLoading] = useState(true);

  // Fetch all data
  const fetchAll = useCallback(async () => {
    try {
      const [projects, skills, experiences, educations, messages, profile] =
        await Promise.allSettled([
          projectsAPI.getAll(),
          skillsAPI.getAll(),
          experienceAPI.getAll(),
          educationAPI.getAll(),
          contactAPI.getAll(),
          userAPI.getProfile(),
        ]);

      setData({
        projects: projects.value?.data?.data || [],
        skills: skills.value?.data?.data || [],
        experiences: experiences.value?.data?.data || [],
        educations: educations.value?.data?.data || [],
        messages: messages.value?.data?.data || [],
        profile: profile.value?.data?.data || null,
      });
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Generic delete handler ──────────────────────────────
  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      const apis = { projects: projectsAPI, skills: skillsAPI, experiences: experienceAPI, educations: educationAPI };
      await apis[type].delete(id);
      toast.success("Deleted successfully");
      fetchAll();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-white" style={{ fontFamily: "DM Serif Display, serif" }}>
            Admin Panel
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === item.id
                  ? "bg-primary-500 text-white shadow-md shadow-primary-500/30"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {item.icon}
              {item.label}
              {item.id === "messages" && data.messages.filter((m) => !m.read).length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {data.messages.filter((m) => !m.read).length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => { logout(); window.location.href = "/admin/login"; }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-slate-600 dark:text-slate-400"
          >
            <FiMenu size={20} />
          </button>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white capitalize">
            {NAV_ITEMS.find((n) => n.id === activeTab)?.label}
          </h1>
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="ml-auto text-sm text-slate-500 hover:text-primary-600 transition-colors">
            View Portfolio →
          </a>
        </header>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {activeTab === "overview" && <Overview data={data} />}
              {activeTab === "projects" && (
                <CRUDSection
                  title="Projects"
                  items={data.projects}
                  onRefresh={fetchAll}
                  onDelete={(id) => handleDelete("projects", id)}
                  renderItem={(p) => (
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{p.title}</p>
                      <p className="text-sm text-slate-500 truncate">{p.description}</p>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {p.technologies?.slice(0, 3).map((t) => (
                          <span key={t} className="tag text-xs">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  renderForm={(item, onSave, onCancel) => (
                    <ProjectForm item={item} onSave={onSave} onCancel={onCancel} onRefresh={fetchAll} />
                  )}
                />
              )}
              {activeTab === "skills" && (
                <CRUDSection
                  title="Skills"
                  items={data.skills}
                  onRefresh={fetchAll}
                  onDelete={(id) => handleDelete("skills", id)}
                  renderItem={(s) => (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono text-primary-600 dark:text-primary-400">{s.level}%</p>
                        <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1">
                          <div className="h-full bg-primary-500 rounded-full" style={{ width: `${s.level}%` }} />
                        </div>
                      </div>
                    </div>
                  )}
                  renderForm={(item, onSave, onCancel) => (
                    <SkillForm item={item} onSave={onSave} onCancel={onCancel} onRefresh={fetchAll} />
                  )}
                />
              )}
              {activeTab === "experience" && (
                <CRUDSection
                  title="Experience"
                  items={data.experiences}
                  onRefresh={fetchAll}
                  onDelete={(id) => handleDelete("experiences", id)}
                  renderItem={(e) => (
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{e.position}</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400">{e.company}</p>
                      <p className="text-xs text-slate-400">{e.type}</p>
                    </div>
                  )}
                  renderForm={(item, onSave, onCancel) => (
                    <ExperienceForm item={item} onSave={onSave} onCancel={onCancel} onRefresh={fetchAll} />
                  )}
                />
              )}
              {activeTab === "education" && (
                <CRUDSection
                  title="Education"
                  items={data.educations}
                  onRefresh={fetchAll}
                  onDelete={(id) => handleDelete("educations", id)}
                  renderItem={(e) => (
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{e.degree}</p>
                      <p className="text-sm text-primary-600 dark:text-primary-400">{e.institution}</p>
                      <p className="text-xs text-slate-400">{e.startYear} — {e.endYear || "Present"}</p>
                    </div>
                  )}
                  renderForm={(item, onSave, onCancel) => (
                    <EducationForm item={item} onSave={onSave} onCancel={onCancel} onRefresh={fetchAll} />
                  )}
                />
              )}
              {activeTab === "messages" && <MessagesPanel messages={data.messages} onRefresh={fetchAll} />}
              {activeTab === "profile" && <ProfilePanel profile={data.profile} onRefresh={fetchAll} />}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

// ── Overview stats panel ─────────────────────────────────────
const Overview = ({ data }) => (
  <div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {[
        { label: "Projects", count: data.projects.length, color: "blue" },
        { label: "Skills", count: data.skills.length, color: "purple" },
        { label: "Experiences", count: data.experiences.length, color: "green" },
        { label: "Educations", count: data.educations.length, color: "yellow" },
        { label: "Messages", count: data.messages.length, color: "red" },
        { label: "Unread", count: data.messages.filter(m => !m.read).length, color: "orange" },
      ].map((stat) => (
        <div key={stat.label} className="card p-4 text-center">
          <p className="text-3xl font-bold text-primary-500">{stat.count}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
    <div className="card p-6">
      <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Quick Tips</h3>
      <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
        <li>▸ Use the sidebar to manage each section of your portfolio</li>
        <li>▸ All changes reflect immediately on your public portfolio page</li>
        <li>▸ Set <strong>featured: true</strong> on projects to highlight them</li>
        <li>▸ Update your profile info and resume link under the Profile tab</li>
      </ul>
    </div>
  </div>
);

// ── Reusable CRUD list section ───────────────────────────────
const CRUDSection = ({ title, items, onDelete, renderItem, renderForm, onRefresh }) => {
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (item) => { setEditItem(item); setShowForm(true); };
  const handleAdd = () => { setEditItem(null); setShowForm(true); };
  const handleClose = () => { setShowForm(false); setEditItem(null); };
  const handleSave = () => { handleClose(); onRefresh(); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-500 dark:text-slate-400 text-sm">{items.length} item(s)</p>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2 py-2 text-sm">
          <FiPlus size={16} /> Add {title.slice(0, -1)}
        </button>
      </div>

      {/* Form panel */}
      {showForm && (
        <div className="card p-6 mb-6 border-l-4 border-primary-500">
          {renderForm(editItem, handleSave, handleClose)}
        </div>
      )}

      {/* Items list */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="card p-10 text-center text-slate-400">
            <FiPlus size={32} className="mx-auto mb-2 opacity-30" />
            <p>No {title.toLowerCase()} yet. Add your first one!</p>
          </div>
        ) : (
          items.map((item) => (
            <motion.div
              key={item._id}
              layout
              className="card p-4 flex items-center gap-4"
            >
              <div className="flex-1">{renderItem(item)}</div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                >
                  <FiEdit3 size={14} />
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

// ── Project Form ─────────────────────────────────────────────
const ProjectForm = ({ item, onSave, onCancel, onRefresh }) => {
  const [form, setForm] = useState({
    title: item?.title || "",
    description: item?.description || "",
    imageUrl: item?.imageUrl || "",
    technologies: item?.technologies?.join(", ") || "",
    githubUrl: item?.githubUrl || "",
    liveUrl: item?.liveUrl || "",
    category: item?.category || "Web",
    featured: item?.featured || false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean) };
      if (item?._id) {
        await projectsAPI.update(item._id, payload);
        toast.success("Project updated!");
      } else {
        await projectsAPI.create(payload);
        toast.success("Project added!");
      }
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold text-slate-800 dark:text-white">{item ? "Edit" : "Add"} Project</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="label">Title *</label><input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
        <div><label className="label">Category</label>
          <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {["Web", "Mobile", "AI/ML", "Other"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div><label className="label">Description *</label><textarea className="input" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
      <div><label className="label">Image URL</label><input className="input" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." /></div>
      <div><label className="label">Technologies (comma-separated)</label><input className="input" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node.js, MongoDB" /></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="label">GitHub URL</label><input className="input" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://github.com/..." /></div>
        <div><label className="label">Live URL</label><input className="input" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} placeholder="https://..." /></div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded accent-primary-500" />
        <span className="text-sm text-slate-700 dark:text-slate-300">Mark as Featured</span>
      </label>
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
          <FiCheck size={14} /> {loading ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost flex items-center gap-2">
          <FiX size={14} /> Cancel
        </button>
      </div>
    </form>
  );
};

// ── Skill Form ───────────────────────────────────────────────
const SkillForm = ({ item, onSave, onCancel }) => {
  const [form, setForm] = useState({ name: item?.name || "", level: item?.level || 80, category: item?.category || "Frontend" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (item?._id) { await skillsAPI.update(item._id, form); toast.success("Skill updated!"); }
      else { await skillsAPI.create(form); toast.success("Skill added!"); }
      onSave();
    } catch { toast.error("Save failed"); } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold text-slate-800 dark:text-white">{item ? "Edit" : "Add"} Skill</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <div><label className="label">Skill Name *</label><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="React.js" /></div>
        <div><label className="label">Level ({form.level}%)</label><input type="range" min="0" max="100" value={form.level} onChange={(e) => setForm({ ...form, level: +e.target.value })} className="w-full mt-2 accent-primary-500" /></div>
        <div><label className="label">Category</label>
          <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {["Frontend", "Backend", "Database", "DevOps", "Mobile", "Other"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2"><FiCheck size={14} />{loading ? "Saving..." : "Save"}</button>
        <button type="button" onClick={onCancel} className="btn-ghost flex items-center gap-2"><FiX size={14} />Cancel</button>
      </div>
    </form>
  );
};

// ── Experience Form ──────────────────────────────────────────
const ExperienceForm = ({ item, onSave, onCancel }) => {
  const [form, setForm] = useState({
    company: item?.company || "", position: item?.position || "", type: item?.type || "Full-time",
    location: item?.location || "", description: item?.description || "",
    startDate: item?.startDate ? item.startDate.slice(0, 10) : "",
    endDate: item?.endDate ? item.endDate.slice(0, 10) : "",
    current: item?.current || false,
    technologies: item?.technologies?.join(", ") || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, technologies: form.technologies.split(",").map(t => t.trim()).filter(Boolean) };
      if (item?._id) { await experienceAPI.update(item._id, payload); toast.success("Updated!"); }
      else { await experienceAPI.create(payload); toast.success("Added!"); }
      onSave();
    } catch { toast.error("Save failed"); } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold text-slate-800 dark:text-white">{item ? "Edit" : "Add"} Experience</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="label">Company *</label><input className="input" value={form.company} onChange={e => setForm({...form, company: e.target.value})} required /></div>
        <div><label className="label">Position *</label><input className="input" value={form.position} onChange={e => setForm({...form, position: e.target.value})} required /></div>
        <div><label className="label">Type</label>
          <select className="input" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
            {["Full-time","Part-time","Internship","Freelance","Contract"].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div><label className="label">Location</label><input className="input" value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
        <div><label className="label">Start Date *</label><input type="date" className="input" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} required /></div>
        <div><label className="label">End Date</label><input type="date" className="input" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} disabled={form.current} /></div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.current} onChange={e => setForm({...form, current: e.target.checked})} className="accent-primary-500" />
        <span className="text-sm text-slate-700 dark:text-slate-300">Currently working here</span>
      </label>
      <div><label className="label">Description *</label><textarea className="input" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} required /></div>
      <div><label className="label">Technologies (comma-separated)</label><input className="input" value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} placeholder="React, Node.js" /></div>
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2"><FiCheck size={14}/>{loading?"Saving...":"Save"}</button>
        <button type="button" onClick={onCancel} className="btn-ghost flex items-center gap-2"><FiX size={14}/>Cancel</button>
      </div>
    </form>
  );
};

// ── Education Form ───────────────────────────────────────────
const EducationForm = ({ item, onSave, onCancel }) => {
  const [form, setForm] = useState({
    institution: item?.institution || "", degree: item?.degree || "",
    fieldOfStudy: item?.fieldOfStudy || "", startYear: item?.startYear || new Date().getFullYear(),
    endYear: item?.endYear || "", current: item?.current || false,
    grade: item?.grade || "", description: item?.description || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (item?._id) { await educationAPI.update(item._id, form); toast.success("Updated!"); }
      else { await educationAPI.create(form); toast.success("Added!"); }
      onSave();
    } catch { toast.error("Save failed"); } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold text-slate-800 dark:text-white">{item ? "Edit" : "Add"} Education</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label className="label">Institution *</label><input className="input" value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} required /></div>
        <div><label className="label">Degree *</label><input className="input" value={form.degree} onChange={e => setForm({...form, degree: e.target.value})} required placeholder="Bachelor of Technology" /></div>
        <div><label className="label">Field of Study *</label><input className="input" value={form.fieldOfStudy} onChange={e => setForm({...form, fieldOfStudy: e.target.value})} required placeholder="Computer Science" /></div>
        <div><label className="label">Grade/CGPA</label><input className="input" value={form.grade} onChange={e => setForm({...form, grade: e.target.value})} placeholder="8.5 CGPA" /></div>
        <div><label className="label">Start Year *</label><input type="number" className="input" value={form.startYear} onChange={e => setForm({...form, startYear: +e.target.value})} required /></div>
        <div><label className="label">End Year</label><input type="number" className="input" value={form.endYear} onChange={e => setForm({...form, endYear: +e.target.value})} disabled={form.current} /></div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.current} onChange={e => setForm({...form, current: e.target.checked})} className="accent-primary-500" />
        <span className="text-sm text-slate-700 dark:text-slate-300">Currently studying here</span>
      </label>
      <div><label className="label">Description</label><textarea className="input" rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2"><FiCheck size={14}/>{loading?"Saving...":"Save"}</button>
        <button type="button" onClick={onCancel} className="btn-ghost flex items-center gap-2"><FiX size={14}/>Cancel</button>
      </div>
    </form>
  );
};

// ── Messages Panel ───────────────────────────────────────────
const MessagesPanel = ({ messages, onRefresh }) => {
  const handleMarkRead = async (id) => {
    await contactAPI.markRead(id);
    onRefresh();
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await contactAPI.delete(id);
    toast.success("Deleted");
    onRefresh();
  };

  return (
    <div className="space-y-4">
      <p className="text-slate-500 dark:text-slate-400 text-sm">{messages.length} message(s) — {messages.filter(m=>!m.read).length} unread</p>
      {messages.length === 0 && <div className="card p-10 text-center text-slate-400">No messages yet</div>}
      {messages.map((msg) => (
        <div key={msg._id} className={`card p-5 ${!msg.read ? "border-l-4 border-primary-500" : ""}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-800 dark:text-white">{msg.name}</span>
                <span className="text-slate-400 text-sm">— {msg.email}</span>
                {!msg.read && <span className="tag text-xs">New</span>}
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">{msg.subject}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{msg.message}</p>
              <p className="text-xs text-slate-400 mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              {!msg.read && (
                <button onClick={() => handleMarkRead(msg._id)} className="text-xs text-primary-600 hover:underline">Mark Read</button>
              )}
              <button onClick={() => handleDelete(msg._id)} className="text-xs text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Profile Panel ────────────────────────────────────────────
const ProfilePanel = ({ profile, onRefresh }) => {
  const [form, setForm] = useState(profile?.profileData || {});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userAPI.updateProfile({ profileData: form });
      toast.success("Profile updated!");
      onRefresh();
    } catch { toast.error("Update failed"); } finally { setLoading(false); }
  };

  const fields = [
    { key: "fullName", label: "Full Name", placeholder: "John Doe" },
    { key: "tagline", label: "Tagline / Role", placeholder: "Full Stack Developer" },
    { key: "location", label: "Location", placeholder: "New York, USA" },
    { key: "email", label: "Contact Email", placeholder: "john@example.com" },
    { key: "phone", label: "Phone", placeholder: "+1 234 567 8900" },
    { key: "github", label: "GitHub URL", placeholder: "https://github.com/..." },
    { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/in/..." },
    { key: "twitter", label: "Twitter URL", placeholder: "https://twitter.com/..." },
    { key: "website", label: "Website", placeholder: "https://yoursite.com" },
    { key: "avatarUrl", label: "Avatar/Photo URL", placeholder: "https://..." },
    { key: "resumeUrl", label: "Resume PDF URL", placeholder: "https://..." },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-slate-800 dark:text-white">Edit Profile</h3>
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="label">{label}</label>
            <input
              className="input"
              value={form[key] || ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              placeholder={placeholder}
            />
          </div>
        ))}
        <div>
          <label className="label">Bio</label>
          <textarea
            rows={4}
            className="input"
            value={form.bio || ""}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Tell visitors about yourself..."
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
          <FiCheck size={14} />{loading ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
};

export default AdminDashboard;
