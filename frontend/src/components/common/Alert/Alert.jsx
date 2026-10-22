import './Alert.css';

/**
 * Reusable Alert banner for status messages and errors
 */
export const Alert = ({
  type = 'info',
  title,
  message,
  children,
  onClose,
  icon,
  className = '',
}) => {
  const defaultIcons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '⚠️',
  };

  return (
    <div className={`alert alert--${type} ${className}`} role="alert">
      <div className="alert__icon">{icon || defaultIcons[type]}</div>
      <div className="alert__content">
        {title && <h4 className="alert__title">{title}</h4>}
        <div className="alert__message">{message || children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          className="alert__close-btn"
          onClick={onClose}
          aria-label="Dismiss alert"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
