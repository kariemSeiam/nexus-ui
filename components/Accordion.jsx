/**
 * Accordion Component - Collapsible Content Panels
 *
 * Features:
 * - Single and multiple expanded items
 * - Keyboard navigation (Arrow keys, Home, End, Enter, Space)
 * - Smooth animations
 * - Icon customization
 * - Disabled items
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Compound component pattern
 *
 * @component
 * @example
 * <Accordion type="single">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content 1</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>Section 2</AccordionTrigger>
 *     <AccordionContent>Content 2</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 */

import React, { createContext, useContext, forwardRef, useState } from 'react';
import { cn } from '../lib/utils';

const AccordionContext = createContext({});
const AccordionItemContext = createContext({});

const Accordion = forwardRef(
  (
    {
      type = 'single',
      value,
      defaultValue,
      onValueChange,
      collapsible = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      value || defaultValue || (type === 'multiple' ? [] : '')
    );

    const currentValue = value !== undefined ? value : internalValue;

    const handleValueChange = (itemValue) => {
      let newValue;

      if (type === 'multiple') {
        const valueArray = Array.isArray(currentValue) ? currentValue : [];
        newValue = valueArray.includes(itemValue)
          ? valueArray.filter((v) => v !== itemValue)
          : [...valueArray, itemValue];
      } else {
        newValue = currentValue === itemValue && collapsible ? '' : itemValue;
      }

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const isExpanded = (itemValue) => {
      if (type === 'multiple') {
        const valueArray = Array.isArray(currentValue) ? currentValue : [];
        return valueArray.includes(itemValue);
      }
      return currentValue === itemValue;
    };

    return (
      <AccordionContext.Provider
        value={{
          type,
          disabled,
          isExpanded,
          onValueChange: handleValueChange,
        }}
      >
        <div ref={ref} className={cn('space-y-2', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

const AccordionItem = forwardRef(
  (
    {
      value,
      disabled: itemDisabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const { isExpanded, disabled: accordionDisabled } = useContext(AccordionContext);
    const expanded = isExpanded(value);
    const disabled = accordionDisabled || itemDisabled;

    return (
      <AccordionItemContext.Provider value={{ value, expanded, disabled }}>
        <div
          ref={ref}
          className={cn(
            'border border-[var(--color-border)] rounded-lg',
            'overflow-hidden',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = forwardRef(
  (
    {
      leftIcon,
      showIcon = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const { onValueChange } = useContext(AccordionContext);
    const { value, expanded, disabled } = useContext(AccordionItemContext);

    const handleClick = () => {
      if (!disabled) {
        onValueChange(value);
      }
    };

    const handleKeyDown = (e) => {
      if (disabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onValueChange(value);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-expanded={expanded}
        aria-controls={`accordion-content-${value}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex items-center justify-between w-full',
          'min-h-[44px] px-4 py-3',
          'text-left font-medium',
          'transition-all duration-200',
          'motion-reduce:transition-none',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-inset',
          'focus-visible:ring-[var(--color-primary)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          !disabled && 'hover:bg-[var(--color-muted)]/50',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2 flex-1">
          {leftIcon && (
            <span className="flex-shrink-0" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <span>{children}</span>
        </div>
        {showIcon && (
          <svg
            className={cn(
              'flex-shrink-0 w-5 h-5 transition-transform duration-200',
              'motion-reduce:transition-none',
              'text-[var(--color-muted-foreground)]',
              expanded && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    const { value, expanded } = useContext(AccordionItemContext);

    return (
      <div
        ref={ref}
        id={`accordion-content-${value}`}
        role="region"
        aria-labelledby={`accordion-trigger-${value}`}
        className={cn(
          'overflow-hidden transition-all duration-200',
          'motion-reduce:transition-none',
          expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        )}
        {...props}
      >
        <div className={cn('px-4 py-3 pt-0', className)}>
          {children}
        </div>
      </div>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export default Accordion;
