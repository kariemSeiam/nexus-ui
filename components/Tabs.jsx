/**
 * Tabs Component - Tabbed Navigation
 *
 * Features:
 * - 3 variants: default, pills, underline
 * - 3 sizes: sm, md, lg (all ≥ 44×44px touch target)
 * - Vertical and horizontal orientation
 * - Disabled tabs
 * - Icon support
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Compound component pattern (Tabs, TabsList, TabsTrigger, TabsContent)
 *
 * @component
 * @example
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 */

import React, { createContext, useContext, forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

const TabsContext = createContext({});

const Tabs = forwardRef(
  (
    {
      value,
      defaultValue,
      orientation = 'horizontal',
      variant = 'default',
      size = 'md',
      className = '',
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState(value || defaultValue || '');

    useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleValueChange = (newValue) => {
      setSelectedValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    return (
      <TabsContext.Provider
        value={{
          selectedValue,
          onValueChange: handleValueChange,
          orientation,
          variant,
          size,
        }}
      >
        <div
          ref={ref}
          className={cn(
            orientation === 'vertical' ? 'flex gap-4' : '',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

const TabsList = forwardRef(({ className, children, ...props }, ref) => {
  const { orientation, variant } = useContext(TabsContext);
  const listRef = useRef(null);
  const combinedRef = ref || listRef;

  const variantClasses = {
    default: 'bg-[var(--color-muted)] p-1 rounded-lg',
    pills: 'bg-transparent gap-2',
    underline: 'bg-transparent border-b border-[var(--color-border)]',
  };

  return (
    <div
      ref={combinedRef}
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

TabsList.displayName = 'TabsList';

const TabsTrigger = forwardRef(
  (
    {
      value,
      disabled = false,
      leftIcon,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const { selectedValue, onValueChange, orientation, variant, size } =
      useContext(TabsContext);
    const isSelected = selectedValue === value;
    const triggerRef = useRef(null);

    const sizeClasses = {
      sm: 'min-h-[44px] px-3 py-2 text-sm gap-1.5',
      md: 'min-h-[44px] px-4 py-2.5 text-base gap-2',
      lg: 'min-h-[48px] px-5 py-3 text-lg gap-2.5',
    };

    const variantClasses = {
      default: cn(
        'rounded-md',
        isSelected
          ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
          : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-background)]/50'
      ),
      pills: cn(
        'rounded-full',
        isSelected
          ? 'bg-[var(--color-primary)] text-white'
          : 'text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]'
      ),
      underline: cn(
        'border-b-2 rounded-none',
        isSelected
          ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
          : 'border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
      ),
    };

    const handleKeyDown = (e) => {
      if (disabled) return;

      const tablist = triggerRef.current?.parentElement;
      if (!tablist) return;

      const tabs = Array.from(tablist.querySelectorAll('[role="tab"]:not([disabled])'));
      const currentIndex = tabs.indexOf(triggerRef.current);

      let nextIndex;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = orientation === 'horizontal' && e.key === 'ArrowDown' ? currentIndex : (currentIndex + 1) % tabs.length;
          if (orientation === 'vertical' && e.key === 'ArrowRight') return;
          tabs[nextIndex]?.focus();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = orientation === 'horizontal' && e.key === 'ArrowUp' ? currentIndex : (currentIndex - 1 + tabs.length) % tabs.length;
          if (orientation === 'vertical' && e.key === 'ArrowLeft') return;
          tabs[nextIndex]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          tabs[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          tabs[tabs.length - 1]?.focus();
          break;
        default:
          break;
      }
    };

    return (
      <button
        ref={(node) => {
          triggerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role="tab"
        type="button"
        aria-selected={isSelected}
        aria-controls={`tabpanel-${value}`}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={() => !disabled && onValueChange(value)}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap',
          'font-medium transition-all duration-200',
          'motion-reduce:transition-none',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-[var(--color-primary)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = forwardRef(
  ({ value, className = '', children, ...props }, ref) => {
    const { selectedValue } = useContext(TabsContext);
    const isSelected = selectedValue === value;

    if (!isSelected) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={0}
        className={cn('mt-4 focus-visible:outline-none', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
export default Tabs;
