import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Button } from '../../components/common/Button/Button';
import { Input } from '../../components/common/Input/Input';
import { Card } from '../../components/common/Card/Card';
import { Alert } from '../../components/common/Alert/Alert';
import { validateEmail, validatePassword, validateName } from '../../utils/validators';
import { ROUTES } from '../../constants/routes';
import './Auth.css';

export const Register = () => {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (serverError) setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};
    const nameErr = validateName(formData.name);
    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password);

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setServerError('');

    try {
      const { name, email, password } = formData;
      const result = await register({ name, email, password });
      toast.success(`Account created! Welcome, ${result.user?.name || 'User'}!`);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card" elevated>
        <Card.Header>
          <Card.Title as="h2">Create Account</Card.Title>
          <Card.Description>Sign up to start using the Methyl Orange platform</Card.Description>
        </Card.Header>

        <Card.Body>
          {serverError && (
            <Alert
              type="error"
              message={serverError}
              onClose={() => setServerError('')}
            />
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Ada Lovelace"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              autoComplete="name"
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="ada@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText="Must be at least 6 characters"
              required
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={submitting}
              style={{ marginTop: '0.5rem' }}
            >
              Register
            </Button>
          </form>
        </Card.Body>

        <Card.Footer>
          <p className="auth-footer-text">
            Already have an account?
            <Link to={ROUTES.LOGIN}>Sign in</Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Register;
