/**
 * Toast Component - Toast Notifications
 *
 * Features:
 * - 4 variants: default, success, warning, error
 * - 4 positions: top-left, top-right, bottom-left, bottom-right
 * - Auto-dismiss with customizable duration
 * - Close button
 * - Icon support
 * - Action button
 * - Stacking support
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Compound component pattern with provider
 *
 * @component
 * @example
 * // Provider at app root
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // Usage with hook
 * const { showToast } = useToast();
 * showToast({ title: 'Success!', variant: 'success' });
 *
 * // Or direct usage
 * <Toast variant="success" title="Success!" description="Action completed" />
 */

import React, { createContext, useContext, forwardRef, useState, useEffect, useCallback } from 'react';
import { cn } from '../lib/utils';

const ToastContext = createContext({});

const ToastProvider = ({ children, position = 'bottom-right', maxToasts = 5 }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(
    (toast) => {
      const id = Math.random().toString(36).substring(7);
      const newToast = { id, ...toast };

      setToasts((prev) => {
        const updated = [newToast, ...prev];
        return updated.slice(0, maxToasts);
      });

      return id;
    },
    [maxToasts]
  );

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <ToastViewport position={position}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onDismiss={() => dismissToast(toast.id)} />
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

const ToastViewport = forwardRef(
  ({ position = 'bottom-right', className = '', children, ...props }, ref) => {
    const positionClasses = {
      'top-left': 'top-4 left-4 items-start',
      'top-right': 'top-4 right-4 items-end',
      'bottom-left': 'bottom-4 left-4 items-start',
      'bottom-right': 'bottom-4 right-4 items-end',
      'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
      'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'fixed z-[100] flex flex-col gap-2 p-4 pointer-events-none',
          'max-w-[420px]',
          positionClasses[position],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ToastViewport.displayName = 'ToastViewport';

const Toast = forwardRef(
  (
    {
      variant = 'default',
      title,
      description,
      icon,
      action,
      duration = 5000,
      closeable = true,
      onDismiss,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onDismiss?.(), 300);
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, onDismiss]);

    const variantClasses = {
      default: 'border-[var(--color-border)] bg-[var(--color-background)]',
      success: 'border-[var(--color-success-500)] bg-[var(--color-success-50)]',
      warning: 'border-[var(--color-warning-500)] bg-[var(--color-warning-50)]',
      error: 'border-[var(--color-error-500)] bg-[var(--color-error-50)]',
      info: 'border-[var(--color-primary)] bg-[var(--color-primary)]/10',
    };

    const variantIcons = {
      success: (
        <svg className="w-5 h-5 text-[var(--color-success-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      warning: (
        <svg className="w-5 h-5 text-[var(--color-warning-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      error: (
        <svg className="w-5 h-5 text-[var(--color-error-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      info: (
        <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };

    const displayIcon = icon || (variant !== 'default' ? variantIcons[variant] : null);

    const ariaLive = variant === 'error' ? 'assertive' : 'polite';

    return (
      <div
        ref={ref}
        role="status"
        aria-live={ariaLive}
        aria-atomic="true"
        className={cn(
          'pointer-events-auto',
          'relative flex gap-3 p-4 rounded-lg',
          'border-s-4 shadow-lg',
          'transition-all duration-300',
          'motion-reduce:transition-none',
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {displayIcon && (
          <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
            {displayIcon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold text-sm mb-1">
              {title}
            </div>
          )}
          {description && (
            <div className="text-sm text-[var(--color-muted-foreground)]">
              {description}
            </div>
          )}
          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>

        {closeable && (
          <button
            type="button"
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onDismiss?.(), 300);
            }}
            className={cn(
              'flex-shrink-0 min-w-[44px] min-h-[44px]',
              'flex items-center justify-center',
              'rounded-md -m-2',
              'text-[var(--color-muted-foreground)]',
              'hover:text-[var(--color-foreground)]',
              'hover:bg-black/5',
              'transition-colors duration-200',
              'motion-reduce:transition-none',
              'focus-visible:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-[var(--color-primary)]'
            )}
            aria-label="Close notification"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export { ToastProvider, useToast, ToastViewport, Toast };
export default Toast;
