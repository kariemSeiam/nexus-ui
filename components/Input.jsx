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

    // Input heights following iOS HIG & Material Design 3 standards
    // Font size minimum 16px to prevent iOS zoom
    const sizeClasses = {
      xs: 'h-8 px-3 text-[var(--text-sm)]',                       // 32px height, 14px text
      sm: 'h-[var(--input-height-sm)] px-3 text-[var(--text-sm)]', // 36px height, 14px text
      md: 'h-[var(--input-height-md)] px-4 text-[var(--text-base)]', // 40px height, 16px text (prevents iOS zoom)
      lg: 'h-[var(--input-height-lg)] px-5 text-[var(--text-base)]', // 48px height, 16px text
      xl: 'h-[var(--input-height-xl)] px-6 text-[var(--text-md)]',   // 56px height, 18px text
    };

    const stateClasses = error
      ? 'border-[var(--color-error-500)] focus-visible:border-[var(--color-error-500)] focus-visible:ring-[var(--color-error-500)]/20'
      : success
      ? 'border-[var(--color-success-500)] focus-visible:border-[var(--color-success-500)] focus-visible:ring-[var(--color-success-500)]/20'
      : '';

    // Icon sizes following icon size tokens
    const iconSizes = {
      xs: 12,  // --icon-xs
      sm: 16,  // --icon-sm
      md: 16,  // --icon-sm
      lg: 20,  // --icon-md
      xl: 24,  // --icon-lg
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
      <div className="w-full max-w-[var(--content-sm)]">
        {label && (
          <label
            className={cn(
              'block text-[var(--text-sm)] font-medium mb-2',
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
            className="mt-2 text-[var(--text-xs)] text-[var(--color-error-600)]"
            role="alert"
          >
            {errorText}
          </p>
        )}
        {!error && helperText && (
          <p
            id="helper-text"
            className="mt-2 text-[var(--text-xs)] text-[var(--color-muted-foreground)]"
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
