# 🧪 Methyl Orange — Project Plan & Architecture

## 1. Project Overview
Full-stack MERN (MongoDB, Express, React, Node.js) web application structured with modular boundaries, scalable folder structures, and maintainable conventions.

---

## 2. Frontend Architecture (`/frontend`)

### 📁 Directory Layout
```
frontend/src/
├── assets/                  # Static media, icons, graphics
├── components/              # Component hierarchy
│   ├── common/              # Atomic UI primitives (Button, Input, Card, Spinner, Alert)
│   ├── layout/              # Structural shells (Navbar, Footer, MainLayout)
│   └── routing/             # Navigation guards (ProtectedRoute, GuestRoute)
├── constants/               # Centralized constants (ROUTES, API_ENDPOINTS, STORAGE_KEYS)
├── context/                 # Global state providers (AuthContext, ToastContext)
├── hooks/                   # Custom reusable hooks (useAuth, useToast, useLocalStorage, useFetch)
├── pages/                   # Route views (Home, Login, Register, Dashboard, NotFound)
├── routes/                  # Central router configuration (AppRoutes.jsx)
├── services/                # API client & domain services (api.js, authService.js)
├── utils/                   # Pure utility functions (storage, validators)
├── App.jsx                  # Root component wiring providers
├── index.css                # Global CSS design tokens, reset, typography
└── main.jsx                 # Entry point
```

### ⚙️ Design & Modifiability Principles
1. **Atomic UI Primitives (`components/common`)**: Agnostic to business logic; styled with CSS variables and parameterized with clean props (`variant`, `size`, `isLoading`, `error`).
2. **Encapsulated API Communication (`services/`)**: Central Axios instance with automated Bearer token injection and centralized 401 Unauthorized handling.
3. **Decoupled State Management (`context/` & `hooks/`)**: `AuthContext` and `ToastContext` expose ergonomic hooks (`useAuth`, `useToast`) so components remain lean.
4. **Declarative Route Guards (`components/routing/`)**: `ProtectedRoute` and `GuestRoute` handle auth redirects consistently.
5. **Path Aliasing**: Configured `@/` alias mapped directly to `/src` for maintainable imports.

---

## 3. Backend Architecture (`/backend`)
- **Server**: Express.js with CORS, JSON body parser, and error handling.
- **Database**: MongoDB with Mongoose connection pooling.
- **Auth**: JWT-based authentication with bcrypt password hashing.
- **Endpoints**:
  - `POST /api/auth/register` — Create new user
  - `POST /api/auth/login` — Sign in user & issue token
  - `GET /api/auth/me` — Protected profile retrieval

---

## 4. Next Steps
- [x] Initial frontend scaffold & re-usable atomic component library
- [x] Context & custom hooks (Auth, Toast, Storage, Fetch)
- [x] Central routing with ProtectedRoute and GuestRoute
- [x] Responsive layout with Navbar and Footer
- [x] Test production build verification
- [ ] Connect additional domain features & backend models as project scope grows

