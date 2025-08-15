# <div align="center">FullStack Todo App</div>

<p align="center">
  <em>A sophisticated todo application with JWT authentication, Neon database, and elegant UI</em>
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

- **Secure authentication** with JWT tokens
- **Full CRUD operations** for todos
- **Elegant UI** with dark theme
- **Real-time updates** with Zustand state management
- **Persistent sessions** via LocalStorage

---

## 🛠 Tech Stack

| Layer          | Technology        |
|----------------|-------------------|
| **Frontend**   | React + TypeScript|
| **Styling**    | Tailwind CSS      |
| **Backend**    | Node.js + Express |
| **Database**   | PostgreSQL (Neon) |
| **ORM**        | Prisma           |
| **Auth**       | JWT              |

---

## 🚀 Quick Start

1. **Install dependencies**
```bash
npm install
cd server && npm install
cd client && npm install
```

2. **Set up database**
```bash
cd server
npx prisma generate
npx prisma migrate dev
echo "DATABASE_URL=your_neon_url\nJWT_SECRET=your_secret" > .env
```

3. **Run applications (from root directory)**
```bash
# Backend
npm run server

# Frontend (in another terminal)
npm run client
```
