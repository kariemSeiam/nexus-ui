/**
 * Progress Component - Progress Bar
 *
 * Features:
 * - Determinate and indeterminate states
 * - Multiple variants: default, primary, success, warning, error
 * - Multiple sizes: sm, md, lg
 * - Value label support
 * - Accessibility (ARIA)
 *
 * @component
 * @example
 * <Progress value={75} variant="primary" size="md" />
 * <Progress value={100} variant="success" showValue />
 * <Progress indeterminate variant="primary" />
 */

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Progress = forwardRef(
  (
    {
      value = 0,
      max = 100,
      variant = 'default',
      size = 'md',
      indeterminate = false,
      showValue = false,
      label,
      className = '',
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: 'bg-[var(--color-primary)]',
      primary: 'bg-[var(--color-primary)]',
      secondary: 'bg-[var(--color-secondary-500)]',
      success: 'bg-[var(--color-success-500)]',
      warning: 'bg-[var(--color-warning-500)]',
      error: 'bg-[var(--color-error-500)]',
    };

    const sizeClasses = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && <span className="text-sm font-medium">{label}</span>}
            {showValue && (
              <span className="text-sm text-[var(--color-muted-foreground)]">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || 'Progress'}
          className={cn(
            'w-full rounded-full overflow-hidden',
            'bg-[var(--color-muted)]',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-out',
              variantClasses[variant],
              indeterminate &&
                'animate-[progress_2s_ease-in-out_infinite] motion-reduce:animate-none'
            )}
            style={{
              width: indeterminate ? '30%' : `${percentage}%`,
            }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export default Progress;
