# Nexus UI - Enterprise Design System 2025

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![WCAG](https://img.shields.io/badge/WCAG-3.0-brightgreen.svg)
![RTL](https://img.shields.io/badge/RTL-Supported-orange.svg)

**A world-class React component library built with 2025 web standards**

[Demo](#demo) • [Documentation](#documentation) • [Components](#components) • [Features](#features)

</div>

---

## 🌟 Overview

Nexus UI is a production-grade, enterprise-level React component library designed to match and exceed industry leaders like shadcn/ui, Radix UI, and Material-UI. Built from the ground up with modern web standards, accessibility, and developer experience in mind.

### Why Nexus UI?

- ✅ **2025 Web Standards**: OKLCH colors, Container Queries, CSS Nesting, View Transitions API
- ✅ **WCAG 3.0 Compliant**: APCA contrast, ARIA 1.3 patterns, full keyboard navigation
- ✅ **RTL/Arabic Support**: Perfect right-to-left support with logical properties
- ✅ **Tree-shakeable**: Import only what you need
- ✅ **TypeScript Ready**: Comprehensive JSDoc types for all components
- ✅ **Zero Dependencies**: Only React and Lucide Icons
- ✅ **Fully Customizable**: CSS variables, design tokens, theme system

---

## 🚀 Quick Start

### Installation

```bash
# Clone or download the Nexus UI library
git clone <repository-url>
cd nexus-ui

# Install dependencies
npm install react react-dom lucide-react
```

### Usage

```jsx
import React from 'react';
import Button from './components/Button';
import { Card, CardHeader, CardTitle, CardBody } from './components/Card';
import Badge from './components/Badge';
import './styles/globals.css';

function App() {
  return (
    <div>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Welcome to Nexus UI</CardTitle>
        </CardHeader>
        <CardBody>
          <p>World-class React components ready to use.</p>
          <Button variant="primary" size="md">
            Get Started
          </Button>
          <Badge variant="success">New</Badge>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
```

---

## 📦 Components

### Core Components

| Component | Variants | Sizes | Features |
|-----------|----------|-------|----------|
| **Button** | 8 variants | 6 sizes | Loading, disabled, icons, polymorphic |
| **Card** | 6 variants | 5 padding sizes | Compound pattern, hoverable, clickable |
| **Badge** | 8 variants | 5 sizes | Solid, outline, subtle, dot, removable |
| **Alert** | 5 variants | - | Compound pattern, dismissible, ARIA live |
| **Input** | 4 variants | 5 sizes | Icons, validation, helper text |
| **Avatar** | - | 6 sizes | Image, initials, icon, status indicator |
| **Switch** | - | 3 sizes | Label, disabled, keyboard navigation |
| **Progress** | 6 variants | 3 sizes | Determinate, indeterminate, value label |
| **Spinner** | 4 variants | 5 sizes | ARIA, reduced motion |
| **Skeleton** | 4 variants | Custom | Pulse animation, reduced motion |

### Component Details

#### Button

**8 Variants:** primary, secondary, outline, ghost, link, destructive, success, warning

**6 Sizes:** xs (28px), sm (36px), md (44px), lg (48px), xl (56px), 2xl (64px)

**Features:**
- Loading states with animated spinner
- Left/right icon support
- Icon-only (circular) mode
- Polymorphic (`as` prop) - render as link, div, etc.
- Full keyboard navigation
- WCAG 3.0 compliant
- Touch targets ≥ 44×44px

```jsx
<Button variant="primary" size="md" leftIcon={<Icon />}>
  Click me
</Button>

<Button variant="outline" loading>
  Loading...
</Button>

<Button as="a" href="/link" variant="link">
  Link Button
</Button>
```

#### Card (Compound Component)

**6 Variants:** default, elevated, outline, flat, gradient, glassmorphism

**Compound Components:**
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title element
- `CardDescription` - Description text
- `CardBody` - Main content
- `CardFooter` - Footer with actions

```jsx
<Card variant="elevated" hoverable>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description here</CardDescription>
  </CardHeader>
  <CardBody>
    Main content goes here
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Badge

**8 Variants:** default, primary, secondary, success, warning, error, info, neutral

**4 Styles:** solid, outline, subtle, dot

**5 Sizes:** xs, sm, md, lg, xl

```jsx
<Badge variant="success">Active</Badge>
<Badge variant="primary" style="outline">Outline</Badge>
<Badge variant="error" dot>With Dot</Badge>
<Badge variant="warning" onRemove={() => {}}>Removable</Badge>
```

#### Alert (Compound Component)

**5 Variants:** info, success, warning, error, neutral

**Compound Components:**
- `Alert` - Main container with ARIA live region
- `AlertTitle` - Alert title
- `AlertDescription` - Alert description

```jsx
<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your action was completed.</AlertDescription>
</Alert>

<Alert variant="error" onClose={() => {}}>
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

#### Input

**4 Variants:** default, filled, outline, underline

**5 Sizes:** xs, sm, md, lg, xl

**Features:**
- Left/right icon support
- Error and success states
- Helper text and error messages
- Label support
- ARIA attributes

```jsx
<Input
  variant="default"
  size="md"
  label="Email"
  type="email"
  placeholder="email@example.com"
  leftIcon={<MailIcon />}
  helperText="We'll never share your email"
/>

<Input
  error
  errorText="This field is required"
  label="Password"
/>
```

---

## 🎨 Design Tokens

### Color System (OKLCH)

Nexus UI uses the OKLCH color space for perceptually uniform colors:

```css
/* Primary - Blue */
--color-primary-500: oklch(0.55 0.25 250);  /* Base */
--color-primary-600: oklch(0.45 0.25 250);  /* Darker */

/* Success - Green */
--color-success-500: oklch(0.65 0.20 145);  /* Base */

/* Error - Red */
--color-error-500: oklch(0.55 0.22 25);     /* Base */

/* Warning - Amber */
--color-warning-500: oklch(0.75 0.15 85);   /* Base */
```

### Spacing (8pt Grid)

```css
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-4: 1rem;     /* 16px */
--spacing-8: 2rem;     /* 32px */
```

### Typography

```css
--font-sans: system-ui, -apple-system, sans-serif;
--font-arabic: "Tajawal", "Cairo", system-ui, sans-serif;

--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
```

### Shadows (Elevation)

```css
--shadow-sm: 0 1px 3px 0 oklch(0 0 0 / 0.1);
--shadow-md: 0 10px 15px -3px oklch(0 0 0 / 0.1);
--shadow-lg: 0 20px 25px -5px oklch(0 0 0 / 0.1);
```

---

## 🎯 Features

### Accessibility (WCAG 3.0)

- **APCA Contrast**: Advanced Perceptual Contrast Algorithm (replacing 4.5:1 ratios)
- **ARIA 1.3**: Latest ARIA patterns and roles
- **Keyboard Navigation**: Full Tab, Enter, Space, Arrow keys, Escape support
- **Screen Reader**: Optimized with aria-label, aria-describedby, role, live regions
- **Focus Visible**: Visible for keyboard, hidden for mouse
- **Touch Targets**: Minimum 44×44px for all interactive elements
- **Reduced Motion**: Respects `prefers-reduced-motion`

### RTL Support

Perfect right-to-left support for Arabic and other RTL languages:

- Logical properties (`margin-inline-start` instead of `margin-left`)
- Automatic icon flipping
- Direction-aware layouts
- Arabic typography optimization

```jsx
// Set RTL mode
document.documentElement.setAttribute('dir', 'rtl');
```

### Theme System

Light/dark mode with system preference detection:

```jsx
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
```

### Custom Hooks

#### useTheme

```jsx
const { theme, setTheme, toggleTheme, systemTheme, isDark } = useTheme();
```

#### useMediaQuery

```jsx
const isMobile = useMediaQuery('(max-width: 768px)');
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
```

#### useDisclosure

```jsx
const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
```

#### useToast

```jsx
const { toast, success, error, warning, info } = useToast();

toast({ title: 'Hello!', description: 'Message' });
success({ title: 'Success!' });
error({ title: 'Error!' });
```

### Utility Functions

#### cn (className merger)

```jsx
import { cn } from './lib/utils';

cn('px-4 py-2', isActive && 'bg-blue-500', 'rounded-md');
// => 'px-4 py-2 bg-blue-500 rounded-md'
```

#### cva (Class Variance Authority)

```jsx
import { cva } from './lib/utils';

const button = cva({
  base: 'font-semibold rounded',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-gray-900'
    }
  }
});

button({ variant: 'primary' });
// => 'font-semibold rounded bg-blue-500 text-white'
```

---

## 📁 Project Structure

```
nexus-ui/
├── components/          # Component library
│   ├── Button.jsx      # Button component
│   ├── Card.jsx        # Card compound component
│   ├── Badge.jsx       # Badge component
│   ├── Alert.jsx       # Alert compound component
│   ├── Input.jsx       # Input component
│   ├── Avatar.jsx      # Avatar component
│   ├── Switch.jsx      # Switch/Toggle component
│   ├── Spinner.jsx     # Loading spinner
│   ├── Skeleton.jsx    # Loading skeleton
│   └── Progress.jsx    # Progress bar
│
├── hooks/              # Custom React hooks
│   ├── useTheme.js     # Theme management
│   ├── useMediaQuery.js # Media query listener
│   ├── useDisclosure.js # Open/close state
│   └── useToast.js     # Toast notifications
│
├── lib/                # Utility functions
│   └── utils.js        # cn, cva, helpers
│
├── styles/             # Global styles
│   ├── tokens.css      # Design tokens (CSS variables)
│   └── globals.css     # Global styles and resets
│
├── Showcase.jsx        # Comprehensive component showcase
├── design_sys.jsx      # Original design system (for reference)
└── README.md           # This file
```

---

## 🌐 Browser Support

- Chrome/Edge 120+
- Firefox 120+
- Safari 17+
- Mobile browsers (iOS Safari 17+, Chrome Android)

**Modern Features Used:**
- CSS Container Queries
- CSS Nesting
- `:has()` selector
- `:focus-visible`
- OKLCH color space
- View Transitions API (progressive enhancement)

---

## 🎓 Best Practices

### Component Usage

```jsx
// ✅ Good - Semantic, accessible
<Button variant="primary" size="md" leftIcon={<Icon />}>
  Submit Form
</Button>

// ❌ Bad - No semantic meaning
<div onClick={handleClick}>Submit</div>
```

### Accessibility

```jsx
// ✅ Good - Proper ARIA labels
<Button aria-label="Close dialog" iconOnly>
  <X />
</Button>

// ❌ Bad - No label for screen readers
<Button iconOnly>
  <X />
</Button>
```

### Theme Integration

```jsx
// ✅ Good - Use design tokens
className="text-[var(--color-primary)]"

// ❌ Bad - Hardcoded colors
className="text-blue-500"
```

---

## 🤝 Contributing

Nexus UI is designed to be extended and customized:

1. **Add New Components**: Follow the existing patterns
2. **Extend Variants**: Add new color schemes or sizes
3. **Customize Tokens**: Modify `styles/tokens.css`
4. **Improve Accessibility**: We welcome ARIA improvements

---

## 📄 License

MIT License - feel free to use in personal and commercial projects.

---

## 🏆 Credits

Built with inspiration from:
- **shadcn/ui** - Composition patterns and clean API
- **Radix UI** - Accessibility primitives
- **Material-UI** - Comprehensive features
- **Chakra UI** - Developer experience
- **Tailwind UI** - Design polish

Implemented with 2025 standards:
- OKLCH colors for perceptual uniformity
- WCAG 3.0 / APCA contrast guidelines
- ARIA 1.3 accessibility patterns
- Modern CSS (Container Queries, Nesting, `:has()`)
- View Transitions API
- Logical properties for RTL

---

## 📞 Support

For questions, issues, or feature requests:
- Open an issue on GitHub
- Check the documentation
- Review the Showcase.jsx for examples

---

<div align="center">

**Built with ❤️ for the modern web**

OKLCH Colors • WCAG 3.0 • ARIA 1.3 • RTL Support • 2025 Standards

</div>
