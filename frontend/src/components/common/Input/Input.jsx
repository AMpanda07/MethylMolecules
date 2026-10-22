import { forwardRef } from 'react';
import './Input.css';

/**
 * Reusable Form Input component with label, error feedback, and slot addons.
 */
export const Input = forwardRef(
  (
    {
      label,
      id,
      name,
      type = 'text',
      value,
      onChange,
      placeholder,
      error,
      helperText,
      required = false,
      disabled = false,
      icon = null,
      rightElement = null,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`input-group ${error ? 'input-group--error' : ''} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label} {required && <span className="input-required">*</span>}
          </label>
        )}

        <div className="input-wrapper">
          {icon && <span className="input-icon-left">{icon}</span>}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`input-field ${icon ? 'input-field--with-left-icon' : ''} ${
              rightElement ? 'input-field--with-right-element' : ''
            }`}
            {...props}
          />
          {rightElement && <div className="input-right-element">{rightElement}</div>}
        </div>

        {error ? (
          <p className="input-feedback input-feedback--error" role="alert">
            {error}
          </p>
        ) : helperText ? (
          <p className="input-feedback input-feedback--helper">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
