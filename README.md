# EduPrime Coaching Institute — Full Stack Website

A premium, modern coaching institute website built with React + Node.js + MongoDB.

## Project Structure

```
coaching-frontend/   → React + Vite + Tailwind CSS frontend
coaching-backend/    → Node.js + Express + MongoDB backend
```

## Quick Start

### 1. Setup Backend

```bash
cd coaching-backend
cp .env.example .env
# Edit .env with your MongoDB URI and Cloudinary credentials
npm install
npm run dev
```

### 2. Setup Frontend

```bash
cd coaching-frontend
npm install
npm run dev
```

### 3. Access the App

| URL | Description |
|-----|-------------|
| http://localhost:5173 | Public website |
| http://localhost:5173/admin/login | Admin panel |
| http://localhost:5000/api/health | Backend health check |

### Default Admin Credentials
- **Email:** admin@coaching.com
- **Password:** Admin@123

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, About, Courses, Stats, Testimonials, Gallery, Contact |
| Founder | `/founder` | Founder bio, vision, mission, message |
| Notes | `/notes` | Study materials with search & filter |
| Achievements | `/achievements` | Student results with cards |
| Videos | `/videos` | YouTube classes & live streams |
| Contact | `/contact` | Contact form + Google Maps |
| Admin | `/admin` | Secure dashboard |

## Admin Features

- ✅ JWT Authentication
- ✅ Manage Achievements (add/edit/delete with photo upload)
- ✅ Upload Study Notes (PDF/DOC via Cloudinary)
- ✅ Add YouTube Videos
- ✅ Manage Gallery
- ✅ View & Reply to Contact Messages
- ✅ Edit Site Settings (founder info, stats, social links)

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS v4, Framer Motion, React Router v6, Lucide Icons, React Hot Toast, React CountUp

**Backend:** Node.js, Express, MongoDB + Mongoose, JWT, Bcrypt, Cloudinary, Multer

## Environment Variables (Backend)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/coaching_institute
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_EMAIL=admin@coaching.com
ADMIN_PASSWORD=Admin@123
CLIENT_URL=http://localhost:5173
```

## Features

- 🌙 Dark/Light mode toggle
- 📱 Mobile-first responsive design
- ✨ Smooth Framer Motion animations
- 🔢 Animated statistics counters
- 💬 WhatsApp floating button
- 🔍 Search & filter for notes and videos
- 🖼️ Gallery with lightbox
- 📹 YouTube video embed with modal player
- 🔴 Live class indicator
- 🏆 Achievement cards with hover effects
- 🔒 Protected admin routes
