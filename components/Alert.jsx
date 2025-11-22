/**
 * Alert Component - Compound Component Pattern
 *
 * Features:
 * - 5 variants: info, success, warning, error, neutral
 * - Compound components: Alert, AlertTitle, AlertDescription
 * - Dismissible
 * - Icon support
 * - ARIA live regions
 * - RTL support
 *
 * @component
 * @example
 * <Alert variant="success">
 *   <AlertTitle>Success!</AlertTitle>
 *   <AlertDescription>Your action was completed.</AlertDescription>
 * </Alert>
 */

import React, { forwardRef } from 'react';
import { Info, Check, AlertTriangle, X as XIcon, Bell } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * Alert component
 *
 * @typedef {Object} AlertProps
 * @property {'info' | 'success' | 'warning' | 'error' | 'neutral'} [variant='info'] - Alert variant
 * @property {React.ReactNode} [icon] - Custom icon
 * @property {Function} [onClose] - Close handler
 * @property {string} [className] - Additional CSS classes
 */
const Alert = forwardRef(
  (
    {
      children,
      variant = 'info',
      icon,
      onClose,
      className = '',
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      info: `
        bg-[var(--color-info-50)] dark:bg-[var(--color-info-900)]/30
        text-[var(--color-info-800)] dark:text-[var(--color-info-200)]
        border-[var(--color-info-200)] dark:border-[var(--color-info-800)]
      `,
      success: `
        bg-[var(--color-success-50)] dark:bg-[var(--color-success-900)]/30
        text-[var(--color-success-800)] dark:text-[var(--color-success-200)]
        border-[var(--color-success-200)] dark:border-[var(--color-success-800)]
      `,
      warning: `
        bg-[var(--color-warning-50)] dark:bg-[var(--color-warning-900)]/30
        text-[var(--color-warning-800)] dark:text-[var(--color-warning-200)]
        border-[var(--color-warning-200)] dark:border-[var(--color-warning-800)]
      `,
      error: `
        bg-[var(--color-error-50)] dark:bg-[var(--color-error-900)]/30
        text-[var(--color-error-800)] dark:text-[var(--color-error-200)]
        border-[var(--color-error-200)] dark:border-[var(--color-error-800)]
      `,
      neutral: `
        bg-[var(--color-muted)]
        text-[var(--color-foreground)]
        border-[var(--color-border)]
      `,
    };

    const defaultIcons = {
      info: <Info size={20} aria-hidden="true" />,
      success: <Check size={20} aria-hidden="true" />,
      warning: <AlertTriangle size={20} aria-hidden="true" />,
      error: <XIcon size={20} aria-hidden="true" />,
      neutral: <Bell size={20} aria-hidden="true" />,
    };

    const iconToShow = icon || defaultIcons[variant];

    // Determine ARIA role and live region (WCAG 3.0 / ARIA 1.3)
    const role = variant === 'error' ? 'alert' : 'status';
    const ariaLive = variant === 'error' ? 'assertive' : 'polite';

    return (
      <div
        ref={ref}
        role={role}
        aria-live={ariaLive}
        aria-atomic="true"
        className={cn(
          'relative flex gap-3 p-4 rounded-lg border-s-4',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {iconToShow && (
          <div className="flex-shrink-0 mt-0.5">
            {iconToShow}
          </div>
        )}
        <div className="flex-1 space-y-1">
          {children}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md',
              'hover:bg-black/5 dark:hover:bg-white/5',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              'transition-colors duration-150',
              'motion-reduce:transition-none'
            )}
            aria-label="Close alert"
          >
            <XIcon size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

/**
 * Alert Title component
 */
const AlertTitle = forwardRef(
  ({ children, className = '', ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('font-bold text-base leading-tight', className)}
      {...props}
    >
      {children}
    </h5>
  )
);

AlertTitle.displayName = 'AlertTitle';

/**
 * Alert Description component
 */
const AlertDescription = forwardRef(
  ({ children, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm leading-relaxed opacity-90', className)}
      {...props}
    >
      {children}
    </div>
  )
);

AlertDescription.displayName = 'AlertDescription';

export default Alert;
export { Alert, AlertTitle, AlertDescription };
