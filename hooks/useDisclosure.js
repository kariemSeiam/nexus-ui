/**
 * useDisclosure Hook
 * Manages open/close state for modals, drawers, dropdowns, etc.
 * Common pattern in modern component libraries
 */

import { useState, useCallback } from 'react';

/**
 * Hook for managing disclosure state (open/close)
 *
 * @param {boolean} initialState - Initial open state (default: false)
 * @returns {Object} Disclosure state and controls
 * @returns {boolean} returns.isOpen - Whether the disclosure is open
 * @returns {Function} returns.onOpen - Function to open
 * @returns {Function} returns.onClose - Function to close
 * @returns {Function} returns.onToggle - Function to toggle
 * @returns {Function} returns.getDisclosureProps - Props getter for disclosure element
 * @returns {Function} returns.getTriggerProps - Props getter for trigger element
 *
 * @example
 * const { isOpen, onOpen, onClose, onToggle, getTriggerProps, getDisclosureProps } = useDisclosure();
 *
 * return (
 *   <>
 *     <button {...getTriggerProps()}>Toggle Modal</button>
 *     <Modal {...getDisclosureProps()}>
 *       <h2>Modal Content</h2>
 *       <button onClick={onClose}>Close</button>
 *     </Modal>
 *   </>
 * );
 */
export function useDisclosure(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const getDisclosureProps = useCallback(
    (props = {}) => ({
      ...props,
      'aria-hidden': !isOpen,
      hidden: !isOpen,
    }),
    [isOpen]
  );

  const getTriggerProps = useCallback(
    (props = {}) => ({
      ...props,
      'aria-expanded': isOpen,
      'aria-controls': props.id,
      onClick: (e) => {
        props.onClick?.(e);
        onToggle();
      },
    }),
    [isOpen, onToggle]
  );

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    getDisclosureProps,
    getTriggerProps,
  };
}
