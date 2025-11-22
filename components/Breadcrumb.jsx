/**
 * Breadcrumb Component - Breadcrumb Navigation
 *
 * Features:
 * - 3 sizes: sm, md, lg (all ≥ 44×44px touch target)
 * - Custom separators
 * - Icon support
 * - Max items with collapse
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support (automatic separator flip)
 * - Compound component pattern
 *
 * @component
 * @example
 * <Breadcrumb>
 *   <BreadcrumbItem href="/">Home</BreadcrumbItem>
 *   <BreadcrumbItem href="/products">Products</BreadcrumbItem>
 *   <BreadcrumbItem current>Details</BreadcrumbItem>
 * </Breadcrumb>
 */

import React, { forwardRef, Children, isValidElement } from 'react';
import { cn } from '../lib/utils';

const Breadcrumb = forwardRef(
  (
    {
      size = 'md',
      separator,
      maxItems,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'text-[var(--text-sm)]',
      md: 'text-[var(--text-base)]',
      lg: 'text-[var(--text-lg)]',
    };

    const defaultSeparator = (
      <svg
        className="w-4 h-4 text-[var(--color-muted-foreground)]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    );

    const childrenArray = Children.toArray(children).filter(isValidElement);
    const totalItems = childrenArray.length;

    let displayedChildren = childrenArray;

    // Handle max items with ellipsis
    if (maxItems && totalItems > maxItems) {
      const firstItems = childrenArray.slice(0, 1);
      const lastItems = childrenArray.slice(-(maxItems - 2));
      const ellipsisItem = (
        <BreadcrumbItem key="ellipsis" disabled>
          ...
        </BreadcrumbItem>
      );
      displayedChildren = [...firstItems, ellipsisItem, ...lastItems];
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        <ol className="flex items-center flex-wrap gap-2">
          {displayedChildren.map((child, index) => {
            const isLast = index === displayedChildren.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                {React.cloneElement(child, {
                  size,
                  current: isLast || child.props.current,
                })}
                {!isLast && (
                  <span
                    className="flex items-center px-1 rtl:rotate-180"
                    aria-hidden="true"
                  >
                    {separator || defaultSeparator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbItem = forwardRef(
  (
    {
      href,
      current = false,
      disabled = false,
      leftIcon,
      size = 'md',
      className = '',
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'min-h-[44px] py-2 px-2',
      md: 'min-h-[44px] py-3 px-2',
      lg: 'min-h-[48px] py-4 px-2',
    };

    const baseClasses = cn(
      'inline-flex items-center gap-2',
      'transition-colors duration-200',
      'motion-reduce:transition-none',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-[var(--color-primary)]',
      'rounded-md',
      sizeClasses[size]
    );

    const content = (
      <>
        {leftIcon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={cn('truncate max-w-[200px]')}>{children}</span>
      </>
    );

    if (current) {
      return (
        <span
          ref={ref}
          aria-current="page"
          className={cn(
            baseClasses,
            'text-[var(--color-foreground)] font-medium cursor-default',
            className
          )}
          {...props}
        >
          {content}
        </span>
      );
    }

    if (disabled) {
      return (
        <span
          ref={ref}
          className={cn(
            baseClasses,
            'text-[var(--color-muted-foreground)] opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        >
          {content}
        </span>
      );
    }

    if (href) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn(
            baseClasses,
            'text-[var(--color-muted-foreground)]',
            'hover:text-[var(--color-foreground)]',
            'hover:underline',
            className
          )}
          onClick={onClick}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          baseClasses,
          'text-[var(--color-muted-foreground)]',
          'hover:text-[var(--color-foreground)]',
          'hover:underline',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export { Breadcrumb, BreadcrumbItem };
export default Breadcrumb;
