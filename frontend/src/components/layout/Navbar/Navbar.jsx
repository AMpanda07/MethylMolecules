import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../hooks/useToast';
import { Button } from '../../common/Button/Button';
import { ROUTES } from '../../../constants/routes';
import './Navbar.css';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.info('You have been logged out.');
    navigate(ROUTES.LOGIN);
    setMobileMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__container">
        <Link to={ROUTES.HOME} className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__logo">🧪</span>
          <span className="navbar__title">Methyl Orange</span>
        </Link>

        {/* Mobile menu hamburger */}
        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
        </button>

        {/* Navigation links & actions */}
        <nav className={`navbar__nav ${mobileMenuOpen ? 'navbar__nav--open' : ''}`}>
          <div className="navbar__links">
            <NavLink
              to={ROUTES.HOME}
              end
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to={ROUTES.DASHBOARD}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
            )}
          </div>

          <div className="navbar__actions">
            {isAuthenticated ? (
              <div className="navbar__user-section">
                <span className="navbar__user-greeting">
                  Hello, <strong>{user?.name || 'User'}</strong>
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="navbar__auth-buttons">
                <Link to={ROUTES.LOGIN} onClick={closeMenu}>
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER} onClick={closeMenu}>
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
