import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button/Button';
import { ROUTES } from '../../constants/routes';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container not-found__container">
        <span className="not-found__code">404</span>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__description">
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </p>
        <Link to={ROUTES.HOME}>
          <Button variant="primary" size="md">
            &larr; Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
