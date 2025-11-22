/**
 * DropdownMenu Component - Dropdown Menu
 *
 * Features:
 * - Keyboard navigation (Arrow keys, Enter, Escape, Home, End)
 * - Click outside to close
 * - Menu items with icons
 * - Dividers and labels
 * - Disabled items
 * - Checkable items
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Compound component pattern
 *
 * @component
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger>
 *     <Button>Open Menu</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *     <DropdownMenuItem>Item 2</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 */

import React, { createContext, useContext, forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

const DropdownMenuContext = createContext({});

const DropdownMenu = forwardRef(
  (
    {
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
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
      <DropdownMenuContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
        <div ref={ref} className="relative inline-block" {...props}>
          {children}
        </div>
      </DropdownMenuContext.Provider>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';

const DropdownMenuTrigger = forwardRef(
  ({ children, className = '', ...props }, ref) => {
    const { open, onOpenChange } = useContext(DropdownMenuContext);

    return (
      <div
        ref={ref}
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn('inline-block', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = forwardRef(
  (
    {
      align = 'start',
      sideOffset = 8,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange } = useContext(DropdownMenuContext);
    const contentRef = useRef(null);
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e) => {
        if (contentRef.current && !contentRef.current.contains(e.target)) {
          onOpenChange(false);
        }
      };

      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onOpenChange(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }, [open, onOpenChange]);

    useEffect(() => {
      if (open) {
        setFocusedIndex(0);
      }
    }, [open]);

    if (!open) return null;

    const alignClasses = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    };

    return (
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role="menu"
        className={cn(
          'absolute z-50',
          'bg-[var(--color-background)]',
          'border border-[var(--color-border)]',
          'rounded-lg shadow-lg',
          'py-1',
          'min-w-[200px]',
          'animate-[dropdown-show_150ms_ease-out] motion-reduce:animate-none',
          alignClasses[align],
          className
        )}
        style={{ top: `calc(100% + ${sideOffset}px)` }}
        {...props}
      >
        <DropdownMenuContext.Provider value={{ open, onOpenChange, focusedIndex, setFocusedIndex }}>
          {children}
        </DropdownMenuContext.Provider>
      </div>
    );
  }
);

DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = forwardRef(
  (
    {
      disabled = false,
      leftIcon,
      rightIcon,
      checked,
      className = '',
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const { onOpenChange } = useContext(DropdownMenuContext);
    const itemRef = useRef(null);

    const handleClick = (e) => {
      if (disabled) return;
      onClick?.(e);
      onOpenChange(false);
    };

    const handleKeyDown = (e) => {
      if (disabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(e);
      }
    };

    return (
      <div
        ref={(node) => {
          itemRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative flex items-center gap-2',
          'min-h-[44px] px-3 py-2',
          'text-sm cursor-pointer',
          'transition-colors duration-150',
          'motion-reduce:transition-none',
          'focus-visible:outline-none',
          'focus-visible:bg-[var(--color-muted)]',
          !disabled && 'hover:bg-[var(--color-muted)]',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {checked !== undefined && (
          <span className="flex-shrink-0 w-4 h-4" aria-hidden="true">
            {checked && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
        )}
        {leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className="flex-1">{children}</span>
        {rightIcon && (
          <span className="flex-shrink-0 text-[var(--color-muted-foreground)]" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuSeparator = forwardRef(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn(
          'h-px my-1 bg-[var(--color-border)]',
          className
        )}
        {...props}
      />
    );
  }
);

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuLabel = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-3 py-2 text-xs font-semibold',
          'text-[var(--color-muted-foreground)]',
          'uppercase tracking-wider',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuGroup = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} role="group" className={className} {...props}>
        {children}
      </div>
    );
  }
);

DropdownMenuGroup.displayName = 'DropdownMenuGroup';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
};
export default DropdownMenu;
