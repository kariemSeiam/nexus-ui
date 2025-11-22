/**
 * Card Component - Compound Component Pattern
 *
 * Features:
 * - 6 variants: default, elevated, outline, flat, gradient, glassmorphism
 * - Compound components: Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter
 * - Fully accessible with semantic HTML
 * - RTL support
 * - Responsive
 * - Hover effects
 * - Forward refs
 *
 * @component
 * @example
 * <Card variant="elevated">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description goes here</CardDescription>
 *   </CardHeader>
 *   <CardBody>
 *     Main content here
 *   </CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 */

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

/**
 * Main Card container
 *
 * @typedef {Object} CardProps
 * @property {'default' | 'elevated' | 'outline' | 'flat' | 'gradient' | 'glassmorphism'} [variant='default'] - Card variant
 * @property {'none' | 'sm' | 'md' | 'lg'} [padding='md'] - Padding size (8pt grid)
 * @property {'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'} [maxWidth='none'] - Maximum width constraint
 * @property {boolean} [hoverable=false] - Add hover effect
 * @property {boolean} [clickable=false] - Make card clickable
 * @property {string} [className] - Additional CSS classes
 */
const Card = forwardRef(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      maxWidth = 'none',
      hoverable = false,
      clickable = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: `
        bg-[var(--color-card)]
        text-[var(--color-card-foreground)]
        border border-[var(--color-border)]
        shadow-sm
      `,
      elevated: `
        bg-[var(--color-card)]
        text-[var(--color-card-foreground)]
        shadow-lg
        border-0
      `,
      outline: `
        bg-transparent
        border-2 border-[var(--color-border)]
        shadow-none
      `,
      flat: `
        bg-[var(--color-muted)]
        text-[var(--color-foreground)]
        border-0
        shadow-none
      `,
      gradient: `
        bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)]
        text-white
        border-0
        shadow-md
      `,
      glassmorphism: `
        bg-[var(--color-background)]/80
        backdrop-blur-lg
        backdrop-saturate-150
        border border-[var(--color-border)]/50
        shadow-xl
      `,
    };

    const paddingClasses = {
      none: '',
      sm: 'p-4',  // 16px - 8pt grid
      md: 'p-6',  // 24px - 8pt grid (default)
      lg: 'p-8',  // 32px - 8pt grid
    };

    const maxWidthClasses = {
      none: '',
      sm: 'max-w-[var(--container-sm)]',    // 384px
      md: 'max-w-[var(--container-md)]',    // 448px
      lg: 'max-w-[var(--container-lg)]',    // 512px
      xl: 'max-w-[var(--container-xl)]',    // 576px
      '2xl': 'max-w-[var(--container-2xl)]', // 672px
      full: 'max-w-full',
    };

    const hoverClasses = hoverable
      ? `
        transition-all
        duration-200
        hover:shadow-xl
        hover:-translate-y-1
        motion-reduce:transform-none
        motion-reduce:transition-none
      `
      : '';

    const clickableClasses = clickable
      ? `
        cursor-pointer
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-[var(--color-ring)]
      `
      : '';

    const Component = clickable ? 'button' : 'div';

    return (
      <Component
        ref={ref}
        className={cn(
          'rounded-xl overflow-hidden',
          variantClasses[variant],
          paddingClasses[padding],
          maxWidthClasses[maxWidth],
          hoverClasses,
          clickableClasses,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header component
 */
const CardHeader = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

/**
 * Card Title component
 */
const CardTitle = forwardRef(
  (
    { children, as: Component = 'h3', className = '', ...props },
    ref
  ) => (
    <Component
      ref={ref}
      className={cn(
        'text-[var(--text-lg)] font-bold leading-tight tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
);

CardTitle.displayName = 'CardTitle';

/**
 * Card Description component
 */
const CardDescription = forwardRef(
  ({ children, className = '', ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'text-[var(--text-sm)] text-[var(--color-muted-foreground)]',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

/**
 * Card Body/Content component
 */
const CardBody = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={cn('py-4', className)}
    {...props}
  >
    {children}
  </div>
));

CardBody.displayName = 'CardBody';

/**
 * Card Footer component
 */
const CardFooter = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-2 pt-4', className)}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

// Export all components
export default Card;
export { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter };
