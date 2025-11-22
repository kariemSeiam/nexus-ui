/**
 * Dialog Component - Modal Dialog
 *
 * Features:
 * - 4 sizes: sm, md, lg, xl
 * - Focus trap
 * - Escape key to close
 * - Click outside to close (optional)
 * - Backdrop overlay
 * - Smooth transitions
 * - Scroll lock when open
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Compound component pattern
 *
 * @component
 * @example
 * <Dialog open={isOpen} onOpenChange={setIsOpen}>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Title</DialogTitle>
 *       <DialogDescription>Description</DialogDescription>
 *     </DialogHeader>
 *     <DialogBody>Content</DialogBody>
 *     <DialogFooter>
 *       <Button onClick={() => setIsOpen(false)}>Close</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 */

import React, { createContext, useContext, forwardRef, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

const DialogContext = createContext({});

const Dialog = forwardRef(
  (
    {
      open = false,
      onOpenChange,
      closeOnBackdrop = true,
      closeOnEscape = true,
      children,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (open) {
        // Lock scroll when dialog opens
        document.body.style.overflow = 'hidden';

        // Handle escape key
        const handleEscape = (e) => {
          if (closeOnEscape && e.key === 'Escape') {
            onOpenChange?.(false);
          }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
          document.body.style.overflow = '';
          document.removeEventListener('keydown', handleEscape);
        };
      }
    }, [open, closeOnEscape, onOpenChange]);

    if (!open) return null;

    return (
      <DialogContext.Provider value={{ open, onOpenChange, closeOnBackdrop }}>
        <div ref={ref} {...props}>
          {children}
        </div>
      </DialogContext.Provider>
    );
  }
);

Dialog.displayName = 'Dialog';

const DialogContent = forwardRef(
  (
    {
      size = 'md',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const { onOpenChange, closeOnBackdrop } = useContext(DialogContext);
    const contentRef = useRef(null);
    const combinedRef = ref || contentRef;

    const sizeClasses = {
      sm: 'max-w-[var(--dialog-sm)]',
      md: 'max-w-[var(--dialog-md)]',
      lg: 'max-w-[var(--dialog-lg)]',
      xl: 'max-w-[var(--dialog-xl)]',
      full: 'max-w-full',
    };

    useEffect(() => {
      // Focus trap
      const content = combinedRef.current;
      if (!content) return;

      const focusableElements = content.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTab = (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      firstElement?.focus();
      document.addEventListener('keydown', handleTab);

      return () => {
        document.removeEventListener('keydown', handleTab);
      };
    }, [combinedRef]);

    const handleBackdropClick = (e) => {
      if (closeOnBackdrop && e.target === e.currentTarget) {
        onOpenChange?.(false);
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none"
          aria-hidden="true"
        />

        {/* Dialog */}
        <div
          ref={combinedRef}
          role="dialog"
          aria-modal="true"
          className={cn(
            'relative z-10 w-full',
            'bg-[var(--color-background)]',
            'rounded-lg shadow-xl',
            'max-h-[calc(100vh-4rem)] overflow-y-auto',
            'animate-[dialog-show_200ms_ease-out] motion-reduce:animate-none',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

DialogContent.displayName = 'DialogContent';

const DialogHeader = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-4 p-6 pb-4',
          'border-b border-[var(--color-border)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogHeader.displayName = 'DialogHeader';

const DialogTitle = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          'text-[var(--text-2xl)] font-semibold text-[var(--color-foreground)]',
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);

DialogTitle.displayName = 'DialogTitle';

const DialogDescription = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-[var(--text-sm)] text-[var(--color-muted-foreground)]',
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

DialogDescription.displayName = 'DialogDescription';

const DialogBody = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogBody.displayName = 'DialogBody';

const DialogFooter = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-end gap-4 p-6 pt-4',
          'border-t border-[var(--color-border)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DialogFooter.displayName = 'DialogFooter';

const DialogClose = forwardRef(
  ({ className = '', children, onClick, ...props }, ref) => {
    const { onOpenChange } = useContext(DialogContext);

    const handleClick = (e) => {
      onOpenChange?.(false);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={cn(
          'absolute top-4 end-4',
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
        aria-label="Close dialog"
        {...props}
      >
        {children || (
          <svg
            className="w-5 h-5"
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

DialogClose.displayName = 'DialogClose';

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose };
export default Dialog;
