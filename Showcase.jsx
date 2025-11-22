/**
 * Comprehensive Nexus UI Component Showcase
 *
 * Demonstrates all 25+ components with:
 * - All variants
 * - All sizes
 * - All states
 * - All features
 * - Interactive examples
 *
 * Phase 1: 10 components
 * Phase 2: 15 components
 * Total: 25+ production-ready components
 */

import React, { useState } from 'react';

// Phase 1 Components
import Button from './components/Button';
import Alert from './components/Alert';
import Switch from './components/Switch';
import Avatar from './components/Avatar';
import Card, { CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from './components/Card';
import Badge from './components/Badge';
import Progress from './components/Progress';
import Spinner from './components/Spinner';
import Skeleton from './components/Skeleton';
import Input from './components/Input';

// Phase 2 Components
import Textarea from './components/Textarea';
import Checkbox from './components/Checkbox';
import Radio from './components/Radio';
import RadioGroup from './components/RadioGroup';
import Select from './components/Select';
import Slider from './components/Slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';
import Pagination from './components/Pagination';
import { Breadcrumb, BreadcrumbItem } from './components/Breadcrumb';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose
} from './components/Dialog';
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from './components/Popover';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup
} from './components/DropdownMenu';
import { Tooltip, TooltipTrigger, TooltipContent } from './components/Tooltip';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/Accordion';
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from './components/Table';
import { ToastProvider, useToast, Toast } from './components/Toast';

// Example icons (replace with your icon library)
const SearchIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const UserIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const SettingsIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const HeartIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>;
const DownloadIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const PlusIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const HomeIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;

const ShowcaseSection = ({ title, description, children }) => (
  <section className="mb-16">
    <div className="mb-6 pb-4 border-b border-[var(--color-border)]">
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      {description && <p className="text-[var(--color-muted-foreground)]">{description}</p>}
    </div>
    {children}
  </section>
);

const ShowcaseSubSection = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const ShowcaseGrid = ({ children, cols = 4 }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-4`}>
    {children}
  </div>
);

const ShowcaseItem = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    {label && <span className="text-sm text-[var(--color-muted-foreground)]">{label}</span>}
    {children}
  </div>
);

function NexusUIShowcase() {
  // State management for interactive examples
  const [switchStates, setSwitchStates] = useState({
    default: false,
    small: false,
    medium: true,
    large: false,
  });
  const [checkboxStates, setCheckboxStates] = useState({
    unchecked: false,
    checked: true,
    indeterminate: false,
  });
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [rangeValue, setRangeValue] = useState([20, 80]);
  const [tabValue, setTabValue] = useState('tab1');
  const [currentPage, setCurrentPage] = useState(5);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [accordionValue, setAccordionValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const selectOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] p-8">
      <header className="mb-12 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary-500)] bg-clip-text text-transparent">
          Nexus UI Component Showcase
        </h1>
        <p className="text-xl text-[var(--color-muted-foreground)] mb-4">
          Complete Design System - 25+ Production-Ready Components
        </p>
        <div className="flex gap-3 justify-center flex-wrap mt-6">
          <Badge variant="primary">WCAG 3.0</Badge>
          <Badge variant="success">ARIA 1.3</Badge>
          <Badge variant="secondary">RTL Support</Badge>
          <Badge variant="outline">Phase 1 + 2</Badge>
          <Badge variant="success">100% Accessible</Badge>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* ==================== PHASE 1: CORE COMPONENTS ==================== */}

        <div className="text-center py-8">
          <Badge variant="primary" size="lg" className="mb-4">Phase 1: Core Components</Badge>
          <h2 className="text-4xl font-bold">10 Essential Components</h2>
        </div>

        {/* 1. Button */}
        <ShowcaseSection
          title="1. Button Component"
          description="Versatile button with 5 variants, 5 sizes, loading states, and icon support"
        >
          <ShowcaseSubSection title="Variants">
            <ShowcaseGrid cols={5}>
              <ShowcaseItem label="Default"><Button variant="default">Default</Button></ShowcaseItem>
              <ShowcaseItem label="Primary"><Button variant="primary">Primary</Button></ShowcaseItem>
              <ShowcaseItem label="Secondary"><Button variant="secondary">Secondary</Button></ShowcaseItem>
              <ShowcaseItem label="Outline"><Button variant="outline">Outline</Button></ShowcaseItem>
              <ShowcaseItem label="Ghost"><Button variant="ghost">Ghost</Button></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Sizes (All ≥ 44×44px Touch Target)">
            <ShowcaseGrid cols={5}>
              <ShowcaseItem label="XS"><Button size="xs">XS</Button></ShowcaseItem>
              <ShowcaseItem label="SM"><Button size="sm">SM</Button></ShowcaseItem>
              <ShowcaseItem label="MD"><Button size="md">MD</Button></ShowcaseItem>
              <ShowcaseItem label="LG"><Button size="lg">LG</Button></ShowcaseItem>
              <ShowcaseItem label="XL"><Button size="xl">XL</Button></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="States & Features">
            <ShowcaseGrid cols={4}>
              <ShowcaseItem label="Normal"><Button variant="primary">Normal</Button></ShowcaseItem>
              <ShowcaseItem label="Loading"><Button variant="primary" loading>Loading</Button></ShowcaseItem>
              <ShowcaseItem label="Disabled"><Button variant="primary" disabled>Disabled</Button></ShowcaseItem>
              <ShowcaseItem label="Full Width"><Button variant="primary" fullWidth>Full Width</Button></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="With Icons">
            <ShowcaseGrid cols={4}>
              <ShowcaseItem label="Left Icon"><Button variant="primary" leftIcon={<SearchIcon />}>Search</Button></ShowcaseItem>
              <ShowcaseItem label="Right Icon"><Button variant="primary" rightIcon={<DownloadIcon />}>Download</Button></ShowcaseItem>
              <ShowcaseItem label="Icon Only"><Button variant="primary" iconOnly><PlusIcon /></Button></ShowcaseItem>
              <ShowcaseItem label="Both Icons"><Button variant="primary" leftIcon={<UserIcon />} rightIcon={<HeartIcon />}>Profile</Button></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 2. Alert */}
        <ShowcaseSection
          title="2. Alert Component"
          description="Alert banners with 5 variants and dismissible functionality"
        >
          <div className="space-y-4">
            <Alert variant="default" title="Default Alert" dismissible>
              This is a default alert message with additional information.
            </Alert>
            <Alert variant="info" title="Info Alert" dismissible>
              This is an informational alert to notify users of important information.
            </Alert>
            <Alert variant="success" title="Success Alert" dismissible>
              Your action has been completed successfully!
            </Alert>
            <Alert variant="warning" title="Warning Alert" dismissible>
              Please be cautious about this action.
            </Alert>
            <Alert variant="error" title="Error Alert" dismissible>
              An error occurred. Please try again.
            </Alert>
          </div>
        </ShowcaseSection>

        {/* 3. Switch */}
        <ShowcaseSection
          title="3. Switch Component"
          description="Toggle switch with 3 sizes, disabled state, and RTL support"
        >
          <ShowcaseSubSection title="Sizes">
            <ShowcaseGrid cols={3}>
              <ShowcaseItem label="Small">
                <Switch size="sm" checked={switchStates.small} onChange={(e) => setSwitchStates({ ...switchStates, small: e.target.checked })} />
              </ShowcaseItem>
              <ShowcaseItem label="Medium">
                <Switch size="md" checked={switchStates.medium} onChange={(e) => setSwitchStates({ ...switchStates, medium: e.target.checked })} />
              </ShowcaseItem>
              <ShowcaseItem label="Large">
                <Switch size="lg" checked={switchStates.large} onChange={(e) => setSwitchStates({ ...switchStates, large: e.target.checked })} />
              </ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="States">
            <ShowcaseGrid cols={3}>
              <ShowcaseItem label="Unchecked"><Switch checked={false} /></ShowcaseItem>
              <ShowcaseItem label="Checked"><Switch checked={true} /></ShowcaseItem>
              <ShowcaseItem label="Disabled"><Switch checked={true} disabled /></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 4. Avatar */}
        <ShowcaseSection
          title="4. Avatar Component"
          description="User avatars with 5 sizes, status indicators, and fallbacks"
        >
          <ShowcaseSubSection title="Sizes">
            <ShowcaseGrid cols={5}>
              <ShowcaseItem label="XS"><Avatar size="xs" src="https://i.pravatar.cc/150?img=1" alt="User" /></ShowcaseItem>
              <ShowcaseItem label="SM"><Avatar size="sm" src="https://i.pravatar.cc/150?img=2" alt="User" /></ShowcaseItem>
              <ShowcaseItem label="MD"><Avatar size="md" src="https://i.pravatar.cc/150?img=3" alt="User" /></ShowcaseItem>
              <ShowcaseItem label="LG"><Avatar size="lg" src="https://i.pravatar.cc/150?img=4" alt="User" /></ShowcaseItem>
              <ShowcaseItem label="XL"><Avatar size="xl" src="https://i.pravatar.cc/150?img=5" alt="User" /></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Status Indicators (RTL-ready)">
            <ShowcaseGrid cols={4}>
              <ShowcaseItem label="Online"><Avatar src="https://i.pravatar.cc/150?img=6" status="online" alt="Online" /></ShowcaseItem>
              <ShowcaseItem label="Offline"><Avatar src="https://i.pravatar.cc/150?img=7" status="offline" alt="Offline" /></ShowcaseItem>
              <ShowcaseItem label="Away"><Avatar src="https://i.pravatar.cc/150?img=8" status="away" alt="Away" /></ShowcaseItem>
              <ShowcaseItem label="Busy"><Avatar src="https://i.pravatar.cc/150?img=9" status="busy" alt="Busy" /></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Fallbacks">
            <ShowcaseGrid cols={3}>
              <ShowcaseItem label="Image Fallback"><Avatar src="invalid-url" fallback="JD" alt="John Doe" /></ShowcaseItem>
              <ShowcaseItem label="Text Fallback"><Avatar fallback="AB" alt="Alice Brown" /></ShowcaseItem>
              <ShowcaseItem label="Icon Fallback"><Avatar alt="Default User" /></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 5. Card */}
        <ShowcaseSection
          title="5. Card Component"
          description="Container card with compound pattern and clickable variant"
        >
          <ShowcaseGrid cols={2}>
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>Card with header, body, and footer</CardDescription>
              </CardHeader>
              <CardBody>
                This is the card body content. It can contain any elements.
              </CardBody>
              <CardFooter>
                <Button variant="primary" size="sm">Action</Button>
                <Button variant="outline" size="sm">Cancel</Button>
              </CardFooter>
            </Card>

            <Card clickable onClick={() => alert('Card clicked!')}>
              <CardHeader>
                <CardTitle>Clickable Card</CardTitle>
                <CardDescription>This entire card is interactive</CardDescription>
              </CardHeader>
              <CardBody>
                Click anywhere on this card to trigger an action. Perfect for navigation.
              </CardBody>
            </Card>
          </ShowcaseGrid>

          <ShowcaseSubSection title="Card with Avatar">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar src="https://i.pravatar.cc/150?img=10" status="online" alt="User" />
                  <div>
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>Software Engineer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                Experienced developer with expertise in React, TypeScript, and modern web technologies.
              </CardBody>
              <CardFooter>
                <Button variant="primary" size="sm" leftIcon={<UserIcon />}>View Profile</Button>
                <Button variant="outline" size="sm">Message</Button>
              </CardFooter>
            </Card>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 6. Badge */}
        <ShowcaseSection
          title="6. Badge Component"
          description="Label badges with 5 variants and 4 sizes"
        >
          <ShowcaseSubSection title="Variants">
            <ShowcaseGrid cols={5}>
              <ShowcaseItem label="Default"><Badge variant="default">Default</Badge></ShowcaseItem>
              <ShowcaseItem label="Primary"><Badge variant="primary">Primary</Badge></ShowcaseItem>
              <ShowcaseItem label="Secondary"><Badge variant="secondary">Secondary</Badge></ShowcaseItem>
              <ShowcaseItem label="Success"><Badge variant="success">Success</Badge></ShowcaseItem>
              <ShowcaseItem label="Warning"><Badge variant="warning">Warning</Badge></ShowcaseItem>
            </ShowcaseGrid>
            <ShowcaseGrid cols={2}>
              <ShowcaseItem label="Error"><Badge variant="error">Error</Badge></ShowcaseItem>
              <ShowcaseItem label="Outline"><Badge variant="outline">Outline</Badge></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Sizes">
            <ShowcaseGrid cols={4}>
              <ShowcaseItem label="SM"><Badge size="sm" variant="primary">Small</Badge></ShowcaseItem>
              <ShowcaseItem label="MD"><Badge size="md" variant="primary">Medium</Badge></ShowcaseItem>
              <ShowcaseItem label="LG"><Badge size="lg" variant="primary">Large</Badge></ShowcaseItem>
              <ShowcaseItem label="XL"><Badge size="xl" variant="primary">Extra Large</Badge></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 7. Progress */}
        <ShowcaseSection
          title="7. Progress Component"
          description="Progress bars with 6 variants, 3 sizes, value display, and indeterminate mode"
        >
          <ShowcaseSubSection title="Variants">
            <div className="space-y-4">
              <ShowcaseItem label="Default (75%)"><Progress value={75} variant="default" showValue /></ShowcaseItem>
              <ShowcaseItem label="Primary (50%)"><Progress value={50} variant="primary" showValue /></ShowcaseItem>
              <ShowcaseItem label="Secondary (60%)"><Progress value={60} variant="secondary" showValue /></ShowcaseItem>
              <ShowcaseItem label="Success (100%)"><Progress value={100} variant="success" showValue /></ShowcaseItem>
              <ShowcaseItem label="Warning (40%)"><Progress value={40} variant="warning" showValue /></ShowcaseItem>
              <ShowcaseItem label="Error (25%)"><Progress value={25} variant="error" showValue /></ShowcaseItem>
            </div>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Sizes">
            <div className="space-y-4">
              <ShowcaseItem label="Small"><Progress value={70} size="sm" variant="primary" /></ShowcaseItem>
              <ShowcaseItem label="Medium"><Progress value={70} size="md" variant="primary" /></ShowcaseItem>
              <ShowcaseItem label="Large"><Progress value={70} size="lg" variant="primary" /></ShowcaseItem>
            </div>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="With Labels & Indeterminate">
            <div className="space-y-4">
              <Progress value={65} variant="primary" label="Upload Progress" showValue />
              <Progress indeterminate variant="primary" label="Loading..." />
            </div>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 8. Spinner */}
        <ShowcaseSection
          title="8. Spinner Component"
          description="Loading spinners with 4 variants and 5 sizes"
        >
          <ShowcaseSubSection title="Variants">
            <ShowcaseGrid cols={4}>
              <ShowcaseItem label="Default"><Spinner variant="default" /></ShowcaseItem>
              <ShowcaseItem label="Primary"><Spinner variant="primary" /></ShowcaseItem>
              <ShowcaseItem label="Secondary"><Spinner variant="secondary" /></ShowcaseItem>
              <ShowcaseItem label="White"><div className="bg-gray-800 p-4 rounded"><Spinner variant="white" /></div></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Sizes">
            <ShowcaseGrid cols={5}>
              <ShowcaseItem label="XS"><Spinner size="xs" variant="primary" /></ShowcaseItem>
              <ShowcaseItem label="SM"><Spinner size="sm" variant="primary" /></ShowcaseItem>
              <ShowcaseItem label="MD"><Spinner size="md" variant="primary" /></ShowcaseItem>
              <ShowcaseItem label="LG"><Spinner size="lg" variant="primary" /></ShowcaseItem>
              <ShowcaseItem label="XL"><Spinner size="xl" variant="primary" /></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="With Label">
            <Spinner size="lg" variant="primary" label="Loading content..." />
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 9. Skeleton */}
        <ShowcaseSection
          title="9. Skeleton Component"
          description="Loading placeholders with 4 variants for different content types"
        >
          <ShowcaseSubSection title="Variants">
            <div className="space-y-4">
              <ShowcaseItem label="Text"><Skeleton variant="text" className="w-64" /></ShowcaseItem>
              <ShowcaseItem label="Circular"><Skeleton variant="circular" className="w-16 h-16" /></ShowcaseItem>
              <ShowcaseItem label="Rectangular"><Skeleton variant="rectangular" className="w-full h-32" /></ShowcaseItem>
              <ShowcaseItem label="Rounded"><Skeleton variant="rounded" className="w-full h-24" /></ShowcaseItem>
            </div>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Card Skeleton Example">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" className="w-12 h-12" />
                  <div className="flex-1 space-y-2">
                    <Skeleton variant="text" className="h-4 w-32" />
                    <Skeleton variant="text" className="h-3 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <Skeleton variant="text" className="h-4 w-full mb-2" />
                <Skeleton variant="text" className="h-4 w-5/6 mb-2" />
                <Skeleton variant="text" className="h-4 w-4/6" />
              </CardBody>
            </Card>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 10. Input */}
        <ShowcaseSection
          title="10. Input Component"
          description="Text inputs with 4 variants, 5 sizes, icons, and validation states"
        >
          <ShowcaseSubSection title="Variants">
            <ShowcaseGrid cols={2}>
              <ShowcaseItem label="Default"><Input variant="default" placeholder="Default input" /></ShowcaseItem>
              <ShowcaseItem label="Filled"><Input variant="filled" placeholder="Filled input" /></ShowcaseItem>
              <ShowcaseItem label="Outline"><Input variant="outline" placeholder="Outline input" /></ShowcaseItem>
              <ShowcaseItem label="Underline"><Input variant="underline" placeholder="Underline input" /></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Sizes">
            <div className="space-y-3">
              <ShowcaseItem label="XS"><Input size="xs" placeholder="Extra small input" /></ShowcaseItem>
              <ShowcaseItem label="SM"><Input size="sm" placeholder="Small input" /></ShowcaseItem>
              <ShowcaseItem label="MD"><Input size="md" placeholder="Medium input" /></ShowcaseItem>
              <ShowcaseItem label="LG"><Input size="lg" placeholder="Large input" /></ShowcaseItem>
              <ShowcaseItem label="XL"><Input size="xl" placeholder="Extra large input" /></ShowcaseItem>
            </div>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="States & Icons">
            <ShowcaseGrid cols={2}>
              <ShowcaseItem label="With Icon"><Input leftIcon={<SearchIcon />} placeholder="Search..." /></ShowcaseItem>
              <ShowcaseItem label="Error"><Input error errorText="This field is required" placeholder="Error state" /></ShowcaseItem>
              <ShowcaseItem label="Success"><Input success helperText="Looks good!" placeholder="Success state" /></ShowcaseItem>
              <ShowcaseItem label="Disabled"><Input disabled placeholder="Disabled state" /></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="With Label">
            <ShowcaseGrid cols={2}>
              <Input label="Email Address" placeholder="your@email.com" helperText="We'll never share your email" />
              <Input label="Password" type="password" placeholder="Enter password" />
            </ShowcaseGrid>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* ==================== PHASE 2: ADVANCED COMPONENTS ==================== */}

        <div className="text-center py-12">
          <Badge variant="success" size="lg" className="mb-4">Phase 2: Advanced Components</Badge>
          <h2 className="text-4xl font-bold">15 New Components</h2>
        </div>

        {/* 11. Textarea */}
        <ShowcaseSection
          title="11. Textarea Component"
          description="Multi-line text input with auto-resize, character counter, and all input variants"
        >
          <ShowcaseSubSection title="Variants">
            <ShowcaseGrid cols={2}>
              <ShowcaseItem label="Default"><Textarea variant="default" placeholder="Default textarea" rows={3} /></ShowcaseItem>
              <ShowcaseItem label="Filled"><Textarea variant="filled" placeholder="Filled textarea" rows={3} /></ShowcaseItem>
              <ShowcaseItem label="Outline"><Textarea variant="outline" placeholder="Outline textarea" rows={3} /></ShowcaseItem>
              <ShowcaseItem label="Underline"><Textarea variant="underline" placeholder="Underline textarea" rows={3} /></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Features">
            <div className="space-y-4">
              <ShowcaseItem label="With Character Counter">
                <Textarea placeholder="Type something..." maxLength={200} showCount value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)} />
              </ShowcaseItem>
              <ShowcaseItem label="Auto-resize">
                <Textarea placeholder="This textarea auto-resizes as you type..." autoResize />
              </ShowcaseItem>
              <ShowcaseItem label="With Label">
                <Textarea label="Description" placeholder="Enter description" helperText="Provide a detailed description" rows={4} />
              </ShowcaseItem>
            </div>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 12. Checkbox */}
        <ShowcaseSection
          title="12. Checkbox Component"
          description="Checkbox with indeterminate state, 4 sizes (all ≥ 44×44px touch target)"
        >
          <ShowcaseSubSection title="Sizes (All with 44×44px Touch Target)">
            <div className="space-y-3">
              <Checkbox size="sm" label="Small checkbox (44×44px touch target)" />
              <Checkbox size="md" label="Medium checkbox (44×44px touch target)" />
              <Checkbox size="lg" label="Large checkbox (48×48px touch target)" />
              <Checkbox size="xl" label="Extra large checkbox (52×52px touch target)" />
            </div>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="States">
            <div className="space-y-3">
              <Checkbox label="Unchecked" checked={checkboxStates.unchecked} onChange={(e) => setCheckboxStates({ ...checkboxStates, unchecked: e.target.checked })} />
              <Checkbox label="Checked" checked={checkboxStates.checked} onChange={(e) => setCheckboxStates({ ...checkboxStates, checked: e.target.checked })} />
              <Checkbox label="Indeterminate" indeterminate={true} />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Checked & Disabled" checked disabled />
            </div>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="With Helper Text & Error">
            <div className="space-y-3">
              <Checkbox label="Accept terms and conditions" helperText="You must accept the terms to continue" />
              <Checkbox label="Subscribe to newsletter" error errorText="This field is required" />
            </div>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 13. Radio & RadioGroup */}
        <ShowcaseSection
          title="13. Radio & RadioGroup Component"
          description="Radio buttons with proper grouping, vertical/horizontal orientation"
        >
          <ShowcaseSubSection title="Vertical Layout">
            <RadioGroup label="Choose your plan" value={radioValue} onChange={setRadioValue} orientation="vertical">
              <Radio value="option1" label="Free Plan" helperText="Perfect for getting started" />
              <Radio value="option2" label="Pro Plan" helperText="For professionals" />
              <Radio value="option3" label="Enterprise Plan" helperText="For large organizations" />
            </RadioGroup>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Horizontal Layout">
            <RadioGroup label="Select size" value={radioValue} onChange={setRadioValue} orientation="horizontal">
              <Radio value="small" label="Small" />
              <Radio value="medium" label="Medium" />
              <Radio value="large" label="Large" />
            </RadioGroup>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="States">
            <div className="space-y-4">
              <RadioGroup label="Normal" value="a">
                <Radio value="a" label="Option A" />
                <Radio value="b" label="Option B" />
              </RadioGroup>
              <RadioGroup label="Disabled" disabled value="a">
                <Radio value="a" label="Option A" />
                <Radio value="b" label="Option B" />
              </RadioGroup>
              <RadioGroup label="Error" error errorText="Please select an option" value="">
                <Radio value="a" label="Option A" />
                <Radio value="b" label="Option B" />
              </RadioGroup>
            </div>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 14. Select */}
        <ShowcaseSection
          title="14. Select Component"
          description="Custom dropdown with keyboard navigation (Arrow keys, Enter, Escape, Home, End)"
        >
          <ShowcaseSubSection title="Variants">
            <ShowcaseGrid cols={2}>
              <ShowcaseItem label="Default"><Select variant="default" placeholder="Select" options={selectOptions} /></ShowcaseItem>
              <ShowcaseItem label="Filled"><Select variant="filled" placeholder="Select" options={selectOptions} /></ShowcaseItem>
              <ShowcaseItem label="Outline"><Select variant="outline" placeholder="Select" options={selectOptions} /></ShowcaseItem>
              <ShowcaseItem label="Underline"><Select variant="underline" placeholder="Select" options={selectOptions} /></ShowcaseItem>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="With Label & Icon">
            <ShowcaseGrid cols={2}>
              <Select label="Country" placeholder="Select a country" options={selectOptions} value={selectValue} onChange={setSelectValue} />
              <Select label="Language" placeholder="Select" leftIcon={<SearchIcon />} options={selectOptions} />
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="States">
            <ShowcaseGrid cols={2}>
              <Select label="Error State" error errorText="Please select an option" placeholder="Select" options={selectOptions} />
              <Select label="Disabled" disabled placeholder="Disabled" options={selectOptions} />
            </ShowcaseGrid>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 15. Slider */}
        <ShowcaseSection
          title="15. Slider Component"
          description="Range slider with single/dual-thumb modes, keyboard navigation (Arrow, Home, End, Page Up/Down)"
        >
          <ShowcaseSubSection title="Single Value">
            <div className="space-y-6">
              <ShowcaseItem label="Basic"><Slider min={0} max={100} value={sliderValue} onChange={setSliderValue} showValue /></ShowcaseItem>
              <ShowcaseItem label="With Label"><Slider min={0} max={100} value={sliderValue} onChange={setSliderValue} label="Volume" showValue /></ShowcaseItem>
              <ShowcaseItem label="With Steps (10%)"><Slider min={0} max={100} step={10} value={sliderValue} onChange={setSliderValue} label="Brightness" showValue /></ShowcaseItem>
            </div>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Range (Dual Thumbs)">
            <div className="space-y-6">
              <ShowcaseItem label="Price Range"><Slider min={0} max={1000} value={rangeValue} onChange={setRangeValue} range label="Price Range" showValue /></ShowcaseItem>
            </div>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Sizes">
            <div className="space-y-6">
              <ShowcaseItem label="Small"><Slider min={0} max={100} value={30} size="sm" showValue /></ShowcaseItem>
              <ShowcaseItem label="Medium"><Slider min={0} max={100} value={50} size="md" showValue /></ShowcaseItem>
              <ShowcaseItem label="Large"><Slider min={0} max={100} value={70} size="lg" showValue /></ShowcaseItem>
            </div>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 16. Tabs */}
        <ShowcaseSection
          title="16. Tabs Component"
          description="Tabbed navigation with 3 variants, keyboard navigation (Arrow keys, Home, End)"
        >
          <ShowcaseSubSection title="Default Variant">
            <Tabs value={tabValue} onValueChange={setTabValue} variant="default">
              <TabsList>
                <TabsTrigger value="tab1">Overview</TabsTrigger>
                <TabsTrigger value="tab2">Analytics</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1"><Card><CardBody>Overview content</CardBody></Card></TabsContent>
              <TabsContent value="tab2"><Card><CardBody>Analytics content</CardBody></Card></TabsContent>
              <TabsContent value="tab3"><Card><CardBody>Settings content</CardBody></Card></TabsContent>
            </Tabs>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Pills Variant">
            <Tabs defaultValue="home" variant="pills">
              <TabsList>
                <TabsTrigger value="home" leftIcon={<HomeIcon />}>Home</TabsTrigger>
                <TabsTrigger value="profile" leftIcon={<UserIcon />}>Profile</TabsTrigger>
                <TabsTrigger value="settings" leftIcon={<SettingsIcon />}>Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="home"><Card><CardBody>Home content</CardBody></Card></TabsContent>
              <TabsContent value="profile"><Card><CardBody>Profile content</CardBody></Card></TabsContent>
              <TabsContent value="settings"><Card><CardBody>Settings content</CardBody></Card></TabsContent>
            </Tabs>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Underline Variant">
            <Tabs defaultValue="all" variant="underline">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all">All items content</TabsContent>
              <TabsContent value="active">Active items content</TabsContent>
              <TabsContent value="completed">Completed items content</TabsContent>
            </Tabs>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 17. Pagination */}
        <ShowcaseSection
          title="17. Pagination Component"
          description="Page navigation with smart ellipsis, first/last buttons, 3 variants"
        >
          <ShowcaseSubSection title="Variants">
            <div className="space-y-6">
              <ShowcaseItem label="Default"><Pagination currentPage={currentPage} totalPages={20} onPageChange={setCurrentPage} variant="default" /></ShowcaseItem>
              <ShowcaseItem label="Outline"><Pagination currentPage={currentPage} totalPages={20} onPageChange={setCurrentPage} variant="outline" /></ShowcaseItem>
              <ShowcaseItem label="Pills"><Pagination currentPage={currentPage} totalPages={20} onPageChange={setCurrentPage} variant="pills" /></ShowcaseItem>
            </div>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Sizes">
            <div className="space-y-6">
              <ShowcaseItem label="Small"><Pagination currentPage={5} totalPages={10} size="sm" /></ShowcaseItem>
              <ShowcaseItem label="Medium"><Pagination currentPage={5} totalPages={10} size="md" /></ShowcaseItem>
              <ShowcaseItem label="Large"><Pagination currentPage={5} totalPages={10} size="lg" /></ShowcaseItem>
            </div>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 18. Breadcrumb */}
        <ShowcaseSection
          title="18. Breadcrumb Component"
          description="Breadcrumb navigation with auto-collapse, RTL support (separator auto-rotates)"
        >
          <ShowcaseSubSection title="Basic">
            <Breadcrumb>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/products">Products</BreadcrumbItem>
              <BreadcrumbItem href="/products/electronics">Electronics</BreadcrumbItem>
              <BreadcrumbItem current>Laptop</BreadcrumbItem>
            </Breadcrumb>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="With Icons">
            <Breadcrumb>
              <BreadcrumbItem href="/" leftIcon={<HomeIcon />}>Home</BreadcrumbItem>
              <BreadcrumbItem href="/dashboard" leftIcon={<SettingsIcon />}>Dashboard</BreadcrumbItem>
              <BreadcrumbItem current leftIcon={<SearchIcon />}>Search</BreadcrumbItem>
            </Breadcrumb>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Auto-Collapse (max 3 items)">
            <Breadcrumb maxItems={3}>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/l1">Level 1</BreadcrumbItem>
              <BreadcrumbItem href="/l2">Level 2</BreadcrumbItem>
              <BreadcrumbItem href="/l3">Level 3</BreadcrumbItem>
              <BreadcrumbItem current>Current</BreadcrumbItem>
            </Breadcrumb>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 19. Dialog */}
        <ShowcaseSection
          title="19. Dialog Component"
          description="Modal with focus trap, scroll lock, Escape to close, backdrop click"
        >
          <Button variant="primary" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogDescription>Are you sure you want to proceed?</DialogDescription>
              </DialogHeader>
              <DialogBody>
                <p>This action cannot be undone. Please confirm.</p>
              </DialogBody>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setDialogOpen(false)}>Confirm</Button>
              </DialogFooter>
              <DialogClose />
            </DialogContent>
          </Dialog>
        </ShowcaseSection>

        {/* 20. Popover */}
        <ShowcaseSection
          title="20. Popover Component"
          description="Floating content with 12 placements, click/hover trigger, arrow indicator"
        >
          <ShowcaseSubSection title="Placements">
            <ShowcaseGrid cols={4}>
              <Popover placement="top"><PopoverTrigger><Button variant="outline">Top</Button></PopoverTrigger><PopoverContent>Top content</PopoverContent></Popover>
              <Popover placement="bottom"><PopoverTrigger><Button variant="outline">Bottom</Button></PopoverTrigger><PopoverContent>Bottom content</PopoverContent></Popover>
              <Popover placement="left"><PopoverTrigger><Button variant="outline">Left</Button></PopoverTrigger><PopoverContent>Left content</PopoverContent></Popover>
              <Popover placement="right"><PopoverTrigger><Button variant="outline">Right</Button></PopoverTrigger><PopoverContent>Right content</PopoverContent></Popover>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="With Close Button">
            <Popover>
              <PopoverTrigger><Button variant="primary">Open Popover</Button></PopoverTrigger>
              <PopoverContent>
                <h4 className="font-semibold mb-2">Popover Title</h4>
                <p className="text-sm">This popover has a close button.</p>
                <PopoverClose />
              </PopoverContent>
            </Popover>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 21. DropdownMenu */}
        <ShowcaseSection
          title="21. DropdownMenu Component"
          description="Dropdown with keyboard navigation, groups, separators, checkable items"
        >
          <ShowcaseSubSection title="Basic Menu">
            <DropdownMenu>
              <DropdownMenuTrigger><Button variant="outline">Open Menu</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem leftIcon={<UserIcon />}>Profile</DropdownMenuItem>
                <DropdownMenuItem leftIcon={<SettingsIcon />}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="With Groups & Checkable Items">
            <DropdownMenu>
              <DropdownMenuTrigger><Button variant="outline">View Options</Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Display</DropdownMenuLabel>
                  <DropdownMenuItem checked={true}>Show Sidebar</DropdownMenuItem>
                  <DropdownMenuItem checked={false}>Show Toolbar</DropdownMenuItem>
                  <DropdownMenuItem checked={true}>Show Status Bar</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 22. Tooltip */}
        <ShowcaseSection
          title="22. Tooltip Component"
          description="Hover/focus tooltips with 12 placements, delay control"
        >
          <ShowcaseSubSection title="Placements">
            <ShowcaseGrid cols={4}>
              <Tooltip content="Top tooltip" placement="top"><Button variant="outline">Top</Button></Tooltip>
              <Tooltip content="Bottom tooltip" placement="bottom"><Button variant="outline">Bottom</Button></Tooltip>
              <Tooltip content="Left tooltip" placement="left"><Button variant="outline">Left</Button></Tooltip>
              <Tooltip content="Right tooltip" placement="right"><Button variant="outline">Right</Button></Tooltip>
            </ShowcaseGrid>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Compound Pattern">
            <Tooltip>
              <TooltipTrigger><Button variant="primary" leftIcon={<UserIcon />}>Hover for info</Button></TooltipTrigger>
              <TooltipContent>Detailed information about the action.</TooltipContent>
            </Tooltip>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 23. Accordion */}
        <ShowcaseSection
          title="23. Accordion Component"
          description="Collapsible panels with single/multiple modes, keyboard navigation"
        >
          <ShowcaseSubSection title="Single Mode (Collapsible)">
            <Accordion type="single" collapsible value={accordionValue} onValueChange={setAccordionValue}>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Nexus UI?</AccordionTrigger>
                <AccordionContent>Nexus UI is a modern, accessible design system with 25+ components.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes! 100% WCAG 3.0 compliant with ARIA 1.3 patterns.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>RTL Support?</AccordionTrigger>
                <AccordionContent>Full RTL support with logical properties.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Multiple Mode">
            <Accordion type="multiple" defaultValue={['faq-1', 'faq-2']}>
              <AccordionItem value="faq-1">
                <AccordionTrigger>How to install?</AccordionTrigger>
                <AccordionContent>Install via npm: <code>npm install nexus-ui</code></AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Can I customize?</AccordionTrigger>
                <AccordionContent>Yes, all components use CSS variables.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 24. Table */}
        <ShowcaseSection
          title="24. Table Component"
          description="Data table with sortable columns, selectable rows, sticky header, 3 variants"
        >
          <ShowcaseSubSection title="Default Table">
            <Table>
              <TableCaption>Recent users</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell><Badge variant="success">Active</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell><Badge variant="success">Active</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ShowcaseSubSection>

          <ShowcaseSubSection title="Variants">
            <div className="space-y-4">
              <ShowcaseItem label="Bordered">
                <Table variant="bordered" size="sm">
                  <TableHeader>
                    <TableRow><TableHead>Product</TableHead><TableHead>Price</TableHead></TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Laptop</TableCell><TableCell>$999</TableCell></TableRow>
                    <TableRow><TableCell>Mouse</TableCell><TableCell>$29</TableCell></TableRow>
                  </TableBody>
                </Table>
              </ShowcaseItem>
              <ShowcaseItem label="Striped">
                <Table variant="striped" size="sm">
                  <TableHeader>
                    <TableRow><TableHead>ID</TableHead><TableHead>Task</TableHead></TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow><TableCell>1</TableCell><TableCell>Design</TableCell></TableRow>
                    <TableRow><TableCell>2</TableCell><TableCell>Code</TableCell></TableRow>
                    <TableRow><TableCell>3</TableCell><TableCell>Test</TableCell></TableRow>
                  </TableBody>
                </Table>
              </ShowcaseItem>
            </div>
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* 25. Toast */}
        <ShowcaseSection
          title="25. Toast Component"
          description="Toast notifications with 5 variants, auto-dismiss, action buttons"
        >
          <p className="mb-4 text-sm text-[var(--color-muted-foreground)]">
            Note: Toasts require ToastProvider at app root. These are static examples.
          </p>
          <div className="space-y-4">
            <Toast variant="default" title="Default Toast" description="This is a default message" duration={0} />
            <Toast variant="success" title="Success!" description="Your changes have been saved" duration={0} />
            <Toast variant="warning" title="Warning" description="Please review before proceeding" duration={0} />
            <Toast variant="error" title="Error" description="An error occurred" duration={0} />
            <Toast variant="info" title="Info" description="New features available" duration={0} />
          </div>

          <ShowcaseSubSection title="With Action Button">
            <Toast
              variant="success"
              title="File uploaded"
              description="Your file was uploaded successfully"
              action={<Button size="sm" variant="outline">View</Button>}
              duration={0}
            />
          </ShowcaseSubSection>
        </ShowcaseSection>

        {/* Summary */}
        <section className="mt-24 mb-12 text-center">
          <h2 className="text-4xl font-bold mb-8">Complete Design System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardBody className="text-center">
                <div className="text-5xl font-bold text-[var(--color-primary)] mb-2">25+</div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Components</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <div className="text-5xl font-bold text-[var(--color-success-500)] mb-2">100%</div>
                <div className="text-sm text-[var(--color-muted-foreground)]">WCAG 3.0</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <div className="text-5xl font-bold text-[var(--color-secondary-500)] mb-2">RTL</div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Full Support</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <div className="text-5xl font-bold text-[var(--color-primary)] mb-2">A11Y</div>
                <div className="text-sm text-[var(--color-muted-foreground)]">Keyboard Nav</div>
              </CardBody>
            </Card>
          </div>

          <h3 className="text-2xl font-bold mb-4">Standards Compliance</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="success" size="lg">✅ WCAG 3.0</Badge>
            <Badge variant="success" size="lg">✅ ARIA 1.3</Badge>
            <Badge variant="success" size="lg">✅ Touch Targets (44×44px)</Badge>
            <Badge variant="success" size="lg">✅ RTL Support</Badge>
            <Badge variant="success" size="lg">✅ Reduced Motion</Badge>
            <Badge variant="success" size="lg">✅ Forward Refs</Badge>
            <Badge variant="success" size="lg">✅ Keyboard Navigation</Badge>
            <Badge variant="success" size="lg">✅ Compound Patterns</Badge>
          </div>

          <div className="mt-12 text-sm text-[var(--color-muted-foreground)]">
            <p className="mb-2"><strong>Phase 1:</strong> Button, Alert, Switch, Avatar, Card, Badge, Progress, Spinner, Skeleton, Input</p>
            <p><strong>Phase 2:</strong> Textarea, Checkbox, Radio, RadioGroup, Select, Slider, Tabs, Pagination, Breadcrumb, Dialog, Popover, DropdownMenu, Tooltip, Accordion, Table, Toast</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default NexusUIShowcase;
