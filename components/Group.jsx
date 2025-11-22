/**
 * Group Component - Horizontal Layout with Consistent Spacing
 *
 * Provides consistent horizontal spacing between elements using the 8-point grid system.
 * Perfect for button groups, inline elements, and horizontal layouts.
 *
 * Features:
 * - 8-point grid spacing only (gap-2, gap-4, gap-6, gap-8, etc.)
 * - Responsive gap sizes
 * - Wrap support for responsive layouts
 * - Alignment control (both horizontal and vertical)
 * - RTL support via flexbox logical properties
 *
 * @component
 * @example
 * <Group gap="2" wrap>
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 *   <Button>Action 3</Button>
 * </Group>
 */

import React from 'react';
import { cn } from '../utils/cn';

const Group = React.forwardRef(({
  children,
  gap = '2',
  justify = 'start',
  align = 'center',
  wrap = false,
  responsive = false,
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  // Gap sizes (8-point grid only - following spacing tokens)
  const gapClasses = {
    '0': 'gap-0',      // 0px
    '1': 'gap-1',      // 4px
    '2': 'gap-2',      // 8px (default for compact groups)
    '3': 'gap-3',      // 12px
    '4': 'gap-4',      // 16px (comfortable spacing)
    '5': 'gap-5',      // 20px
    '6': 'gap-6',      // 24px
    '8': 'gap-8',      // 32px
    '10': 'gap-10',    // 40px
    '12': 'gap-12',    // 48px
    '16': 'gap-16',    // 64px
  };

  // Responsive gap (scales from mobile to desktop)
  const responsiveGapClasses = {
    'sm-lg': 'gap-1 md:gap-2 lg:gap-4',     // 4px → 8px → 16px
    'md-xl': 'gap-2 md:gap-4 lg:gap-6',     // 8px → 16px → 24px
    'lg-2xl': 'gap-4 md:gap-6 lg:gap-8',    // 16px → 24px → 32px
  };

  // Justify (horizontal alignment)
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  // Align (vertical alignment)
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
    : gapClasses[gap] || gapClasses['2'];

  return (
    <Component
      ref={ref}
      className={cn(
        'flex flex-row',
        gapClass,
        justifyClasses[justify] || justifyClasses.start,
        alignClasses[align] || alignClasses.center,
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Group.displayName = 'Group';

export default Group;
