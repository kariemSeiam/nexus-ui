/**
 * Skeleton Component - Loading Placeholder
 *
 * Features:
 * - Multiple variants: text, circular, rectangular, rounded
 * - Customizable dimensions
 * - Animated pulse
 * - Respects prefers-reduced-motion
 *
 * @component
 * @example
 * <Skeleton variant="text" className="h-4 w-64" />
 * <Skeleton variant="circular" className="w-12 h-12" />
 * <Skeleton variant="rectangular" className="w-full h-32" />
 */

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Skeleton = forwardRef(
  (
    {
      variant = 'rectangular',
      className = '',
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      text: 'rounded h-5',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
      rounded: 'rounded-xl',
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label="Loading content"
        className={cn(
          'bg-[var(--color-muted)]',
          'animate-pulse motion-reduce:animate-none',
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
