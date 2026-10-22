# 🧪 Methyl Orange — MERN Stack App

## Project Structure

```
Methyl Orange/
├── backend/                   # Express + MongoDB API
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── authController.js  # Auth logic (register, login, getMe)
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT protect & adminOnly guards
│   ├── models/
│   │   └── userModel.js       # Mongoose User schema
│   ├── routes/
│   │   └── authRoutes.js      # /api/auth routes
│   ├── utils/
│   │   └── asyncHandler.js    # Async error wrapper
│   ├── .env.example           # Environment variable template
│   ├── package.json
│   └── server.js              # Entry point
│
├── frontend/                  # React + Vite SPA
│   ├── public/                # Static public assets
│   ├── src/
│   │   ├── assets/            # Images, icons, fonts
│   │   ├── components/        # Modular UI components
│   │   │   ├── common/        # Atomic UI primitives (Button, Input, Card, Spinner, Alert)
│   │   │   ├── layout/        # Layout shells (Navbar, Footer, MainLayout)
│   │   │   └── routing/       # Route guards (ProtectedRoute, GuestRoute)
│   │   ├── constants/         # Route paths, API endpoints & storage keys
│   │   ├── context/           # React context providers (AuthContext, ToastContext)
│   │   ├── hooks/             # Custom hooks (useAuth, useToast, useLocalStorage, useFetch)
│   │   ├── pages/             # Route pages (Home, Login, Register, Dashboard, NotFound)
│   │   ├── routes/            # Central router config (AppRoutes.jsx)
│   │   ├── services/          # API layer with JWT interceptor (api.js, authService.js)
│   │   ├── utils/             # Helper functions (storage, validators)
│   │   ├── App.jsx            # App root wiring providers & routes
│   │   ├── index.css          # Design system tokens, typography & resets
│   │   └── main.jsx           # React entry point
│   ├── jsconfig.json          # IDE path alias configuration (@/*)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js         # Vite config with @ alias & API proxy
│
├── .gitignore
├── package.json               # Root: concurrently dev script
└── README.md
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# Install all (root + backend + frontend)
npm run install:all
```

Or manually:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Set Up Environment Variables

```bash
cp backend/.env.example backend/.env
```
Edit `backend/.env` with your MongoDB URI and JWT secret.

### 3. Run in Development

```bash
# From root — runs backend (port 5000) + frontend (port 3000) simultaneously
npm run dev
```

Or individually:
```bash
npm run dev:backend
npm run dev:frontend
```

## 🛠 Tech Stack

| Layer     | Technology          |
|-----------|---------------------|
| Frontend  | React 18, Vite, React Router v6, Axios |
| Backend   | Express.js, Node.js |
| Database  | MongoDB, Mongoose   |
| Auth      | JWT, bcryptjs       |
