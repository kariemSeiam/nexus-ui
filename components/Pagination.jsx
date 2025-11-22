/**
 * Pagination Component - Page Navigation
 *
 * Features:
 * - 3 sizes: sm, md, lg (all ≥ 44×44px touch target)
 * - 3 variants: default, outline, pills
 * - Previous/Next buttons
 * - Page numbers with ellipsis
 * - First/Last page buttons (optional)
 * - Keyboard navigation
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Forward ref
 *
 * @component
 * @example
 * <Pagination
 *   currentPage={5}
 *   totalPages={20}
 *   onPageChange={setPage}
 * />
 */

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Pagination = forwardRef(
  (
    {
      currentPage = 1,
      totalPages = 1,
      size = 'md',
      variant = 'default',
      showFirstLast = true,
      siblingCount = 1,
      className = '',
      onPageChange,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'min-w-[44px] min-h-[44px] text-sm',
      md: 'min-w-[44px] min-h-[44px] text-base',
      lg: 'min-w-[48px] min-h-[48px] text-lg',
    };

    const variantClasses = {
      default: (isActive, isDisabled) =>
        cn(
          'border border-[var(--color-border)]',
          isActive && 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]',
          !isActive && !isDisabled && 'bg-[var(--color-background)] hover:bg-[var(--color-muted)]'
        ),
      outline: (isActive, isDisabled) =>
        cn(
          'border-2 border-[var(--color-border)]',
          isActive && 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10',
          !isActive && !isDisabled && 'hover:border-[var(--color-primary)]'
        ),
      pills: (isActive, isDisabled) =>
        cn(
          'border-0',
          isActive && 'bg-[var(--color-primary)] text-white',
          !isActive && !isDisabled && 'bg-[var(--color-muted)] hover:bg-[var(--color-muted)]/80'
        ),
    };

    const generatePageNumbers = () => {
      const pages = [];
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      // Always show first page
      pages.push(1);

      // Show left dots
      if (shouldShowLeftDots) {
        pages.push('left-dots');
      }

      // Show pages around current page
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      // Show right dots
      if (shouldShowRightDots) {
        pages.push('right-dots');
      }

      // Always show last page if there's more than one page
      if (totalPages > 1) {
        pages.push(totalPages);
      }

      return pages;
    };

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange?.(page);
      }
    };

    const PageButton = ({ page, isActive = false, isDisabled = false, children, ariaLabel }) => (
      <button
        type="button"
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => handlePageChange(page)}
        className={cn(
          'inline-flex items-center justify-center',
          'rounded-md px-3',
          'font-medium transition-all duration-200',
          'motion-reduce:transition-none',
          'focus-visible:outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-[var(--color-primary)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizeClasses[size],
          variantClasses[variant](isActive, isDisabled)
        )}
      >
        {children}
      </button>
    );

    const pages = generatePageNumbers();

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn('flex items-center gap-1', className)}
        {...props}
      >
        {/* First Page Button */}
        {showFirstLast && (
          <PageButton
            page={1}
            isDisabled={currentPage === 1}
            ariaLabel="Go to first page"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </PageButton>
        )}

        {/* Previous Button */}
        <PageButton
          page={currentPage - 1}
          isDisabled={currentPage === 1}
          ariaLabel="Go to previous page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </PageButton>

        {/* Page Numbers */}
        {pages.map((page, index) => {
          if (typeof page === 'string') {
            return (
              <span
                key={`dots-${index}`}
                className={cn(
                  'inline-flex items-center justify-center',
                  sizeClasses[size],
                  'px-2 text-[var(--color-muted-foreground)]'
                )}
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          return (
            <PageButton
              key={page}
              page={page}
              isActive={page === currentPage}
              ariaLabel={`Go to page ${page}`}
            >
              {page}
            </PageButton>
          );
        })}

        {/* Next Button */}
        <PageButton
          page={currentPage + 1}
          isDisabled={currentPage === totalPages}
          ariaLabel="Go to next page"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </PageButton>

        {/* Last Page Button */}
        {showFirstLast && (
          <PageButton
            page={totalPages}
            isDisabled={currentPage === totalPages}
            ariaLabel="Go to last page"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </PageButton>
        )}
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

export default Pagination;
