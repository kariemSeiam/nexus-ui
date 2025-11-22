/**
 * Nexus UI - World-Class Design System Showcase
 *
 * A comprehensive demonstration of all components in the Nexus UI library
 * Built with 2025 standards: OKLCH colors, WCAG 3.0, ARIA 1.3, RTL support
 */

import React, { useState } from 'react';
import {
  Sun, Moon, Search, Mail, Lock, User, Send, Heart, Star,
  Check, Info, AlertTriangle, X, Bell, Package, Truck, ChevronRight
} from 'lucide-react';

// Import design system styles
import './styles/globals.css';

// Import components
import Button from './components/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from './components/Card';
import Badge from './components/Badge';
import { Alert, AlertTitle, AlertDescription } from './components/Alert';
import Input from './components/Input';
import Spinner from './components/Spinner';
import Skeleton from './components/Skeleton';
import Progress from './components/Progress';
import Avatar from './components/Avatar';
import Switch from './components/Switch';

// Import hooks
import { useTheme } from './hooks/useTheme';

/**
 * Main Showcase Application
 */
const Showcase = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('buttons');
  const [switchState, setSwitchState] = useState(false);
  const [progressValue, setProgressValue] = useState(45);

  // Component sections
  const tabs = [
    { id: 'buttons', label: 'Buttons', icon: null },
    { id: 'cards', label: 'Cards', icon: null },
    { id: 'badges', label: 'Badges & Alerts', icon: null },
    { id: 'forms', label: 'Form Inputs', icon: null },
    { id: 'feedback', label: 'Feedback', icon: null },
    { id: 'avatars', label: 'Avatars', icon: null },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-lg">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] flex items-center justify-center">
                <Package className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Nexus UI</h1>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  Enterprise Design System 2025
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="primary" style="subtle">
                v2.0.0
              </Badge>
              <Button
                variant="ghost"
                size="md"
                iconOnly
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <Card variant="gradient" padding="xl" className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              World-Class React Components
            </h2>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              Built with OKLCH colors, WCAG 3.0 accessibility, ARIA 1.3 patterns,
              and full RTL support. Perfect for modern web applications.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="secondary" size="lg" leftIcon={<Package />}>
                View Components
              </Button>
              <Button variant="outline" size="lg" leftIcon={<Star />} className="bg-white/10 border-white/30 hover:bg-white/20">
                Documentation
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card variant="elevated" hoverable>
            <CardBody>
              <div className="w-12 h-12 rounded-lg bg-[var(--color-success-100)] dark:bg-[var(--color-success-900)] flex items-center justify-center mb-4">
                <Check className="text-[var(--color-success-600)]" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">WCAG 3.0 Compliant</h3>
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Full accessibility with APCA contrast, ARIA 1.3, and keyboard navigation
              </p>
            </CardBody>
          </Card>
          <Card variant="elevated" hoverable>
            <CardBody>
              <div className="w-12 h-12 rounded-lg bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-900)] flex items-center justify-center mb-4">
                <Star className="text-[var(--color-primary-600)]" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">2025 Web Standards</h3>
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Container queries, CSS nesting, OKLCH colors, View Transitions API
              </p>
            </CardBody>
          </Card>
          <Card variant="elevated" hoverable>
            <CardBody>
              <div className="w-12 h-12 rounded-lg bg-[var(--color-warning-100)] dark:bg-[var(--color-warning-900)] flex items-center justify-center mb-4">
                <Bell className="text-[var(--color-warning-600)]" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">RTL Support</h3>
              <p className="text-sm text-[var(--color-muted-foreground)]">
                Perfect Arabic/RTL support with logical properties and flipped layouts
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                size="md"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Components Showcase */}
        <div className="space-y-8">
          {/* Buttons Section */}
          {activeTab === 'buttons' && (
            <div className="space-y-8">
              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>
                    8 variants with gradient backgrounds, shadows, and hover effects
                  </CardDescription>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                  </div>
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Button Sizes</CardTitle>
                  <CardDescription>
                    6 sizes from xs to 2xl, all meeting minimum 44×44px touch targets
                  </CardDescription>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" size="xs">Extra Small</Button>
                    <Button variant="primary" size="sm">Small</Button>
                    <Button variant="primary" size="md">Medium</Button>
                    <Button variant="primary" size="lg">Large</Button>
                    <Button variant="primary" size="xl">Extra Large</Button>
                    <Button variant="primary" size="2xl">2X Large</Button>
                  </div>
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Button States</CardTitle>
                  <CardDescription>
                    Loading, disabled, with icons, and icon-only variants
                  </CardDescription>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary" leftIcon={<Send />}>
                      With Icon
                    </Button>
                    <Button variant="primary" rightIcon={<ChevronRight />}>
                      Right Icon
                    </Button>
                    <Button variant="primary" loading>
                      Loading
                    </Button>
                    <Button variant="primary" disabled>
                      Disabled
                    </Button>
                    <Button variant="primary" iconOnly>
                      <Heart />
                    </Button>
                    <Button variant="outline" iconOnly>
                      <Star />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Cards Section */}
          {activeTab === 'cards' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card variant="default">
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                    <CardDescription>Standard card with shadow</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <p className="text-sm">This is the default card variant with subtle shadow and border.</p>
                  </CardBody>
                  <CardFooter>
                    <Button variant="primary" size="sm">Action</Button>
                  </CardFooter>
                </Card>

                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>Elevated Card</CardTitle>
                    <CardDescription>Enhanced shadow depth</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <p className="text-sm">Elevated card with larger shadow for emphasis.</p>
                  </CardBody>
                  <CardFooter>
                    <Button variant="primary" size="sm">Action</Button>
                  </CardFooter>
                </Card>

                <Card variant="outline">
                  <CardHeader>
                    <CardTitle>Outline Card</CardTitle>
                    <CardDescription>Border only, no shadow</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <p className="text-sm">Minimal design with border and no shadow.</p>
                  </CardBody>
                  <CardFooter>
                    <Button variant="primary" size="sm">Action</Button>
                  </CardFooter>
                </Card>

                <Card variant="flat">
                  <CardHeader>
                    <CardTitle>Flat Card</CardTitle>
                    <CardDescription>Muted background</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <p className="text-sm">Flat design with muted background color.</p>
                  </CardBody>
                  <CardFooter>
                    <Button variant="primary" size="sm">Action</Button>
                  </CardFooter>
                </Card>

                <Card variant="gradient">
                  <CardHeader>
                    <CardTitle>Gradient Card</CardTitle>
                    <CardDescription className="text-white/80">
                      Vibrant gradient background
                    </CardDescription>
                  </CardHeader>
                  <CardBody>
                    <p className="text-sm">Eye-catching gradient from primary colors.</p>
                  </CardBody>
                  <CardFooter>
                    <Button variant="secondary" size="sm">Action</Button>
                  </CardFooter>
                </Card>

                <Card variant="glassmorphism">
                  <CardHeader>
                    <CardTitle>Glassmorphism</CardTitle>
                    <CardDescription>Backdrop blur effect</CardDescription>
                  </CardHeader>
                  <CardBody>
                    <p className="text-sm">Modern glassmorphism with backdrop blur.</p>
                  </CardBody>
                  <CardFooter>
                    <Button variant="primary" size="sm">Action</Button>
                  </CardFooter>
                </Card>
              </div>

              <Card variant="outline" hoverable clickable>
                <CardBody>
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-2">Interactive Card</h3>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      This card is clickable with hover effects
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Badges & Alerts Section */}
          {activeTab === 'badges' && (
            <div className="space-y-8">
              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Badge Variants - Solid</CardTitle>
                  <CardDescription>8 color variants with solid backgrounds</CardDescription>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                  </div>
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Badge Styles</CardTitle>
                  <CardDescription>Outline, subtle, and dot variants</CardDescription>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Outline Style</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary" style="outline">Outline</Badge>
                      <Badge variant="success" style="outline">Success</Badge>
                      <Badge variant="error" style="outline">Error</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Subtle Style</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary" style="subtle">Subtle</Badge>
                      <Badge variant="success" style="subtle">Success</Badge>
                      <Badge variant="error" style="subtle">Error</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">With Dot Indicator</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary" dot>Active</Badge>
                      <Badge variant="success" dot>Online</Badge>
                      <Badge variant="error" dot>Offline</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Removable Badges</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary" onRemove={() => console.log('removed')}>
                        Removable
                      </Badge>
                      <Badge variant="success" onRemove={() => console.log('removed')}>
                        Click X
                      </Badge>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Alert Components</h3>
                <Alert variant="info">
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational alert with important details for the user.
                  </AlertDescription>
                </Alert>
                <Alert variant="success">
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Your operation completed successfully. Changes have been saved.
                  </AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Please review this information before proceeding further.
                  </AlertDescription>
                </Alert>
                <Alert variant="error" onClose={() => console.log('closed')}>
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    An error occurred while processing your request. Please try again.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          )}

          {/* Forms Section */}
          {activeTab === 'forms' && (
            <div className="space-y-8">
              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Input Variants</CardTitle>
                  <CardDescription>4 input styles with full accessibility</CardDescription>
                </CardHeader>
                <CardBody className="space-y-4">
                  <Input
                    variant="default"
                    placeholder="Default input style"
                    label="Default"
                  />
                  <Input
                    variant="filled"
                    placeholder="Filled input style"
                    label="Filled"
                  />
                  <Input
                    variant="outline"
                    placeholder="Outline input style"
                    label="Outline"
                  />
                  <Input
                    variant="underline"
                    placeholder="Underline input style"
                    label="Underline"
                  />
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Input States & Features</CardTitle>
                  <CardDescription>With icons, helper text, and validation</CardDescription>
                </CardHeader>
                <CardBody className="space-y-4">
                  <Input
                    placeholder="Search..."
                    leftIcon={<Search />}
                    label="With Left Icon"
                  />
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    leftIcon={<Mail />}
                    helperText="We'll never share your email"
                    label="With Helper Text"
                  />
                  <Input
                    type="password"
                    placeholder="Enter password"
                    leftIcon={<Lock />}
                    error
                    errorText="Password must be at least 8 characters"
                    label="Error State"
                  />
                  <Input
                    type="text"
                    value="Success!"
                    leftIcon={<Check />}
                    success
                    helperText="This looks good!"
                    label="Success State"
                    readOnly
                  />
                  <Input
                    placeholder="Disabled input"
                    disabled
                    label="Disabled"
                  />
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Switch Component</CardTitle>
                  <CardDescription>Toggle switches with labels</CardDescription>
                </CardHeader>
                <CardBody className="space-y-4">
                  <Switch
                    checked={switchState}
                    onChange={setSwitchState}
                    label="Enable notifications"
                    size="sm"
                  />
                  <Switch
                    checked={switchState}
                    onChange={setSwitchState}
                    label="Enable notifications"
                    size="md"
                  />
                  <Switch
                    checked={true}
                    onChange={() => {}}
                    label="Always enabled"
                    size="lg"
                  />
                  <Switch
                    checked={false}
                    onChange={() => {}}
                    label="Disabled switch"
                    disabled
                  />
                </CardBody>
              </Card>
            </div>
          )}

          {/* Feedback Section */}
          {activeTab === 'feedback' && (
            <div className="space-y-8">
              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Loading Spinners</CardTitle>
                  <CardDescription>Multiple sizes and variants</CardDescription>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center gap-8 flex-wrap">
                    <div className="flex flex-col items-center gap-2">
                      <Spinner size="xs" variant="primary" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">XS</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Spinner size="sm" variant="primary" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">SM</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Spinner size="md" variant="primary" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">MD</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Spinner size="lg" variant="primary" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">LG</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Spinner size="xl" variant="primary" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">XL</span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Skeleton Loading</CardTitle>
                  <CardDescription>Content placeholders while loading</CardDescription>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div className="space-y-3">
                    <Skeleton variant="text" className="h-4 w-3/4" />
                    <Skeleton variant="text" className="h-4 w-full" />
                    <Skeleton variant="text" className="h-4 w-5/6" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton variant="circular" className="w-12 h-12" />
                    <div className="flex-1 space-y-2">
                      <Skeleton variant="text" className="h-4 w-1/2" />
                      <Skeleton variant="text" className="h-3 w-3/4" />
                    </div>
                  </div>
                  <Skeleton variant="rectangular" className="w-full h-32" />
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Progress Bars</CardTitle>
                  <CardDescription>Determinate and indeterminate states</CardDescription>
                </CardHeader>
                <CardBody className="space-y-6">
                  <Progress
                    value={progressValue}
                    variant="primary"
                    size="sm"
                    label="Upload Progress"
                    showValue
                  />
                  <Progress
                    value={75}
                    variant="success"
                    size="md"
                    label="Completed"
                    showValue
                  />
                  <Progress
                    value={30}
                    variant="warning"
                    size="lg"
                    label="Warning Level"
                    showValue
                  />
                  <Progress
                    indeterminate
                    variant="primary"
                    size="md"
                    label="Loading..."
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setProgressValue((prev) => Math.min(prev + 10, 100))}
                  >
                    Increase Progress
                  </Button>
                </CardBody>
              </Card>
            </div>
          )}

          {/* Avatars Section */}
          {activeTab === 'avatars' && (
            <div className="space-y-8">
              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Avatar Sizes</CardTitle>
                  <CardDescription>6 sizes from xs to 2xl</CardDescription>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="xs" initials="XS" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">XS</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="sm" initials="SM" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">SM</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="md" initials="MD" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">MD</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="lg" initials="LG" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">LG</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="xl" initials="XL" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">XL</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="2xl" initials="2X" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">2XL</span>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Avatar States</CardTitle>
                  <CardDescription>With status indicators and fallbacks</CardDescription>
                </CardHeader>
                <CardBody>
                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="lg" initials="ON" status="online" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">Online</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="lg" initials="AW" status="away" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">Away</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="lg" initials="BS" status="busy" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">Busy</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="lg" initials="OF" status="offline" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">Offline</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar size="lg" />
                      <span className="text-xs text-[var(--color-muted-foreground)]">Icon Fallback</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] mt-16">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-[var(--color-muted-foreground)]">
            <p className="mb-2">
              <strong>Nexus UI</strong> - Enterprise Design System built with 2025 standards
            </p>
            <p>
              OKLCH Colors • WCAG 3.0 • ARIA 1.3 • RTL Support • Container Queries • View Transitions API
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Showcase;
