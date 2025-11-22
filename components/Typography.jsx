/**
 * Typography Components - Consistent Text Styling
 *
 * Provides Heading, Text, and Caption components that enforce the typography
 * scale and ensure visual consistency across the application.
 *
 * Features:
 * - Modular typography scale (2xs to 5xl)
 * - Semantic HTML elements
 * - Responsive font sizes
 * - Color variants
 * - Weight variants
 * - RTL support
 *
 * Following Material Design 3 and modern typography best practices.
 */

import React from 'react';
import { cn } from '../utils/cn';

/**
 * Heading Component - For page titles, section headers, etc.
 *
 * @example
 * <Heading level="1">Page Title</Heading>
 * <Heading level="2" className="mb-4">Section Title</Heading>
 * <Heading level="3" responsive>Responsive Heading</Heading>
 */
export const Heading = React.forwardRef(({
  children,
  level = '2',
  size,
  weight = 'bold',
  color = 'default',
  responsive = false,
  className,
  ...props
}, ref) => {
  // Map level to default size
  const levelSizeMap = {
    '1': '4xl',  // 48px
    '2': '3xl',  // 36px
    '3': '2xl',  // 30px
    '4': 'xl',   // 24px
    '5': 'lg',   // 20px
    '6': 'base', // 16px
  };

  // Use provided size or default from level
  const fontSize = size || levelSizeMap[level] || '2xl';

  // Font size classes (with responsive variants)
  const sizeClasses = responsive ? {
    '5xl': 'text-4xl md:text-5xl',      // 48px → 60px
    '4xl': 'text-3xl md:text-4xl',      // 36px → 48px
    '3xl': 'text-2xl md:text-3xl',      // 30px → 36px
    '2xl': 'text-xl md:text-2xl',       // 24px → 30px
    'xl': 'text-lg md:text-xl',         // 20px → 24px
    'lg': 'text-base md:text-lg',       // 16px → 20px
    'base': 'text-sm md:text-base',     // 14px → 16px
  } : {
    '5xl': 'text-[var(--text-5xl)]',
    '4xl': 'text-[var(--text-4xl)]',
    '3xl': 'text-[var(--text-3xl)]',
    '2xl': 'text-[var(--text-2xl)]',
    'xl': 'text-[var(--text-xl)]',
    'lg': 'text-[var(--text-lg)]',
    'base': 'text-[var(--text-base)]',
  };

  // Font weight classes
  const weightClasses = {
    normal: 'font-normal',        // 400
    medium: 'font-medium',        // 500
    semibold: 'font-semibold',    // 600
    bold: 'font-bold',            // 700
    extrabold: 'font-extrabold',  // 800
  };

  // Color variants
  const colorClasses = {
    default: 'text-[var(--color-foreground)]',
    muted: 'text-[var(--color-muted-foreground)]',
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-secondary-foreground)]',
    success: 'text-[var(--color-success-600)]',
    warning: 'text-[var(--color-warning-600)]',
    error: 'text-[var(--color-error-600)]',
  };

  const Component = `h${level}`;

  return (
    <Component
      ref={ref}
      className={cn(
        'font-sans',
        'leading-tight',
        sizeClasses[fontSize] || sizeClasses['2xl'],
        weightClasses[weight] || weightClasses.bold,
        colorClasses[color] || colorClasses.default,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Heading.displayName = 'Heading';

/**
 * Text Component - For body text, paragraphs, and general content
 *
 * @example
 * <Text>Default body text</Text>
 * <Text size="sm" color="muted">Small muted text</Text>
 * <Text weight="semibold">Bold text</Text>
 */
export const Text = React.forwardRef(({
  children,
  size = 'base',
  weight = 'normal',
  color = 'default',
  as: Component = 'p',
  truncate = false,
  className,
  ...props
}, ref) => {
  // Font size classes
  const sizeClasses = {
    '2xs': 'text-[var(--text-2xs)]',   // 10.24px
    'xs': 'text-[var(--text-xs)]',     // 12px
    'sm': 'text-[var(--text-sm)]',     // 14px
    'base': 'text-[var(--text-base)]', // 16px
    'md': 'text-[var(--text-md)]',     // 18px
    'lg': 'text-[var(--text-lg)]',     // 20px
    'xl': 'text-[var(--text-xl)]',     // 24px
  };

  // Font weight classes
  const weightClasses = {
    light: 'font-light',              // 300
    normal: 'font-normal',            // 400
    medium: 'font-medium',            // 500
    semibold: 'font-semibold',        // 600
    bold: 'font-bold',                // 700
  };

  // Color variants
  const colorClasses = {
    default: 'text-[var(--color-foreground)]',
    muted: 'text-[var(--color-muted-foreground)]',
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-secondary-foreground)]',
    success: 'text-[var(--color-success-600)]',
    warning: 'text-[var(--color-warning-600)]',
    error: 'text-[var(--color-error-600)]',
  };

  return (
    <Component
      ref={ref}
      className={cn(
        'font-sans',
        'leading-normal',
        sizeClasses[size] || sizeClasses.base,
        weightClasses[weight] || weightClasses.normal,
        colorClasses[color] || colorClasses.default,
        truncate && 'truncate',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Text.displayName = 'Text';

/**
 * Caption Component - For small helper text, labels, captions
 *
 * @example
 * <Caption>Helper text for forms</Caption>
 * <Caption color="error">Error message</Caption>
 * <Caption size="xs">Very small text</Caption>
 */
export const Caption = React.forwardRef(({
  children,
  size = 'xs',
  weight = 'normal',
  color = 'muted',
  as: Component = 'span',
  className,
  ...props
}, ref) => {
  // Font size classes (smaller range for captions)
  const sizeClasses = {
    '2xs': 'text-[var(--text-2xs)]',  // 10.24px
    'xs': 'text-[var(--text-xs)]',    // 12px
    'sm': 'text-[var(--text-sm)]',    // 14px
  };

  // Font weight classes
  const weightClasses = {
    light: 'font-light',              // 300
    normal: 'font-normal',            // 400
    medium: 'font-medium',            // 500
    semibold: 'font-semibold',        // 600
  };

  // Color variants
  const colorClasses = {
    default: 'text-[var(--color-foreground)]',
    muted: 'text-[var(--color-muted-foreground)]',
    primary: 'text-[var(--color-primary)]',
    secondary: 'text-[var(--color-secondary-foreground)]',
    success: 'text-[var(--color-success-600)]',
    warning: 'text-[var(--color-warning-600)]',
    error: 'text-[var(--color-error-600)]',
  };

  return (
    <Component
      ref={ref}
      className={cn(
        'font-sans',
        'leading-normal',
        sizeClasses[size] || sizeClasses.xs,
        weightClasses[weight] || weightClasses.normal,
        colorClasses[color] || colorClasses.muted,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Caption.displayName = 'Caption';

export default { Heading, Text, Caption };
