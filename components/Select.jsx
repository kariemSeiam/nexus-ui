/**
 * Select Component - Custom Select Dropdown
 *
 * Features:
 * - 4 variants: default, filled, outline, underline
 * - 5 sizes: xs, sm, md, lg, xl
 * - States: default, error, success, disabled
 * - Icon support (left)
 * - Helper text and error messages
 * - Keyboard navigation (Arrow keys, Enter, Escape, Home, End)
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Forward ref
 *
 * @component
 * @example
 * <Select
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' }
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 * />
 */

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

const Select = forwardRef(
  (
    {
      variant = 'default',
      size = 'md',
      error = false,
      success = false,
      disabled = false,
      placeholder = 'Select...',
      options = [],
      value,
      defaultValue,
      leftIcon,
      helperText,
      errorText,
      label,
      className = '',
      onChange,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const variantClasses = {
      default: `
        bg-[var(--color-background)]
        border border-[var(--color-input)]
        focus-visible:border-[var(--color-primary)]
        focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20
      `,
      filled: `
        bg-[var(--color-muted)]
        border-0 border-b-2 border-[var(--color-border)]
        focus-visible:border-[var(--color-primary)]
        focus-visible:bg-[var(--color-background)]
        rounded-t-lg rounded-b-none
      `,
      outline: `
        bg-transparent
        border-2 border-[var(--color-border)]
        focus-visible:border-[var(--color-primary)]
        focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/20
      `,
      underline: `
        bg-transparent
        border-0 border-b-2 border-[var(--color-border)]
        focus-visible:border-[var(--color-primary)]
        rounded-none px-0
      `,
    };

    const sizeClasses = {
      xs: { button: 'min-h-[44px] px-3 text-[var(--text-xs)] gap-2', icon: 14 },
      sm: { button: 'min-h-[44px] px-4 text-[var(--text-sm)] gap-2', icon: 16 },
      md: { button: 'min-h-[44px] px-5 text-[16px] gap-2', icon: 18 },
      lg: { button: 'min-h-[48px] px-6 text-[18px] gap-2', icon: 20 },
      xl: { button: 'min-h-[52px] px-6 text-[20px] gap-3', icon: 22 },
    };

    const stateClasses = error
      ? 'border-[var(--color-error-500)] focus-visible:border-[var(--color-error-500)] focus-visible:ring-[var(--color-error-500)]/20'
      : success
      ? 'border-[var(--color-success-500)] focus-visible:border-[var(--color-success-500)] focus-visible:ring-[var(--color-success-500)]/20'
      : '';

    const selectedOption = options.find((opt) => opt.value === selectedValue);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        if (!isOpen) {
          const currentIndex = options.findIndex((opt) => opt.value === selectedValue);
          setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
        }
      }
    };

    const handleSelect = (option) => {
      setSelectedValue(option.value);
      setIsOpen(false);
      if (onChange) {
        onChange(option.value);
      }
    };

    const handleKeyDown = (e) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && focusedIndex >= 0) {
            handleSelect(options[focusedIndex]);
          } else {
            setIsOpen(true);
            const currentIndex = options.findIndex((opt) => opt.value === selectedValue);
            setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(options.length - 1);
          } else {
            setFocusedIndex((prev) => Math.max(prev - 1, 0));
          }
          break;
        case 'Home':
          e.preventDefault();
          if (isOpen) {
            setFocusedIndex(0);
          }
          break;
        case 'End':
          e.preventDefault();
          if (isOpen) {
            setFocusedIndex(options.length - 1);
          }
          break;
        default:
          break;
      }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
      if (isOpen && listRef.current && focusedIndex >= 0) {
        const focusedElement = listRef.current.children[focusedIndex];
        if (focusedElement) {
          focusedElement.scrollIntoView({ block: 'nearest' });
        }
      }
    }, [focusedIndex, isOpen]);

    const renderIcon = (icon) => {
      if (!icon) return null;
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon, {
          size: sizeClasses[size].icon,
          'aria-hidden': true,
        });
      }
      return icon;
    };

    return (
      <div ref={selectRef} className="w-full max-w-[var(--content-sm)] relative">
        {label && (
          <label
            className={cn(
              'block text-[var(--text-sm)] font-medium mb-2',
              disabled ? 'opacity-50' : '',
              error ? 'text-[var(--color-error-600)]' : ''
            )}
          >
            {label}
          </label>
        )}
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={error}
          aria-describedby={
            error && errorText
              ? 'select-error-text'
              : helperText
              ? 'select-helper-text'
              : undefined
          }
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full rounded-lg flex items-center justify-between',
            'text-[var(--color-foreground)]',
            'transition-all duration-200',
            'motion-reduce:transition-none',
            'focus:outline-none',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            variantClasses[variant],
            sizeClasses[size].button,
            stateClasses,
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {leftIcon && (
              <div className="flex-shrink-0 text-[var(--color-muted-foreground)]">
                {renderIcon(leftIcon)}
              </div>
            )}
            <span
              className={cn(
                'truncate',
                !selectedOption && 'text-[var(--color-muted-foreground)]'
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <svg
            className={cn(
              'flex-shrink-0 w-4 h-4 transition-transform duration-200 motion-reduce:transition-none',
              isOpen && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <ul
            ref={listRef}
            role="listbox"
            aria-label={label || 'Select options'}
            className={cn(
              'absolute z-50 w-full mt-1',
              'bg-[var(--color-background)]',
              'border border-[var(--color-border)]',
              'rounded-lg shadow-lg',
              'max-h-60 overflow-auto',
              'py-1'
            )}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === selectedValue}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={cn(
                  'px-4 py-2.5 cursor-pointer',
                  'transition-colors duration-150 motion-reduce:transition-none',
                  'hover:bg-[var(--color-muted)]',
                  focusedIndex === index && 'bg-[var(--color-muted)]',
                  option.value === selectedValue &&
                    'bg-[var(--color-primary)]/10 font-medium'
                )}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}

        {error && errorText && (
          <p
            id="select-error-text"
            className="mt-2 text-[var(--text-xs)] text-[var(--color-error-600)]"
            role="alert"
          >
            {errorText}
          </p>
        )}
        {!error && helperText && (
          <p
            id="select-helper-text"
            className="mt-2 text-[var(--text-xs)] text-[var(--color-muted-foreground)]"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
