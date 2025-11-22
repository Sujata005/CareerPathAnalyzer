

# Career Path Analyser

A simple full-stack web app that helps users identify missing skills for a selected career role, generates a basic 3-phase learning roadmap, and displays the latest tech news from HackerNews.

This project was built as part of the Full Stack Developer Assignment.

---

## 🚀 Features

- Enter a target role + your current skills
- Backend analyses:
  - Matched skills
  - Missing skills
  - Recommended learning order
- Generates a mock 3-phase career roadmap
- Fetches the top 5 latest HackerNews tech stories
- Clean, responsive UI

---

## 🛠️ Tech Stack

**Frontend:** React, Axios, CSS  
**Backend:** Node.js, Express.js, Axios  
**Deployment:** Vercel (frontend) + Render (backend)

---

## 📁 Project Structure

```
project/
 ├── backend/
 │   ├── server.js
 │   └── data/predefinedSkills.json
 └── frontend/
     ├── src/
     └── public/
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
npm start
```

Runs at:  
http://localhost:5000

Test endpoint:  
http://localhost:5000/api/hackernews/top5

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs at:  
http://localhost:3000

Make sure your frontend points to the backend:

Create `.env` in `/frontend`:

```
REACT_APP_BACKEND_URL=http://localhost:5000
```

---

## 🌐 Deployment Notes

### Backend (Render)
- Root Directory: backend
- Build Command: npm install
- Start Command: npm start

### Frontend (Vercel)
- Root Directory: frontend
- Build Command: npm run build
- Output: build
- Add env variable:

```
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```

---

## ✔️ Done
You're ready to run, test, and deploy the project.
