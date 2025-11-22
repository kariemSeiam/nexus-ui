/**
 * Spinner Component - Loading Indicator
 *
 * Features:
 * - 5 sizes: xs, sm, md, lg, xl
 * - 4 variants: default, primary, secondary, custom
 * - Accessibility (ARIA)
 * - Respects prefers-reduced-motion
 *
 * @component
 * @example
 * <Spinner size="md" variant="primary" />
 * <Spinner size="lg" label="Loading..." />
 */

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Spinner = forwardRef(
  (
    {
      size = 'md',
      variant = 'default',
      label = 'Loading',
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'w-4 h-4 border-2',
      sm: 'w-6 h-6 border-2',
      md: 'w-8 h-8 border-2',
      lg: 'w-12 h-12 border-3',
      xl: 'w-16 h-16 border-4',
    };

    const variantClasses = {
      default: 'border-[var(--color-border)] border-t-[var(--color-foreground)]',
      primary: 'border-[var(--color-primary-200)] border-t-[var(--color-primary)]',
      secondary: 'border-[var(--color-secondary-200)] border-t-[var(--color-secondary-500)]',
      white: 'border-white/30 border-t-white',
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn('inline-block', className)}
        {...props}
      >
        <div
          className={cn(
            'rounded-full animate-spin motion-reduce:animate-none',
            sizeClasses[size],
            variantClasses[variant]
          )}
        />
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner;
