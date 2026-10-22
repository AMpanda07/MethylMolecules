import './Button.css';
import Spinner from '../Spinner/Spinner';

/**
 * Reusable Button component supporting variants, sizes, icons, and loading states.
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  type = 'button',
  icon = null,
  className = '',
  onClick,
  ...props
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full-width' : '',
    isLoading ? 'btn--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <span className="btn__spinner-wrapper">
          <Spinner size="sm" color="currentColor" />
          <span className="btn__loading-text">{children}</span>
        </span>
      ) : (
        <>
          {icon && <span className="btn__icon">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
