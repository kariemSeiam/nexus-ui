/**
 * Container Component - Responsive Layout Container
 *
 * Provides responsive max-width constraints to prevent content from
 * stretching too wide on large screens. Essential for readable layouts.
 *
 * Features:
 * - Responsive max-widths based on breakpoints
 * - Horizontal padding for mobile devices
 * - Center alignment
 * - Multiple size variants
 * - RTL support via logical properties
 *
 * Following Material Design 3, iOS HIG, and responsive design best practices.
 *
 * @component
 * @example
 * <Container maxWidth="xl">
 *   <h1>My Content</h1>
 *   <p>This content will never exceed 1280px width</p>
 * </Container>
 */

import React from 'react';
import { cn } from '../utils/cn';

const Container = React.forwardRef(({
  children,
  maxWidth = 'xl',
  padding = 'responsive',
  center = true,
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  // Max-width variants (following design tokens)
  const maxWidthClasses = {
    xs: 'max-w-[var(--container-xs)]',      // 320px
    sm: 'max-w-[var(--container-sm)]',      // 384px
    md: 'max-w-[var(--container-md)]',      // 448px
    lg: 'max-w-[var(--container-lg)]',      // 512px
    xl: 'max-w-[var(--container-xl)]',      // 576px
    '2xl': 'max-w-[var(--container-2xl)]',  // 672px
    '3xl': 'max-w-[var(--container-3xl)]',  // 768px
    '4xl': 'max-w-[var(--container-4xl)]',  // 896px
    '5xl': 'max-w-[var(--container-5xl)]',  // 1024px
    '6xl': 'max-w-[var(--container-6xl)]',  // 1152px
    '7xl': 'max-w-[var(--container-7xl)]',  // 1280px
    content: 'max-w-[var(--content-xl)]',   // 1280px (default for content)
    full: 'max-w-full',                      // 100% (use for hero sections)
    none: '',                                // No max-width constraint
  };

  // Padding variants
  const paddingClasses = {
    none: '',
    sm: 'px-2',                              // 8px
    md: 'px-4',                              // 16px
    lg: 'px-6',                              // 24px
    xl: 'px-8',                              // 32px
    responsive: 'px-4 sm:px-6 lg:px-8',     // Scales from 16px to 32px
  };

  return (
    <Component
      ref={ref}
      className={cn(
        'w-full',
        maxWidthClasses[maxWidth] || maxWidthClasses.xl,
        paddingClasses[padding] || paddingClasses.responsive,
        center && 'mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Container.displayName = 'Container';

export default Container;
