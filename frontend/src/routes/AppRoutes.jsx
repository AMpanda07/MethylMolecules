import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { MainLayout } from '../components/layout/MainLayout';
import { ProtectedRoute } from '../components/routing/ProtectedRoute';
import { GuestRoute } from '../components/routing/GuestRoute';

// Page Views
import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Auth/Login';
import { Register } from '../pages/Auth/Register';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { NotFound } from '../pages/NotFound/NotFound';

/**
 * Centralized Application Routes configuration
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<Home />} />

        {/* Guest-only Routes (Redirect to /dashboard if logged in) */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        {/* Protected Routes (Redirect to /login if not authenticated) */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all 404 Route */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
