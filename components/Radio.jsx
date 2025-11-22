/**
 * Radio Component - Radio Button Input
 *
 * Features:
 * - 4 sizes: sm, md, lg, xl (all ≥ 44×44px touch target)
 * - Error and disabled states
 * - Label support
 * - Helper text and error messages
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Forward ref
 * - Works with RadioGroup for proper radio button groups
 *
 * @component
 * @example
 * <Radio name="option" value="1" label="Option 1" checked={true} />
 */

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Radio = forwardRef(
  (
    {
      size = 'md',
      checked = false,
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
    const sizeClasses = {
      sm: {
        container: 'min-h-[44px]',
        radio: 'w-4 h-4',
        label: 'text-sm',
      },
      md: {
        container: 'min-h-[44px]',
        radio: 'w-5 h-5',
        label: 'text-base',
      },
      lg: {
        container: 'min-h-[48px]',
        radio: 'w-6 h-6',
        label: 'text-lg',
      },
      xl: {
        container: 'min-h-[52px]',
        radio: 'w-7 h-7',
        label: 'text-xl',
      },
    };

    const baseClasses = `
      appearance-none
      rounded-full
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
      `
      : `
        border-[var(--color-input)]
        checked:bg-[var(--color-primary)]
        checked:border-[var(--color-primary)]
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
              ref={ref}
              type="radio"
              checked={checked}
              disabled={disabled}
              aria-invalid={error}
              aria-describedby={
                error && errorText
                  ? 'radio-error-text'
                  : helperText
                  ? 'radio-helper-text'
                  : undefined
              }
              onChange={onChange}
              className={cn(
                baseClasses,
                stateClasses,
                disabledClasses,
                sizeClasses[size].radio,
                className
              )}
              style={{
                backgroundImage: checked
                  ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")`
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
                  id="radio-error-text"
                  className="mt-1 text-sm text-[var(--color-error-600)]"
                  role="alert"
                >
                  {errorText}
                </p>
              )}
              {!error && helperText && (
                <p
                  id="radio-helper-text"
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

Radio.displayName = 'Radio';

export default Radio;
