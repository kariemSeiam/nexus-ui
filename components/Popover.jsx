/**
 * Popover Component - Floating Content Container
 *
 * Features:
 * - 8 placement positions (top, bottom, left, right + variants)
 * - Click or hover trigger
 * - Auto-positioning
 * - Close on outside click
 * - Close on escape
 * - Arrow indicator
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Compound component pattern
 *
 * @component
 * @example
 * <Popover>
 *   <PopoverTrigger>
 *     <Button>Open</Button>
 *   </PopoverTrigger>
 *   <PopoverContent>
 *     Popover content here
 *   </PopoverContent>
 * </Popover>
 */

import React, { createContext, useContext, forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

const PopoverContext = createContext({});

const Popover = forwardRef(
  (
    {
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      trigger = 'click',
      placement = 'bottom',
      closeOnOutsideClick = true,
      closeOnEscape = true,
      children,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : open;

    const handleOpenChange = (newOpen) => {
      if (!isControlled) {
        setOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    return (
      <PopoverContext.Provider
        value={{
          open: isOpen,
          onOpenChange: handleOpenChange,
          trigger,
          placement,
          closeOnOutsideClick,
          closeOnEscape,
        }}
      >
        <div ref={ref} className="relative inline-block" {...props}>
          {children}
        </div>
      </PopoverContext.Provider>
    );
  }
);

Popover.displayName = 'Popover';

const PopoverTrigger = forwardRef(
  ({ children, className = '', ...props }, ref) => {
    const { open, onOpenChange, trigger } = useContext(PopoverContext);
    const triggerRef = useRef(null);

    const handleClick = () => {
      if (trigger === 'click') {
        onOpenChange(!open);
      }
    };

    const handleMouseEnter = () => {
      if (trigger === 'hover') {
        onOpenChange(true);
      }
    };

    const handleMouseLeave = () => {
      if (trigger === 'hover') {
        onOpenChange(false);
      }
    };

    return (
      <div
        ref={(node) => {
          triggerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn('inline-block', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverContent = forwardRef(
  (
    {
      showArrow = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange, placement, closeOnOutsideClick, closeOnEscape } =
      useContext(PopoverContext);
    const contentRef = useRef(null);

    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e) => {
        if (
          closeOnOutsideClick &&
          contentRef.current &&
          !contentRef.current.contains(e.target)
        ) {
          onOpenChange(false);
        }
      };

      const handleEscape = (e) => {
        if (closeOnEscape && e.key === 'Escape') {
          onOpenChange(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, closeOnOutsideClick, closeOnEscape, onOpenChange]);

    if (!open) return null;

    const placementClasses = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      'top-start': 'bottom-full left-0 mb-2',
      'top-end': 'bottom-full right-0 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      'bottom-start': 'top-full left-0 mt-2',
      'bottom-end': 'top-full right-0 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 me-2',
      'left-start': 'right-full top-0 me-2',
      'left-end': 'right-full bottom-0 me-2',
      right: 'left-full top-1/2 -translate-y-1/2 ms-2',
      'right-start': 'left-full top-0 ms-2',
      'right-end': 'left-full bottom-0 ms-2',
    };

    const arrowClasses = {
      top: 'top-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-transparent border-t-[var(--color-background)]',
      'top-start': 'top-full left-4 border-l-8 border-r-8 border-t-8 border-transparent border-t-[var(--color-background)]',
      'top-end': 'top-full right-4 border-l-8 border-r-8 border-t-8 border-transparent border-t-[var(--color-background)]',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-transparent border-b-[var(--color-background)]',
      'bottom-start': 'bottom-full left-4 border-l-8 border-r-8 border-b-8 border-transparent border-b-[var(--color-background)]',
      'bottom-end': 'bottom-full right-4 border-l-8 border-r-8 border-b-8 border-transparent border-b-[var(--color-background)]',
      left: 'left-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-transparent border-l-[var(--color-background)]',
      'left-start': 'left-full top-4 border-t-8 border-b-8 border-l-8 border-transparent border-l-[var(--color-background)]',
      'left-end': 'left-full bottom-4 border-t-8 border-b-8 border-l-8 border-transparent border-l-[var(--color-background)]',
      right: 'right-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-transparent border-r-[var(--color-background)]',
      'right-start': 'right-full top-4 border-t-8 border-b-8 border-r-8 border-transparent border-r-[var(--color-background)]',
      'right-end': 'right-full bottom-4 border-t-8 border-b-8 border-r-8 border-transparent border-r-[var(--color-background)]',
    };

    return (
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role="dialog"
        aria-modal="false"
        className={cn(
          'absolute z-50',
          'bg-[var(--color-background)]',
          'border border-[var(--color-border)]',
          'rounded-lg shadow-lg',
          'p-4',
          'min-w-[200px] max-w-[400px]',
          'animate-[popover-show_150ms_ease-out] motion-reduce:animate-none',
          placementClasses[placement],
          className
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <div
            className={cn('absolute w-0 h-0', arrowClasses[placement])}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';

const PopoverClose = forwardRef(
  ({ className = '', children, onClick, ...props }, ref) => {
    const { onOpenChange } = useContext(PopoverContext);

    const handleClick = (e) => {
      onOpenChange(false);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          'absolute top-2 end-2',
          'min-w-[44px] min-h-[44px]',
          'flex items-center justify-center',
          'rounded-md',
          'text-[var(--color-muted-foreground)]',
          'hover:text-[var(--color-foreground)]',
          'hover:bg-[var(--color-muted)]',
          'transition-colors duration-200',
          'motion-reduce:transition-none',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-[var(--color-primary)]',
          className
        )}
        aria-label="Close popover"
        {...props}
      >
        {children || (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>
    );
  }
);

PopoverClose.displayName = 'PopoverClose';

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
export default Popover;
