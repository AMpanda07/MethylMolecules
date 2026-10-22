import { useState, useCallback } from 'react';
import './Toast.css';
import { ToastContext } from './toast-context';

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = 'info', message, duration = 4000 }) => {
      const id = Date.now() + Math.random().toString(36).substr(2, 5);
      const newToast = { id, type, message };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
      return id;
    },
    [removeToast]
  );

  const toast = {
    info: (msg, duration) => addToast({ type: 'info', message: msg, duration }),
    success: (msg, duration) => addToast({ type: 'success', message: msg, duration }),
    error: (msg, duration) => addToast({ type: 'error', message: msg, duration }),
    warning: (msg, duration) => addToast({ type: 'warning', message: msg, duration }),
    remove: removeToast,
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((item) => (
          <div key={item.id} className={`toast-item toast-item--${item.type}`}>
            <span className="toast-item__message">{item.message}</span>
            <button
              type="button"
              className="toast-item__close"
              onClick={() => removeToast(item.id)}
              aria-label="Close notification"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

