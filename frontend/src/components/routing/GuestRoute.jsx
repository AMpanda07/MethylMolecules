import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Spinner } from '../common/Spinner/Spinner';
import { ROUTES } from '../../constants/routes';

/**
 * Guard for guest-only pages (e.g. Login, Register).
 * Redirects already authenticated users to the dashboard.
 */
export const GuestRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner fullPage />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children ? children : <Outlet />;
};

export default GuestRoute;
