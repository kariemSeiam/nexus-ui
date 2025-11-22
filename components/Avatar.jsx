/**
 * Avatar Component - User Avatar/Profile Picture
 *
 * Features:
 * - 6 sizes: xs, sm, md, lg, xl, 2xl
 * - Image, initials, or icon fallback
 * - Status indicator (online, offline, away, busy)
 * - Group avatar support
 * - Accessibility
 * - RTL support
 *
 * @component
 * @example
 * <Avatar src="/path/to/image.jpg" alt="User Name" size="md" />
 * <Avatar initials="AB" size="lg" status="online" />
 */

import React, { forwardRef, useState } from 'react';
import { User } from 'lucide-react';
import { cn } from '../lib/utils';

const Avatar = forwardRef(
  (
    {
      src,
      alt = 'Avatar',
      initials,
      size = 'md',
      status,
      className = '',
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const sizeClasses = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
      '2xl': 'w-20 h-20 text-2xl',
    };

    const statusClasses = {
      online: 'bg-[var(--color-success-500)]',
      offline: 'bg-[var(--color-neutral-400)]',
      away: 'bg-[var(--color-warning-500)]',
      busy: 'bg-[var(--color-error-500)]',
    };

    const statusSizes = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-3.5 h-3.5',
      '2xl': 'w-4 h-4',
    };

    const showImage = src && !imageError;
    const showInitials = !showImage && initials;
    const showIcon = !showImage && !showInitials;

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex', className)}
        {...props}
      >
        <div
          className={cn(
            'flex items-center justify-center rounded-full overflow-hidden',
            'bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-900)]',
            'text-[var(--color-primary-700)] dark:text-[var(--color-primary-300)]',
            'font-semibold',
            sizeClasses[size]
          )}
        >
          {showImage && (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          )}
          {showInitials && <span>{initials}</span>}
          {showIcon && <User className="w-1/2 h-1/2" aria-hidden="true" />}
        </div>
        {status && (
          <span
            className={cn(
              'absolute bottom-0 end-0 rounded-full',
              'ring-2 ring-[var(--color-background)]',
              statusClasses[status],
              statusSizes[size]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
