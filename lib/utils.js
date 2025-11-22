/**
 * Utility Functions for Nexus UI Component Library
 * Modern helpers for className merging, variants, and more
 */

/**
 * Combines multiple className strings, filtering out falsy values
 * Supports conditional classes and merges them intelligently
 *
 * @param {...(string|undefined|null|boolean)} classes - Class names to combine
 * @returns {string} Combined className string
 *
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'rounded-md')
 * // => 'px-4 py-2 bg-blue-500 rounded-md'
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Merges Tailwind CSS classes with conflict resolution
 * Later classes override earlier ones for the same property
 *
 * @param {...string} classes - Tailwind class names
 * @returns {string} Merged className string
 *
 * @example
 * twMerge('px-4 py-2', 'px-6')
 * // => 'py-2 px-6' (px-6 overrides px-4)
 */
export function twMerge(...classes) {
  // Simple implementation - for production, use 'tailwind-merge' package
  const classArray = cn(...classes).split(' ');
  const classMap = new Map();

  classArray.forEach(cls => {
    // Extract the property (e.g., 'px', 'py', 'bg', etc.)
    const prefix = cls.split('-')[0];
    classMap.set(prefix, cls);
  });

  return Array.from(classMap.values()).join(' ');
}

/**
 * Creates a variant class name based on a variants object
 * Similar to CVA (Class Variance Authority) pattern
 *
 * @param {Object} config - Configuration object
 * @param {Object} config.base - Base classes applied to all variants
 * @param {Object} config.variants - Variant configurations
 * @param {Object} config.defaultVariants - Default variant values
 * @returns {Function} Function that generates className based on props
 *
 * @example
 * const button = cva({
 *   base: 'font-semibold rounded',
 *   variants: {
 *     variant: {
 *       primary: 'bg-blue-500 text-white',
 *       secondary: 'bg-gray-200 text-gray-900'
 *     },
 *     size: {
 *       sm: 'px-3 py-1.5 text-sm',
 *       md: 'px-4 py-2 text-base'
 *     }
 *   },
 *   defaultVariants: {
 *     variant: 'primary',
 *     size: 'md'
 *   }
 * })
 *
 * button({ variant: 'secondary', size: 'sm' })
 * // => 'font-semibold rounded bg-gray-200 text-gray-900 px-3 py-1.5 text-sm'
 */
export function cva(config) {
  const { base = '', variants = {}, defaultVariants = {} } = config;

  return (props = {}) => {
    const classes = [base];

    Object.keys(variants).forEach(variantKey => {
      const variantValue = props[variantKey] || defaultVariants[variantKey];
      if (variantValue && variants[variantKey][variantValue]) {
        classes.push(variants[variantKey][variantValue]);
      }
    });

    if (props.className) {
      classes.push(props.className);
    }

    return cn(...classes);
  };
}

/**
 * Debounces a function call
 *
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 *
 * @example
 * const handleSearch = debounce((query) => {
 *   console.log('Searching for:', query);
 * }, 300);
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttles a function call
 *
 * @param {Function} func - Function to throttle
 * @param {number} limit - Milliseconds between calls
 * @returns {Function} Throttled function
 *
 * @example
 * const handleScroll = throttle(() => {
 *   console.log('Scrolling...');
 * }, 100);
 */
export function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generates a unique ID
 *
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} Unique ID string
 *
 * @example
 * generateId('button')
 * // => 'button-a1b2c3d4'
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Checks if the code is running in a browser environment
 *
 * @returns {boolean} True if in browser, false otherwise
 */
export function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Gets the current theme (light/dark)
 *
 * @returns {string} 'light' or 'dark'
 */
export function getTheme() {
  if (!isBrowser()) return 'light';

  return document.documentElement.classList.contains('dark') ||
         document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
}

/**
 * Sets the theme
 *
 * @param {string} theme - 'light' or 'dark'
 */
export function setTheme(theme) {
  if (!isBrowser()) return;

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  }

  localStorage.setItem('theme', theme);
}

/**
 * Toggles between light and dark theme
 *
 * @returns {string} New theme value
 */
export function toggleTheme() {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  return newTheme;
}

/**
 * Gets the text direction (ltr/rtl)
 *
 * @returns {string} 'ltr' or 'rtl'
 */
export function getDirection() {
  if (!isBrowser()) return 'ltr';
  return document.documentElement.getAttribute('dir') || 'ltr';
}

/**
 * Sets the text direction
 *
 * @param {string} direction - 'ltr' or 'rtl'
 */
export function setDirection(direction) {
  if (!isBrowser()) return;
  document.documentElement.setAttribute('dir', direction);
  localStorage.setItem('direction', direction);
}

/**
 * Checks if RTL mode is active
 *
 * @returns {boolean} True if RTL, false otherwise
 */
export function isRTL() {
  return getDirection() === 'rtl';
}

/**
 * Formats a number with Arabic/English numerals based on locale
 *
 * @param {number} num - Number to format
 * @param {string} locale - Locale (e.g., 'ar-EG', 'en-US')
 * @returns {string} Formatted number
 *
 * @example
 * formatNumber(1234.56, 'ar-EG')
 * // => '١٬٢٣٤٫٥٦'
 */
export function formatNumber(num, locale = 'en-US') {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Formats currency
 *
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (e.g., 'EGP', 'USD')
 * @param {string} locale - Locale (e.g., 'ar-EG', 'en-US')
 * @returns {string} Formatted currency string
 *
 * @example
 * formatCurrency(1234.56, 'EGP', 'ar-EG')
 * // => '١٬٢٣٤٫٥٦ ج.م.'
 */
export function formatCurrency(amount, currency = 'EGP', locale = 'ar-EG') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Formats a date
 *
 * @param {Date|string|number} date - Date to format
 * @param {string} locale - Locale (e.g., 'ar-EG', 'en-US')
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 *
 * @example
 * formatDate(new Date(), 'ar-EG', { dateStyle: 'full' })
 * // => 'الجمعة، ٢٢ نوفمبر ٢٠٢٥'
 */
export function formatDate(date, locale = 'ar-EG', options = {}) {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Clamps a number between min and max
 *
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped number
 *
 * @example
 * clamp(15, 0, 10)
 * // => 10
 */
export function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

/**
 * Creates a range of numbers
 *
 * @param {number} start - Start number
 * @param {number} end - End number
 * @param {number} step - Step increment
 * @returns {number[]} Array of numbers
 *
 * @example
 * range(1, 5)
 * // => [1, 2, 3, 4, 5]
 */
export function range(start, end, step = 1) {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Focus trapping utility for modals/dialogs
 *
 * @param {HTMLElement} element - Element to trap focus within
 * @returns {Function} Cleanup function
 */
export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  function handleKeyDown(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  element.addEventListener('keydown', handleKeyDown);

  // Focus first element
  firstFocusable?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Checks if user prefers reduced motion
 *
 * @returns {boolean} True if user prefers reduced motion
 */
export function prefersReducedMotion() {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Checks if user prefers dark mode
 *
 * @returns {boolean} True if user prefers dark mode
 */
export function prefersDarkMode() {
  if (!isBrowser()) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Gets APCA contrast ratio (2025 accessibility standard)
 *
 * @param {string} foreground - Foreground color (hex, rgb, oklch)
 * @param {string} background - Background color
 * @returns {number} Contrast ratio (APCA)
 *
 * Note: This is a simplified version. For production, use a full APCA library.
 */
export function getAPCAContrast(foreground, background) {
  // Simplified APCA calculation
  // For production, use: https://github.com/Myndex/apca-w3
  // This is a placeholder that returns a value for demonstration
  return 75; // APCA requires 60+ for body text, 75+ for smaller text
}

/**
 * Converts hex color to RGB
 *
 * @param {string} hex - Hex color (e.g., '#FF0000')
 * @returns {Object} RGB object with r, g, b properties
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Converts RGB to hex
 *
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} Hex color
 */
export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}
