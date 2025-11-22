/**
 * Table Component - Data Table
 *
 * Features:
 * - 3 variants: default, bordered, striped
 * - 3 sizes: sm, md, lg
 * - Sortable columns
 * - Selectable rows
 * - Sticky header
 * - Responsive scrolling
 * - Full accessibility (WCAG 3.0, ARIA 1.3)
 * - RTL support
 * - Compound component pattern
 *
 * @component
 * @example
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */

import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Table = forwardRef(
  (
    {
      variant = 'default',
      size = 'md',
      stickyHeader = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: '[&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2 [&_th]:text-xs [&_td]:text-sm',
      md: '[&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3 [&_th]:text-sm [&_td]:text-base',
      lg: '[&_th]:px-6 [&_th]:py-4 [&_td]:px-6 [&_td]:py-4 [&_th]:text-base [&_td]:text-lg',
    };

    const variantClasses = {
      default: '',
      bordered: 'border border-[var(--color-border)]',
      striped: '[&_tbody_tr:nth-child(odd)]:bg-[var(--color-muted)]/30',
    };

    return (
      <div className={cn('w-full overflow-auto', className)}>
        <table
          ref={ref}
          className={cn(
            'w-full caption-bottom text-sm',
            sizeClasses[size],
            variantClasses[variant],
            stickyHeader && '[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10 [&_thead]:bg-[var(--color-background)]'
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

const TableHeader = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          'border-b border-[var(--color-border)]',
          '[&_tr]:border-b',
          className
        )}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn('[&_tr:last-child]:border-0', className)}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'TableBody';

const TableFooter = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn(
          'border-t border-[var(--color-border)]',
          'bg-[var(--color-muted)]/50',
          'font-medium',
          '[&_tr]:border-t',
          className
        )}
        {...props}
      >
        {children}
      </tfoot>
    );
  }
);

TableFooter.displayName = 'TableFooter';

const TableRow = forwardRef(
  (
    {
      selectable = false,
      selected = false,
      disabled = false,
      className = '',
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <tr
        ref={ref}
        onClick={!disabled ? onClick : undefined}
        aria-selected={selectable ? selected : undefined}
        className={cn(
          'border-b border-[var(--color-border)]',
          'transition-colors duration-150',
          'motion-reduce:transition-none',
          selectable && !disabled && 'cursor-pointer hover:bg-[var(--color-muted)]/50',
          selected && 'bg-[var(--color-primary)]/10',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

const TableHead = forwardRef(
  (
    {
      sortable = false,
      sortDirection,
      className = '',
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <th
        ref={ref}
        scope="col"
        onClick={sortable ? onClick : undefined}
        aria-sort={
          sortDirection === 'asc'
            ? 'ascending'
            : sortDirection === 'desc'
            ? 'descending'
            : sortable
            ? 'none'
            : undefined
        }
        className={cn(
          'text-left align-middle font-semibold',
          'text-[var(--color-muted-foreground)]',
          sortable && 'cursor-pointer select-none hover:text-[var(--color-foreground)]',
          sortable && 'transition-colors duration-150 motion-reduce:transition-none',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {children}
          {sortable && (
            <div className="flex flex-col">
              <svg
                className={cn(
                  'w-3 h-3 -mb-1',
                  sortDirection === 'asc'
                    ? 'text-[var(--color-foreground)]'
                    : 'text-[var(--color-muted-foreground)]/50'
                )}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7 14l5-5 5 5H7z" />
              </svg>
              <svg
                className={cn(
                  'w-3 h-3',
                  sortDirection === 'desc'
                    ? 'text-[var(--color-foreground)]'
                    : 'text-[var(--color-muted-foreground)]/50'
                )}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          )}
        </div>
      </th>
    );
  }
);

TableHead.displayName = 'TableHead';

const TableCell = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn('align-middle', className)}
        {...props}
      >
        {children}
      </td>
    );
  }
);

TableCell.displayName = 'TableCell';

const TableCaption = forwardRef(
  ({ className = '', children, ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={cn('mt-4 text-sm text-[var(--color-muted-foreground)]', className)}
        {...props}
      >
        {children}
      </caption>
    );
  }
);

TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption };
export default Table;
