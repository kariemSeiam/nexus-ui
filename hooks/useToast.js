/**
 * useToast Hook
 * Toast notification system with queue management
 * Supports multiple toast types and auto-dismiss
 */

import { useState, useCallback, useEffect } from 'react';
import { generateId } from '../lib/utils';

let toastCounter = 0;
const toastListeners = new Set();

/**
 * Toast state manager (singleton pattern)
 */
const toastState = {
  toasts: [],
  addToast(toast) {
    this.toasts = [...this.toasts, toast];
    this.notify();
  },
  removeToast(id) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  },
  notify() {
    toastListeners.forEach(listener => listener(this.toasts));
  },
  subscribe(listener) {
    toastListeners.add(listener);
    return () => toastListeners.delete(listener);
  },
};

/**
 * Hook for managing toast notifications
 *
 * @returns {Object} Toast controls
 * @returns {Array} returns.toasts - Current toasts array
 * @returns {Function} returns.toast - Function to show a toast
 * @returns {Function} returns.success - Show success toast
 * @returns {Function} returns.error - Show error toast
 * @returns {Function} returns.warning - Show warning toast
 * @returns {Function} returns.info - Show info toast
 * @returns {Function} returns.dismiss - Dismiss a specific toast
 * @returns {Function} returns.dismissAll - Dismiss all toasts
 *
 * @example
 * const { toast, success, error } = useToast();
 *
 * // Basic toast
 * toast({ title: 'Hello!', description: 'This is a toast message' });
 *
 * // Success toast
 * success({ title: 'Success!', description: 'Operation completed' });
 *
 * // Error toast
 * error({ title: 'Error!', description: 'Something went wrong' });
 */
export function useToast() {
  const [toasts, setToasts] = useState(toastState.toasts);

  useEffect(() => {
    return toastState.subscribe(setToasts);
  }, []);

  const toast = useCallback(
    ({
      title,
      description,
      variant = 'default',
      duration = 5000,
      action,
      onClose,
    } = {}) => {
      const id = generateId('toast');

      const newToast = {
        id,
        title,
        description,
        variant,
        action,
        onClose,
        createdAt: Date.now(),
      };

      toastState.addToast(newToast);

      // Auto-dismiss
      if (duration > 0) {
        setTimeout(() => {
          toastState.removeToast(id);
          onClose?.();
        }, duration);
      }

      return id;
    },
    []
  );

  const success = useCallback(
    (options) => toast({ ...options, variant: 'success' }),
    [toast]
  );

  const error = useCallback(
    (options) => toast({ ...options, variant: 'error' }),
    [toast]
  );

  const warning = useCallback(
    (options) => toast({ ...options, variant: 'warning' }),
    [toast]
  );

  const info = useCallback(
    (options) => toast({ ...options, variant: 'info' }),
    [toast]
  );

  const dismiss = useCallback((id) => {
    toastState.removeToast(id);
  }, []);

  const dismissAll = useCallback(() => {
    toastState.toasts = [];
    toastState.notify();
  }, []);

  return {
    toasts,
    toast,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
  };
}
