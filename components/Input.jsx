/**
 * Input Component - Modern Form Input
 *
 * Features:
 * - 4 variants: default, filled, outline, underline
 * - 5 sizes: xs, sm, md, lg, xl
 * - States: default, error, success, disabled
 * - Icon support (left/right)
 * - Helper text and error messages
 * - Full accessibility (ARIA 1.3)
 * - RTL support
 * - Forward ref
 *
 * @component
 * @example
 * <Input
 *   type="text"
 *   placeholder="Enter text"
 *   leftIcon={<SearchIcon />}
 *   helperText="Helper text"
 * />
 */

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Input = forwardRef(
  (
    {
      variant = 'default',
      size = 'md',
      error = false,
      success = false,
      disabled = false,
      leftIcon,
      rightIcon,
      helperText,
      errorText,
      label,
      className = '',
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: `
        bg-[var(--color-background)]
        border border-[var(--color-input)]
        focus-visible:border-[var(--color-primary)]
        focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20
      `,
      filled: `
        bg-[var(--color-muted)]
        border-0 border-b-2 border-[var(--color-border)]
        focus-visible:border-[var(--color-primary)]
        focus-visible:bg-[var(--color-background)]
        rounded-t-lg rounded-b-none
      `,
      outline: `
        bg-transparent
        border-2 border-[var(--color-border)]
        focus-visible:border-[var(--color-primary)]
        focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20
      `,
      underline: `
        bg-transparent
        border-0 border-b-2 border-[var(--color-border)]
        focus-visible:border-[var(--color-primary)]
        rounded-none px-0
      `,
    };

    const sizeClasses = {
      xs: 'h-8 px-2 text-xs',
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 text-base',
      lg: 'h-12 px-5 text-lg',
      xl: 'h-14 px-6 text-xl',
    };

    const stateClasses = error
      ? 'border-[var(--color-error-500)] focus-visible:border-[var(--color-error-500)] focus-visible:ring-[var(--color-error-500)]/20'
      : success
      ? 'border-[var(--color-success-500)] focus-visible:border-[var(--color-success-500)] focus-visible:ring-[var(--color-success-500)]/20'
      : '';

    const iconSizes = {
      xs: 14,
      sm: 16,
      md: 18,
      lg: 20,
      xl: 22,
    };

    const renderIcon = (icon) => {
      if (!icon) return null;
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon, {
          size: iconSizes[size],
          'aria-hidden': true,
        });
      }
      return icon;
    };

    return (
      <div className="w-full">
        {label && (
          <label
            className={cn(
              'block text-sm font-medium mb-1.5',
              disabled ? 'opacity-50' : '',
              error ? 'text-[var(--color-error-600)]' : ''
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute start-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]">
              {renderIcon(leftIcon)}
            </div>
          )}
          <input
            ref={ref}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={
              error && errorText
                ? 'error-text'
                : helperText
                ? 'helper-text'
                : undefined
            }
            className={cn(
              'w-full rounded-lg',
              'text-[var(--color-foreground)]',
              'placeholder:text-[var(--color-muted-foreground)]',
              'transition-all duration-200',
              'motion-reduce:transition-none',
              'focus:outline-none',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              variantClasses[variant],
              sizeClasses[size],
              stateClasses,
              leftIcon && 'ps-10',
              rightIcon && 'pe-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute end-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]">
              {renderIcon(rightIcon)}
            </div>
          )}
        </div>
        {error && errorText && (
          <p
            id="error-text"
            className="mt-1.5 text-sm text-[var(--color-error-600)]"
            role="alert"
          >
            {errorText}
          </p>
        )}
        {!error && helperText && (
          <p
            id="helper-text"
            className="mt-1.5 text-sm text-[var(--color-muted-foreground)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
