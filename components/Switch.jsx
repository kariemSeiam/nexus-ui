/**
 * Switch Component - Toggle Switch
 *
 * Features:
 * - 3 sizes: sm, md, lg
 * - Label support
 * - Disabled state
 * - Full accessibility (ARIA 1.3)
 * - Keyboard navigation
 * - RTL support
 *
 * @component
 * @example
 * <Switch checked={isOn} onChange={setIsOn} label="Enable feature" />
 */

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Switch = forwardRef(
  (
    {
      checked = false,
      onChange,
      disabled = false,
      size = 'md',
      label,
      labelPosition = 'right',
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: {
        track: 'w-8 h-4',
        thumb: 'w-3 h-3',
        translateChecked: 'translate-x-4 rtl:-translate-x-4',
      },
      md: {
        track: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translateChecked: 'translate-x-5 rtl:-translate-x-5',
      },
      lg: {
        track: 'w-14 h-7',
        thumb: 'w-6 h-6',
        translateChecked: 'translate-x-7 rtl:-translate-x-7',
      },
    };

    const { track, thumb, translateChecked } = sizeClasses[size];

    const handleChange = (e) => {
      if (!disabled && onChange) {
        onChange(e.target.checked);
      }
    };

    const switchElement = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle switch'}
        disabled={disabled}
        onClick={() => handleChange({ target: { checked: !checked } })}
        className={cn(
          'relative inline-flex shrink-0 rounded-full',
          'transition-colors duration-200 ease-in-out',
          'motion-reduce:transition-none',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--color-ring)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          checked
            ? 'bg-[var(--color-primary)]'
            : 'bg-[var(--color-neutral-300)] dark:bg-[var(--color-neutral-700)]',
          track,
          className
        )}
        {...props}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full',
            'bg-white shadow-sm',
            'transform transition-transform duration-200 ease-in-out',
            'motion-reduce:transition-none',
            'translate-x-0.5 translate-y-0.5',
            checked && translateChecked,
            thumb
          )}
        />
      </button>
    );

    if (!label) {
      return switchElement;
    }

    return (
      <label
        className={cn(
          'inline-flex items-center gap-3 cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50',
          labelPosition === 'left' && 'flex-row-reverse'
        )}
      >
        {switchElement}
        <span className="text-sm font-medium select-none">{label}</span>
      </label>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
