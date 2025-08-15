# <div align="center">✨ FullStack Todo App ✨</div>

<p align="center">
  <em>Todo List • JWT Auth • Neon DB • Elegant UI</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=flat" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=flat" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwind-css&logoColor=white&style=flat" />
  <img src="https://img.shields.io/badge/Zustand-FFC107?style=flat" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white&style=flat" />
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=flat" />
  <img src="https://img.shields.io/badge/Neon_PostgreSQL-008080?logo=postgresql&logoColor=white&style=flat" />
  <img src="https://img.shields.io/badge/JWT-black?logo=json-web-tokens&style=flat" />
  <img src="https://img.shields.io/badge/LocalStorage-FFA500?style=flat" />
</p>

---

## ✨ Features

✅ **JWT Authentication** - Secure login/register system  
✅ **CRUD Todos** - Full create, read, update, delete functionality  
✅ **Timestamps** - Created & last updated tracking  
✅ **User Profile Display** - Name + avatar next to logout  
✅ **Zustand Global State** - Instant UI updates  
✅ **Persistent Sessions** - LocalStorage magic  
✅ **Dark & Minimal UI** - Clean TailwindCSS design  

---

## 🛠 Tech Map

| Layer           | Tech Used                                     |
| --------------- | --------------------------------------------- |
| **Frontend**    | React, Vite, TypeScript, TailwindCSS, Zustand |
| **Backend**     | Node.js, Express, Prisma                      |
| **Database**    | Neon PostgreSQL (Cloud-hosted)                |
| **Auth**        | JWT, bcrypt                                   |
| **Persistence** | LocalStorage                                  |

---

## 🔌 Backend API Overview (Deployed on Render)

* `POST /api/auth/register` – Create new user
* `POST /api/auth/login` – Authenticate & return token
* `GET /api/todos` – Fetch all todos (auth required)
* `POST /api/todos` – Create a todo
* `PUT /api/todos/:id` – Edit title / check status
* `DELETE /api/todos/:id` – Delete todo

> **Middleware:** Token verification with JWT & Express middleware for protected routes.

---

## 🎨 UI Highlights

* **Edit Modal** with live check/uncheck & title update
* **Created / Updated Dates** visible on each todo
* **User Info in Header**: Avatar + Name next to Logout
* **Responsive Design** for all screen sizes

---

## 🚀 Quick Start

```bash
# 1️⃣ Install deps
npm install
cd server && npm install
cd client && npm install

# 2️⃣ Setup DB
cd server
npx prisma generate
npx prisma migrate dev
echo "DATABASE_URL=your_neon_url\nJWT_SECRET=your_secret" > .env

# 3️⃣ Run apps (root directory)
npm run server  # backend
npm run client  # frontend
```
