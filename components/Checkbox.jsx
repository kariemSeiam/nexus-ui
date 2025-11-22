/**
 * Checkbox Component - Checkbox Input
 *
 * Features:
 * - 4 sizes: sm, md, lg, xl (all ≥ 44×44px touch target)
 * - States: checked, unchecked, indeterminate
 * - Error and disabled states
 * - Label support
 * - Helper text and error messages
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Forward ref
 *
 * @component
 * @example
 * <Checkbox label="Accept terms" checked={true} onChange={handleChange} />
 * <Checkbox indeterminate={true} label="Select all" />
 */

import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

const Checkbox = forwardRef(
  (
    {
      size = 'md',
      checked = false,
      indeterminate = false,
      error = false,
      disabled = false,
      label,
      helperText,
      errorText,
      className = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const checkboxRef = useRef(null);
    const combinedRef = ref || checkboxRef;

    // Handle indeterminate state
    useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, combinedRef]);

    const sizeClasses = {
      sm: {
        container: 'min-h-[44px]',
        checkbox: 'w-4 h-4',
        label: 'text-sm',
      },
      md: {
        container: 'min-h-[44px]',
        checkbox: 'w-5 h-5',
        label: 'text-base',
      },
      lg: {
        container: 'min-h-[48px]',
        checkbox: 'w-6 h-6',
        label: 'text-lg',
      },
      xl: {
        container: 'min-h-[52px]',
        checkbox: 'w-7 h-7',
        label: 'text-xl',
      },
    };

    const baseClasses = `
      appearance-none
      rounded
      border-2
      bg-[var(--color-background)]
      transition-all duration-200
      motion-reduce:transition-none
      cursor-pointer
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-offset-2
      focus-visible:ring-[var(--color-primary)]
    `;

    const stateClasses = error
      ? `
        border-[var(--color-error-500)]
        checked:bg-[var(--color-error-500)]
        checked:border-[var(--color-error-500)]
        indeterminate:bg-[var(--color-error-500)]
        indeterminate:border-[var(--color-error-500)]
      `
      : `
        border-[var(--color-input)]
        checked:bg-[var(--color-primary)]
        checked:border-[var(--color-primary)]
        indeterminate:bg-[var(--color-primary)]
        indeterminate:border-[var(--color-primary)]
        hover:border-[var(--color-primary)]
      `;

    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed'
      : '';

    return (
      <div className="w-full">
        <label
          className={cn(
            'flex items-start gap-3 cursor-pointer',
            sizeClasses[size].container,
            disabled && 'cursor-not-allowed'
          )}
        >
          <div className="relative flex items-center justify-center flex-shrink-0 min-w-[44px] min-h-[44px]">
            <input
              ref={combinedRef}
              type="checkbox"
              checked={checked}
              disabled={disabled}
              aria-invalid={error}
              aria-describedby={
                error && errorText
                  ? 'checkbox-error-text'
                  : helperText
                  ? 'checkbox-helper-text'
                  : undefined
              }
              onChange={onChange}
              className={cn(
                baseClasses,
                stateClasses,
                disabledClasses,
                sizeClasses[size].checkbox,
                className
              )}
              style={{
                backgroundImage: checked || indeterminate
                  ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e${
                      indeterminate
                        ? "%3cpath d='M4 8h8'/%3e"
                        : "%3cpath d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/%3e"
                    }%3c/svg%3e")`
                  : undefined,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              {...props}
            />
          </div>
          {label && (
            <div className="flex-1 pt-2.5">
              <span
                className={cn(
                  'font-medium',
                  sizeClasses[size].label,
                  disabled && 'opacity-50',
                  error && 'text-[var(--color-error-600)]'
                )}
              >
                {label}
              </span>
              {error && errorText && (
                <p
                  id="checkbox-error-text"
                  className="mt-1 text-sm text-[var(--color-error-600)]"
                  role="alert"
                >
                  {errorText}
                </p>
              )}
              {!error && helperText && (
                <p
                  id="checkbox-helper-text"
                  className="mt-1 text-sm text-[var(--color-muted-foreground)]"
                >
                  {helperText}
                </p>
              )}
            </div>
          )}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
