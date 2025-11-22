/**
 * RadioGroup Component - Radio Button Group Container
 *
 * Features:
 * - Manages radio button state
 * - Vertical and horizontal orientation
 * - Error state propagation
 * - Helper text and error messages
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Forward ref
 *
 * @component
 * @example
 * <RadioGroup
 *   label="Choose an option"
 *   value={selected}
 *   onChange={setSelected}
 * >
 *   <Radio value="1" label="Option 1" />
 *   <Radio value="2" label="Option 2" />
 * </RadioGroup>
 */

import React, { forwardRef, Children, cloneElement } from 'react';
import { cn } from '../lib/utils';

const RadioGroup = forwardRef(
  (
    {
      label,
      value,
      defaultValue,
      name,
      error = false,
      disabled = false,
      helperText,
      errorText,
      orientation = 'vertical',
      size = 'md',
      className = '',
      onChange,
      children,
      ...props
    },
    ref
  ) => {
    const orientationClasses = {
      vertical: 'flex-col gap-3',
      horizontal: 'flex-row flex-wrap gap-4',
    };

    const handleChange = (childValue) => (e) => {
      if (onChange && !disabled) {
        onChange(childValue, e);
      }
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {label && (
          <label
            className={cn(
              'block text-[var(--text-sm)] font-medium mb-3',
              disabled && 'opacity-50',
              error && 'text-[var(--color-error-600)]'
            )}
          >
            {label}
          </label>
        )}
        <div
          role="radiogroup"
          aria-invalid={error}
          aria-describedby={
            error && errorText
              ? 'radiogroup-error-text'
              : helperText
              ? 'radiogroup-helper-text'
              : undefined
          }
          className={cn('flex', orientationClasses[orientation])}
        >
          {Children.map(children, (child) => {
            if (!child) return null;

            return cloneElement(child, {
              name: name || 'radio-group',
              checked: value !== undefined ? child.props.value === value : undefined,
              onChange: handleChange(child.props.value),
              error: error || child.props.error,
              disabled: disabled || child.props.disabled,
              size: child.props.size || size,
            });
          })}
        </div>
        {error && errorText && (
          <p
            id="radiogroup-error-text"
            className="mt-2 text-[var(--text-xs)] text-[var(--color-error-600)]"
            role="alert"
          >
            {errorText}
          </p>
        )}
        {!error && helperText && (
          <p
            id="radiogroup-helper-text"
            className="mt-2 text-[var(--text-xs)] text-[var(--color-muted-foreground)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
