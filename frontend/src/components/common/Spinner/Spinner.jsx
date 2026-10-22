import './Spinner.css';

/**
 * Reusable Loading Spinner
 */
export const Spinner = ({ size = 'md', color, fullPage = false, label }) => {
  const spinnerElement = (
    <div
      className={`spinner spinner--${size}`}
      style={color ? { borderTopColor: color } : undefined}
      role="status"
      aria-label={label || 'Loading'}
    />
  );

  if (fullPage) {
    return (
      <div className="spinner-fullpage">
        {spinnerElement}
        {label && <p className="spinner-fullpage__label">{label}</p>}
      </div>
    );
  }

  return spinnerElement;
};

export default Spinner;
