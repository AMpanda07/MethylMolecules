import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button/Button';
import { Card } from '../../components/common/Card/Card';
import { ROUTES } from '../../constants/routes';
import './Home.css';

export const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: '🧩',
      title: 'Atomic & Reusable Components',
      description:
        'Self-contained, type-flexible UI primitives (Buttons, Inputs, Cards, Loaders, Alerts) configured for high reusability.',
    },
    {
      icon: '🔐',
      title: 'JWT Auth & Route Guards',
      description:
        'Preconfigured AuthContext, secure local token storage, Axios interceptors, ProtectedRoute, and GuestRoute guards.',
    },
    {
      icon: '🌐',
      title: 'Modular Service Layer',
      description:
        'Clean separation between UI views and backend API communication with automatic error normalization.',
    },
    {
      icon: '⚡',
      title: 'Fast Developer Experience',
      description:
        'Built with Vite 5, React 18, React Router v6, path aliases (@/), and CSS variable design tokens.',
    },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero__container">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            Modular Frontend Architecture Ready
          </div>
          <h1 className="hero__title">
            Build Scalable React Apps with <span className="hero__highlight">Methyl Orange</span>
          </h1>
          <p className="hero__subtitle">
            A production-ready, clean-slate frontend architecture designed for reusability, easy
            modifications, and seamless full-stack MERN integration.
          </p>

          <div className="hero__actions">
            {isAuthenticated ? (
              <Link to={ROUTES.DASHBOARD}>
                <Button size="lg" variant="primary">
                  Go to Dashboard ({user?.name || 'User'}) &rarr;
                </Button>
              </Link>
            ) : (
              <>
                <Link to={ROUTES.REGISTER}>
                  <Button size="lg" variant="primary">
                    Create Account
                  </Button>
                </Link>
                <Link to={ROUTES.LOGIN}>
                  <Button size="lg" variant="secondary">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-section__header">
            <h2 className="features-section__title">Architecture Highlights</h2>
            <p className="features-section__subtitle">
              Engineered so you can add features, update themes, or modify APIs in seconds.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, idx) => (
              <Card key={idx} className="feature-card">
                <Card.Body>
                  <div className="feature-card__icon">{feature.icon}</div>
                  <Card.Title as="h3">{feature.title}</Card.Title>
                  <Card.Description>{feature.description}</Card.Description>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
