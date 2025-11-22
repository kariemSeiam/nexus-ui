/**
 * useTheme Hook
 * Manages theme state (light/dark mode) with system preference detection
 * Syncs with localStorage and system preferences
 */

import { useState, useEffect } from 'react';
import { getTheme, setTheme as setThemeUtil, prefersDarkMode } from '../lib/utils';

/**
 * Hook for managing theme state
 *
 * @returns {Object} Theme state and controls
 * @returns {string} returns.theme - Current theme ('light' or 'dark')
 * @returns {Function} returns.setTheme - Function to set theme
 * @returns {Function} returns.toggleTheme - Function to toggle theme
 * @returns {string} returns.systemTheme - System preferred theme
 * @returns {boolean} returns.isDark - Whether dark mode is active
 *
 * @example
 * const { theme, setTheme, toggleTheme, isDark } = useTheme();
 *
 * return (
 *   <button onClick={toggleTheme}>
 *     {isDark ? 'Light Mode' : 'Dark Mode'}
 *   </button>
 * );
 */
export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    // Initialize from localStorage or system preference
    if (typeof window === 'undefined') return 'light';

    const stored = localStorage.getItem('theme');
    if (stored) return stored;

    return prefersDarkMode() ? 'dark' : 'light';
  });

  const [systemTheme, setSystemTheme] = useState(() => {
    return prefersDarkMode() ? 'dark' : 'light';
  });

  useEffect(() => {
    // Apply theme to document
    setThemeUtil(theme);
  }, [theme]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);

      // If user hasn't set a preference, follow system
      const storedTheme = localStorage.getItem('theme');
      if (!storedTheme) {
        setThemeState(newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    setThemeUtil(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    systemTheme,
    isDark: theme === 'dark',
  };
}
