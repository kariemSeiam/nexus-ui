/**
 * Stack Component - Vertical Layout with Consistent Spacing
 *
 * Provides consistent vertical spacing between elements using the 8-point grid system.
 * Prevents arbitrary spacing values and ensures design system compliance.
 *
 * Features:
 * - 8-point grid spacing only (gap-2, gap-4, gap-6, gap-8, etc.)
 * - Responsive gap sizes
 * - Optional dividers between items
 * - Alignment control
 * - RTL support via flexbox
 *
 * @component
 * @example
 * <Stack gap="4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 */

import React from 'react';
import { cn } from '../utils/cn';

const Stack = React.forwardRef(({
  children,
  gap = '4',
  align = 'stretch',
  divider = false,
  responsive = false,
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  // Gap sizes (8-point grid only - following spacing tokens)
  const gapClasses = {
    '0': 'gap-0',      // 0px
    '1': 'gap-1',      // 4px
    '2': 'gap-2',      // 8px
    '3': 'gap-3',      // 12px
    '4': 'gap-4',      // 16px (default - comfortable spacing)
    '5': 'gap-5',      // 20px
    '6': 'gap-6',      // 24px (spacious)
    '8': 'gap-8',      // 32px
    '10': 'gap-10',    // 40px
    '12': 'gap-12',    // 48px
    '16': 'gap-16',    // 64px
    '20': 'gap-20',    // 80px
    '24': 'gap-24',    // 96px
  };

  // Responsive gap (scales from mobile to desktop)
  const responsiveGapClasses = {
    'sm-lg': 'gap-2 md:gap-4 lg:gap-6',     // 8px → 16px → 24px
    'md-xl': 'gap-4 md:gap-6 lg:gap-8',     // 16px → 24px → 32px
    'lg-2xl': 'gap-6 md:gap-8 lg:gap-12',   // 24px → 32px → 48px
  };

  // Alignment options
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };

  // Get gap class
  const gapClass = responsive
    ? (responsiveGapClasses[responsive] || gapClasses[gap])
    : gapClasses[gap] || gapClasses['4'];

  return (
    <Component
      ref={ref}
      className={cn(
        'flex flex-col',
        gapClass,
        alignClasses[align] || alignClasses.stretch,
        divider && 'divide-y divide-[var(--color-border)]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Stack.displayName = 'Stack';

export default Stack;
