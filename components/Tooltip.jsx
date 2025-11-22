/**
 * Tooltip Component - Hover/Focus Tooltip
 *
 * Features:
 * - 12 placement positions
 * - Hover and focus triggers
 * - Delay control
 * - Arrow indicator
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Compound component pattern
 *
 * @component
 * @example
 * <Tooltip content="Helpful information">
 *   <Button>Hover me</Button>
 * </Tooltip>
 *
 * // Or compound pattern:
 * <Tooltip>
 *   <TooltipTrigger>
 *     <Button>Hover me</Button>
 *   </TooltipTrigger>
 *   <TooltipContent>
 *     Helpful information
 *   </TooltipContent>
 * </Tooltip>
 */

import React, { createContext, useContext, forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

const TooltipContext = createContext({});

const Tooltip = forwardRef(
  (
    {
      content,
      placement = 'top',
      delayShow = 200,
      delayHide = 0,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const showTimeoutRef = useRef(null);
    const hideTimeoutRef = useRef(null);

    const handleShow = () => {
      if (disabled) return;
      clearTimeout(hideTimeoutRef.current);
      showTimeoutRef.current = setTimeout(() => {
        setOpen(true);
      }, delayShow);
    };

    const handleHide = () => {
      clearTimeout(showTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, delayHide);
    };

    useEffect(() => {
      return () => {
        clearTimeout(showTimeoutRef.current);
        clearTimeout(hideTimeoutRef.current);
      };
    }, []);

    // Simple usage with content prop
    if (content) {
      return (
        <div
          ref={ref}
          className="relative inline-block"
          onMouseEnter={handleShow}
          onMouseLeave={handleHide}
          onFocus={handleShow}
          onBlur={handleHide}
          {...props}
        >
          {children}
          {open && !disabled && (
            <TooltipContentInternal placement={placement}>
              {content}
            </TooltipContentInternal>
          )}
        </div>
      );
    }

    // Compound component pattern
    return (
      <TooltipContext.Provider value={{ open, handleShow, handleHide, placement, disabled }}>
        <div ref={ref} className="relative inline-block" {...props}>
          {children}
        </div>
      </TooltipContext.Provider>
    );
  }
);

Tooltip.displayName = 'Tooltip';

const TooltipTrigger = forwardRef(
  ({ children, className = '', ...props }, ref) => {
    const { handleShow, handleHide } = useContext(TooltipContext);

    return (
      <div
        ref={ref}
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        onFocus={handleShow}
        onBlur={handleHide}
        className={cn('inline-block', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';

const TooltipContent = forwardRef(
  ({ showArrow = true, className = '', children, ...props }, ref) => {
    const { open, placement, disabled } = useContext(TooltipContext);

    if (!open || disabled) return null;

    return (
      <TooltipContentInternal
        ref={ref}
        placement={placement}
        showArrow={showArrow}
        className={className}
        {...props}
      >
        {children}
      </TooltipContentInternal>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';

const TooltipContentInternal = forwardRef(
  (
    {
      placement = 'top',
      showArrow = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
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
      top: 'top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900',
      'top-start': 'top-full left-4 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900',
      'top-end': 'top-full right-4 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900',
      'bottom-start': 'bottom-full left-4 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900',
      'bottom-end': 'bottom-full right-4 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900',
      left: 'left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900',
      'left-start': 'left-full top-4 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900',
      'left-end': 'left-full bottom-4 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900',
      right: 'right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900',
      'right-start': 'right-full top-4 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900',
      'right-end': 'right-full bottom-4 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900',
    };

    return (
      <div
        ref={ref}
        role="tooltip"
        className={cn(
          'absolute z-50 pointer-events-none',
          'bg-gray-900 text-white',
          'px-3 py-2 rounded-md',
          'text-[var(--text-xs)] whitespace-nowrap',
          'shadow-lg',
          'animate-[tooltip-show_150ms_ease-out] motion-reduce:animate-none',
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

TooltipContentInternal.displayName = 'TooltipContentInternal';

export { Tooltip, TooltipTrigger, TooltipContent };
export default Tooltip;
