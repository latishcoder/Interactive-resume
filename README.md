# 🚀 MERN Interactive Resume Web Application

A full-stack, production-ready portfolio/resume web application built with MongoDB, Express.js, React.js, and Node.js (MERN stack).

---

## 📁 Project Structure

```
resume-app/
├── client/                          # React Frontend
│   ├── public/
│   │   └── index.html               # HTML template with SEO meta tags
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.js        # Fixed navbar with dark mode toggle
│   │   │   │   ├── Footer.js        # Footer with admin link
│   │   │   │   └── useInView.js     # Intersection observer hook
│   │   │   └── sections/
│   │   │       ├── Hero.js          # Hero section (name, role, bio)
│   │   │       ├── About.js         # About me section
│   │   │       ├── Skills.js        # Skills with animated progress bars
│   │   │       ├── Projects.js      # Project cards with filter
│   │   │       ├── Experience.js    # Timeline experience section
│   │   │       ├── Education.js     # Education + Certifications
│   │   │       └── Contact.js       # Contact form with API
│   │   ├── context/
│   │   │   ├── AuthContext.js       # Authentication state (JWT)
│   │   │   └── ThemeContext.js      # Dark/Light mode state
│   │   ├── pages/
│   │   │   ├── HomePage.js          # Main portfolio page
│   │   │   ├── AdminLogin.js        # Admin login page
│   │   │   └── AdminDashboard.js    # Full CRUD admin panel
│   │   ├── utils/
│   │   │   └── api.js               # Axios API client + all endpoints
│   │   ├── App.js                   # Routes + providers
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Tailwind + custom styles
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
│
└── server/                          # Node/Express Backend
    ├── config/
    │   └── seed.js                  # Seeds initial admin user
    ├── controllers/
    │   ├── authController.js        # Login, getMe
    │   ├── userController.js        # Profile CRUD
    │   ├── projectController.js     # Projects CRUD
    │   ├── skillController.js       # Skills CRUD
    │   ├── experienceController.js  # Experience CRUD
    │   ├── educationController.js   # Education CRUD
    │   └── contactController.js     # Contact form + messages
    ├── middleware/
    │   └── auth.js                  # JWT protect + adminOnly
    ├── models/
    │   ├── User.js                  # Admin user + profile data
    │   ├── Project.js               # Portfolio projects
    │   ├── Skill.js                 # Technical skills
    │   ├── Experience.js            # Work experience
    │   ├── Education.js             # Academic history
    │   └── Message.js               # Contact form messages
    ├── routes/
    │   ├── auth.js                  # /api/auth/*
    │   ├── user.js                  # /api/user/*
    │   ├── projects.js              # /api/projects/*
    │   ├── skills.js                # /api/skills/*
    │   ├── experience.js            # /api/experience/*
    │   ├── education.js             # /api/education/*
    │   └── contact.js               # /api/contact/*
    ├── index.js                     # Server entry point
    ├── package.json
    └── .env.example
```

---

## 🛠️ API Routes Reference

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | /api/auth/login | Public | Admin login |
| GET | /api/auth/me | Private | Get current user |
| GET | /api/user/profile | Public | Get profile data |
| PUT | /api/user/profile | Admin | Update profile |
| GET | /api/projects | Public | List all projects |
| GET | /api/projects/:id | Public | Single project |
| POST | /api/projects | Admin | Create project |
| PUT | /api/projects/:id | Admin | Update project |
| DELETE | /api/projects/:id | Admin | Delete project |
| GET | /api/skills | Public | List all skills |
| POST | /api/skills | Admin | Add skill |
| PUT | /api/skills/:id | Admin | Update skill |
| DELETE | /api/skills/:id | Admin | Delete skill |
| GET | /api/experience | Public | List experience |
| POST | /api/experience | Admin | Add experience |
| PUT | /api/experience/:id | Admin | Update experience |
| DELETE | /api/experience/:id | Admin | Delete experience |
| GET | /api/education | Public | List education |
| POST | /api/education | Admin | Add education |
| PUT | /api/education/:id | Admin | Update education |
| DELETE | /api/education/:id | Admin | Delete education |
| POST | /api/contact | Public | Submit contact form |
| GET | /api/contact | Admin | View all messages |
| PUT | /api/contact/:id/read | Admin | Mark as read |
| DELETE | /api/contact/:id | Admin | Delete message |

---

## 📊 MongoDB Schemas

### User (Admin + Profile)
```js
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "admin" | "user",
  profileData: {
    fullName, tagline, bio, location, email, phone,
    github, linkedin, twitter, website, resumeUrl, avatarUrl
  }
}
```

### Project
```js
{
  title: String,
  description: String,
  imageUrl: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  featured: Boolean,
  category: "Web" | "Mobile" | "AI/ML" | "Other",
  order: Number
}
```

### Skill
```js
{
  name: String,
  level: Number (0–100),
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Mobile" | "Other",
  icon: String,
  order: Number
}
```

### Experience
```js
{
  company: String,
  position: String,
  type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract",
  location: String,
  startDate: Date,
  endDate: Date (null if current),
  current: Boolean,
  description: String,
  responsibilities: [String],
  technologies: [String],
  companyUrl: String
}
```

### Education
```js
{
  institution: String,
  degree: String,
  fieldOfStudy: String,
  startYear: Number,
  endYear: Number (null if current),
  current: Boolean,
  grade: String,
  description: String,
  institutionUrl: String
}
```

### Message (Contact)
```js
{
  name: String,
  email: String,
  subject: String,
  message: String,
  read: Boolean,
  replied: Boolean,
  ipAddress: String
}
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB Atlas account (free tier is fine)
- Git

### Step 1 — Clone the project
```bash
git clone <your-repo-url>
cd resume-app
```

### Step 2 — Set up the Backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` with your values:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume_db
JWT_SECRET=your_very_long_random_secret_key_here
ADMIN_EMAIL=admin@youremail.com
ADMIN_PASSWORD=YourSecurePassword123!
CLIENT_URL=http://localhost:3000
```

Start the backend:
```bash
npm run dev
```

✅ First run automatically seeds your admin account.

### Step 3 — Set up the Frontend

```bash
cd ../client
npm install
cp .env.example .env
```

Edit `client/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

### Step 4 — Login to Admin
- Go to: `http://localhost:3000/admin/login`
- Email: the ADMIN_EMAIL from your `.env`
- Password: the ADMIN_PASSWORD from your `.env`

---

## 🌐 Deployment Guide

### Backend → Render.com (Free)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add all Environment Variables from `server/.env`
6. Deploy — copy the URL (e.g., `https://your-app.onrender.com`)

### Frontend → Vercel (Free)

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Settings:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Environment Variables:
   - `REACT_APP_API_URL` = `https://your-app.onrender.com/api`
5. Deploy 🚀

### Post-Deployment

In your Render backend, update:
```env
CLIENT_URL=https://your-app.vercel.app
```

---

## ✨ Features Summary

**Frontend**
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Dark / Light mode toggle (saved to localStorage)
- ✅ Smooth scroll navigation with active section highlighting
- ✅ Framer Motion animations throughout
- ✅ Hero, About, Skills (progress bars), Projects (filterable cards)
- ✅ Experience (timeline), Education, Certifications, Contact form
- ✅ Download Resume button
- ✅ SEO-optimized HTML with Open Graph tags
- ✅ Mobile responsive design

**Backend**
- ✅ REST API with Express.js
- ✅ Full CRUD for Projects, Skills, Experience, Education
- ✅ JWT Authentication middleware
- ✅ Contact form saves to MongoDB + sends email notification
- ✅ Auto-seeds admin user on first run

**Admin Dashboard**
- ✅ Secure JWT-protected admin login
- ✅ Add/Edit/Delete Projects with image, tech tags, GitHub/live links
- ✅ Manage Skills with category and proficiency level
- ✅ Manage Work Experience with timeline and tech stack
- ✅ Manage Education history
- ✅ View and manage contact messages (mark read/delete)
- ✅ Edit full profile data (bio, links, avatar, resume URL)
- ✅ Stats overview dashboard

---

## 🎨 Customization Guide

1. **Colors**: Edit `tailwind.config.js` → `theme.extend.colors.primary`
2. **Fonts**: Update the Google Fonts link in `public/index.html`
3. **Certifications**: Edit the `SAMPLE_CERTS` array in `Education.js`
4. **Profile Data**: Log into `/admin` and edit the Profile tab
5. **SEO**: Update meta tags in `public/index.html`

---

## 📝 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS, Framer Motion |
| Routing | React Router v6 |
| API Client | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel (frontend) + Render (backend) |

---

*Built with ❤️ — MERN Stack Interactive Resume Application*
