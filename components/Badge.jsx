/**
 * Badge Component - Modern Badge/Tag Implementation
 *
 * Features:
 * - 8 variants: default, primary, secondary, success, warning, error, info, neutral
 * - 3 styles: solid, outline, subtle, dot
 * - 5 sizes: xs, sm, md, lg, xl
 * - Icon support
 * - Removable/dismissible
 * - Dot indicator
 * - RTL support
 * - WCAG 3.0 compliant
 *
 * @component
 * @example
 * <Badge variant="success" size="md">Success</Badge>
 * <Badge variant="primary" style="outline" dot>With Dot</Badge>
 * <Badge variant="error" onRemove={() => console.log('removed')}>Removable</Badge>
 */

import React, { forwardRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * Badge component
 *
 * @typedef {Object} BadgeProps
 * @property {'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'} [variant='default'] - Badge variant
 * @property {'solid' | 'outline' | 'subtle' | 'dot'} [style='solid'] - Badge style
 * @property {'xs' | 'sm' | 'md' | 'lg' | 'xl'} [size='md'] - Badge size
 * @property {boolean} [dot=false] - Show dot indicator
 * @property {React.ReactNode} [icon] - Icon element
 * @property {Function} [onRemove] - Remove/dismiss handler
 * @property {string} [className] - Additional CSS classes
 */
const Badge = forwardRef(
  (
    {
      children,
      variant = 'default',
      style = 'solid',
      size = 'md',
      dot = false,
      icon,
      onRemove,
      className = '',
      ...props
    },
    ref
  ) => {
    // Variant classes for each style type
    const solidVariants = {
      default: 'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]',
      primary: 'bg-[var(--color-primary)] text-white',
      secondary: 'bg-[var(--color-secondary-500)] text-white',
      success: 'bg-[var(--color-success-500)] text-white',
      warning: 'bg-[var(--color-warning-500)] text-[var(--color-neutral-900)]',
      error: 'bg-[var(--color-error-500)] text-white',
      info: 'bg-[var(--color-info-500)] text-white',
      neutral: 'bg-[var(--color-neutral-500)] text-white',
    };

    const outlineVariants = {
      default: 'border-2 border-[var(--color-border)] text-[var(--color-foreground)] bg-transparent',
      primary: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent',
      secondary: 'border-2 border-[var(--color-secondary-500)] text-[var(--color-secondary-500)] bg-transparent',
      success: 'border-2 border-[var(--color-success-500)] text-[var(--color-success-600)] bg-transparent',
      warning: 'border-2 border-[var(--color-warning-500)] text-[var(--color-warning-600)] bg-transparent',
      error: 'border-2 border-[var(--color-error-500)] text-[var(--color-error-600)] bg-transparent',
      info: 'border-2 border-[var(--color-info-500)] text-[var(--color-info-600)] bg-transparent',
      neutral: 'border-2 border-[var(--color-neutral-500)] text-[var(--color-neutral-600)] bg-transparent',
    };

    const subtleVariants = {
      default: 'bg-[var(--color-muted)] text-[var(--color-foreground)]',
      primary: 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)] dark:bg-[var(--color-primary-900)] dark:text-[var(--color-primary-300)]',
      secondary: 'bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)] dark:bg-[var(--color-secondary-900)] dark:text-[var(--color-secondary-300)]',
      success: 'bg-[var(--color-success-100)] text-[var(--color-success-700)] dark:bg-[var(--color-success-900)] dark:text-[var(--color-success-300)]',
      warning: 'bg-[var(--color-warning-100)] text-[var(--color-warning-800)] dark:bg-[var(--color-warning-900)] dark:text-[var(--color-warning-300)]',
      error: 'bg-[var(--color-error-100)] text-[var(--color-error-700)] dark:bg-[var(--color-error-900)] dark:text-[var(--color-error-300)]',
      info: 'bg-[var(--color-info-100)] text-[var(--color-info-700)] dark:bg-[var(--color-info-900)] dark:text-[var(--color-info-300)]',
      neutral: 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] dark:bg-[var(--color-neutral-900)] dark:text-[var(--color-neutral-300)]',
    };

    const dotVariants = {
      default: 'bg-[var(--color-border)]',
      primary: 'bg-[var(--color-primary)]',
      secondary: 'bg-[var(--color-secondary-500)]',
      success: 'bg-[var(--color-success-500)]',
      warning: 'bg-[var(--color-warning-500)]',
      error: 'bg-[var(--color-error-500)]',
      info: 'bg-[var(--color-info-500)]',
      neutral: 'bg-[var(--color-neutral-500)]',
    };

    const variantMap = {
      solid: solidVariants,
      outline: outlineVariants,
      subtle: subtleVariants,
      dot: subtleVariants, // Dot uses subtle background
    };

    // Size classes
    const sizeClasses = {
      xs: 'px-1.5 py-0.5 text-xs gap-1',
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-2.5 py-1 text-sm gap-1.5',
      lg: 'px-3 py-1 text-base gap-1.5',
      xl: 'px-3.5 py-1.5 text-lg gap-2',
    };

    const iconSizes = {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
    };

    const dotSizes = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
      xl: 'w-3 h-3',
    };

    const iconSize = iconSizes[size];

    const renderIcon = (iconElement) => {
      if (!iconElement) return null;
      if (React.isValidElement(iconElement)) {
        return React.cloneElement(iconElement, {
          size: iconSize,
          'aria-hidden': true,
        });
      }
      return iconElement;
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-full',
          'transition-colors duration-150',
          variantMap[style][variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'rounded-full shrink-0',
              dotSizes[size],
              dotVariants[variant]
            )}
            aria-hidden="true"
          />
        )}
        {icon && <span className="shrink-0">{renderIcon(icon)}</span>}
        {children && <span>{children}</span>}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'shrink-0 rounded-full',
              'hover:bg-black/10 dark:hover:bg-white/10',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1',
              'transition-colors duration-150'
            )}
            aria-label="Remove badge"
          >
            <X size={iconSize} aria-hidden="true" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
