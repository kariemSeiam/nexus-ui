/**
 * Textarea Component - Multi-line Text Input
 *
 * Features:
 * - 4 variants: default, filled, outline, underline
 * - 5 sizes: xs, sm, md, lg, xl
 * - States: default, error, success, disabled
 * - Auto-resize option
 * - Character counter
 * - Helper text and error messages
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Forward ref
 *
 * @component
 * @example
 * <Textarea
 *   placeholder="Enter description"
 *   rows={4}
 *   maxLength={500}
 *   showCount
 * />
 */

import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

const Textarea = forwardRef(
  (
    {
      variant = 'default',
      size = 'md',
      error = false,
      success = false,
      disabled = false,
      autoResize = false,
      showCount = false,
      maxLength,
      helperText,
      errorText,
      label,
      rows = 4,
      className = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(0);
    const textareaRef = useRef(null);
    const combinedRef = ref || textareaRef;

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
      xs: 'px-2 py-1.5 text-xs',
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-5 py-3 text-lg',
      xl: 'px-6 py-3.5 text-xl',
    };

    const stateClasses = error
      ? 'border-[var(--color-error-500)] focus-visible:border-[var(--color-error-500)] focus-visible:ring-[var(--color-error-500)]/20'
      : success
      ? 'border-[var(--color-success-500)] focus-visible:border-[var(--color-success-500)] focus-visible:ring-[var(--color-success-500)]/20'
      : '';

    useEffect(() => {
      if (autoResize && combinedRef.current) {
        const textarea = combinedRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [autoResize, combinedRef]);

    const handleChange = (e) => {
      if (showCount || maxLength) {
        setCharCount(e.target.value.length);
      }

      if (autoResize && combinedRef.current) {
        const textarea = combinedRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }

      if (onChange) {
        onChange(e);
      }
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
        <textarea
          ref={combinedRef}
          disabled={disabled}
          rows={autoResize ? 1 : rows}
          maxLength={maxLength}
          aria-invalid={error}
          aria-describedby={
            error && errorText
              ? 'error-text'
              : helperText
              ? 'helper-text'
              : undefined
          }
          onChange={handleChange}
          className={cn(
            'w-full rounded-lg resize-y',
            'text-[var(--color-foreground)]',
            'placeholder:text-[var(--color-muted-foreground)]',
            'transition-all duration-200',
            'motion-reduce:transition-none',
            'focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            autoResize && 'resize-none overflow-hidden',
            variantClasses[variant],
            sizeClasses[size],
            stateClasses,
            className
          )}
          {...props}
        />
        <div className="flex justify-between items-start mt-1.5">
          <div className="flex-1">
            {error && errorText && (
              <p
                id="error-text"
                className="text-sm text-[var(--color-error-600)]"
                role="alert"
              >
                {errorText}
              </p>
            )}
            {!error && helperText && (
              <p
                id="helper-text"
                className="text-sm text-[var(--color-muted-foreground)]"
              >
                {helperText}
              </p>
            )}
          </div>
          {(showCount || maxLength) && (
            <p
              className={cn(
                'text-sm text-[var(--color-muted-foreground)] ms-2 flex-shrink-0',
                maxLength && charCount > maxLength * 0.9 && 'text-[var(--color-warning-600)]',
                maxLength && charCount >= maxLength && 'text-[var(--color-error-600)]'
              )}
              aria-live="polite"
            >
              {maxLength ? `${charCount}/${maxLength}` : charCount}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
