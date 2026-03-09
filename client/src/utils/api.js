// src/utils/api.js — Centralized API client with Axios

import axios from "axios";

/* =========================================================
   Base API URL
   ========================================================= */

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/* =========================================================
   Axios Instance
   ========================================================= */

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================================
   Request Interceptor
   Automatically attach JWT token
   ========================================================= */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("resumeToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================================================
   Response Interceptor
   Handle global errors
   ========================================================= */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Handle unauthorized user
    if (status === 401) {
      localStorage.removeItem("resumeToken");
      localStorage.removeItem("resumeUser");

      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }

    // Handle server errors
    if (status === 500) {
      console.error("Server Error:", error.response?.data?.message);
    }

    return Promise.reject(error);
  }
);

/* =========================================================
   AUTH API
   ========================================================= */

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

/* =========================================================
   USER / PROFILE API
   ========================================================= */

export const userAPI = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (data) => api.put("/user/profile", data),
};

/* =========================================================
   PROJECTS API
   ========================================================= */

export const projectsAPI = {
  getAll: () => api.get("/projects"),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post("/projects", data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

/* =========================================================
   SKILLS API
   ========================================================= */

export const skillsAPI = {
  getAll: () => api.get("/skills"),
  create: (data) => api.post("/skills", data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

/* =========================================================
   EXPERIENCE API
   ========================================================= */

export const experienceAPI = {
  getAll: () => api.get("/experience"),
  create: (data) => api.post("/experience", data),
  update: (id, data) => api.put(`/experience/${id}`, data),
  delete: (id) => api.delete(`/experience/${id}`),
};

/* =========================================================
   EDUCATION API
   ========================================================= */

export const educationAPI = {
  getAll: () => api.get("/education"),
  create: (data) => api.post("/education", data),
  update: (id, data) => api.put(`/education/${id}`, data),
  delete: (id) => api.delete(`/education/${id}`),
};

/* =========================================================
   CONTACT API
   ========================================================= */

export const contactAPI = {
  send: (data) => api.post("/contact", data),
  getAll: () => api.get("/contact"),
  markRead: (id) => api.put(`/contact/${id}/read`),
  delete: (id) => api.delete(`/contact/${id}`),
};

/* =========================================================
   Helper Function
   Fetch multiple APIs in parallel
   Useful for loading portfolio data
   ========================================================= */

export const portfolioAPI = {
  getAllData: async () => {
    const [
      profile,
      skills,
      projects,
      experience,
      education,
    ] = await Promise.all([
      userAPI.getProfile(),
      skillsAPI.getAll(),
      projectsAPI.getAll(),
      experienceAPI.getAll(),
      educationAPI.getAll(),
    ]);

    return {
      profile: profile.data,
      skills: skills.data,
      projects: projects.data,
      experience: experience.data,
      education: education.data,
    };
  },
};

/* =========================================================
   Export Axios Instance
   ========================================================= */

export default api;