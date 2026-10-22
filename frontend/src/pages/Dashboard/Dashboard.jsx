import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Button } from '../../components/common/Button/Button';
import { Card } from '../../components/common/Card/Card';
import { Alert } from '../../components/common/Alert/Alert';
import authService from '../../services/authService';
import './Dashboard.css';

export const Dashboard = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [testingApi, setTestingApi] = useState(false);
  const [apiResult, setApiResult] = useState(null);

  const handleTestApi = async () => {
    setTestingApi(true);
    setApiResult(null);
    try {
      const response = await authService.getMe();
      setApiResult({
        success: true,
        data: response,
      });
      toast.success('API test successful! JWT verified by server.');
    } catch (err) {
      setApiResult({
        success: false,
        error: err.message,
      });
      toast.error(`API test failed: ${err.message}`);
    } finally {
      setTestingApi(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container dashboard__container">
        <header className="dashboard__header">
          <div>
            <h1 className="dashboard__title">Dashboard</h1>
            <p className="dashboard__subtitle">
              Welcome to your authenticated workspace, <strong>{user?.name}</strong>.
            </p>
          </div>
          <div className="dashboard__status-badge">
            <span className="dashboard__status-dot"></span>
            Authenticated
          </div>
        </header>

        <div className="dashboard__grid">
          {/* User Profile Card */}
          <Card>
            <Card.Header>
              <Card.Title>User Profile</Card.Title>
              <Card.Description>Verified session credentials</Card.Description>
            </Card.Header>
            <Card.Body>
              <div className="profile-details">
                <div className="profile-field">
                  <span className="profile-field__label">Full Name</span>
                  <span className="profile-field__value">{user?.name || 'N/A'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field__label">Email</span>
                  <span className="profile-field__value">{user?.email || 'N/A'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field__label">Role</span>
                  <span className="profile-field__badge">{user?.role || 'user'}</span>
                </div>
                <div className="profile-field">
                  <span className="profile-field__label">User ID</span>
                  <span className="profile-field__mono">{user?.id || user?._id || 'N/A'}</span>
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="secondary"
                size="sm"
                isLoading={testingApi}
                onClick={handleTestApi}
              >
                Test JWT Verification (/api/auth/me)
              </Button>
            </Card.Footer>
          </Card>

          {/* Architecture & Extension Checklist */}
          <Card>
            <Card.Header>
              <Card.Title>Developer Extensibility Guide</Card.Title>
              <Card.Description>How to quickly modify and scale this frontend</Card.Description>
            </Card.Header>
            <Card.Body>
              <ul className="guide-list">
                <li className="guide-item">
                  <strong>Add New Route:</strong> Register path in <code>constants/routes.js</code> and map view in <code>routes/AppRoutes.jsx</code>.
                </li>
                <li className="guide-item">
                  <strong>Create Services:</strong> Create <code>services/yourService.js</code> using <code>API.get/post</code>; JWT is auto-injected.
                </li>
                <li className="guide-item">
                  <strong>UI Primitives:</strong> Add or customize shared atomic elements in <code>components/common/</code>.
                </li>
                <li className="guide-item">
                  <strong>State & Context:</strong> Create custom providers in <code>context/</code> and expose friendly hooks in <code>hooks/</code>.
                </li>
              </ul>
            </Card.Body>
          </Card>
        </div>

        {apiResult && (
          <div className="dashboard__api-result">
            {apiResult.success ? (
              <Alert
                type="success"
                title="API Verification Succeeded"
                message="Successfully communicated with protected backend endpoint."
                onClose={() => setApiResult(null)}
              />
            ) : (
              <Alert
                type="error"
                title="API Verification Failed"
                message={apiResult.error}
                onClose={() => setApiResult(null)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
