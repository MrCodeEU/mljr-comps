# MLJR Components

A collection of Svelte components based on DaisyUI, organized for easy reference and implementation tracking.

## Input Components

### Basic Inputs

- [ ] Button - Basic button with onClick
  - [ ] Button Group
  - [ ] Icon Button
  - [ ] Loading State
  - [ ] Disabled State
- [ ] Text Input - Single-line text input
  - [ ] With Clear Button
  - [ ] With Icons (left/right)
  - [ ] With Character Counter
- [ ] Textarea - Multi-line text input
  - [ ] Auto-resize
  - [ ] Character Counter
  - [ ] Max Length
- [ ] Select - Dropdown option selection
  - [ ] With Search
  - [ ] Multi-select
  - [ ] Option Groups
- [ ] Checkbox - Binary selection
  - [ ] Indeterminate State
  - [ ] Checkbox Group
- [ ] Radio - Single option from list
  - [ ] Radio Group
  - [ ] Card Radio
- [ ] Toggle - Switch-style selection
  - [ ] With Icons
  - [ ] With Labels
- [ ] Range - Slider value selection
  - [ ] With Steps
  - [ ] With Labels
  - [ ] Range Group
- [ ] File Input - File upload field
  - [ ] Drag & Drop
  - [ ] Preview
  - [ ] Multiple Files
- [ ] Rating - Star-based rating input
  - [ ] Custom Icons
  - [ ] Half Stars
- [ ] OTP/PIN - Pin input with varying length
- [ ] Phone Number - With Flags and +xx + validation
- [ ] Date and Time + Range
  - [ ] Date Picker
  - [ ] Time Picker
  - [ ] Date Range
  - [ ] Time Range

### Form Structure

- [ ] Form - Form wrapper with validation
  - [ ] Reset Functionality
  - [ ] Submit Handling
  - [ ] Validation State
- [ ] Fieldset - Input grouping
  - [ ] Disabled State
  - [ ] Legend
- [ ] Label - Input field labels
  - [ ] Required Indicator
  - [ ] Helper Text
- [ ] Validator
  - [ ] Error Messages
  - [ ] Success State
  - [ ] Warning State
  - [ ] Custom Validation Rules
- [ ] Form Wizard
  - [ ] Step Navigation
  - [ ] Progress Indicator
  - [ ] Data Persistence

## Navigation Components

### Primary Navigation

- [ ] Navbar - Main navigation bar
  - [ ] Responsive Breakpoints
  - [ ] Sticky/Fixed Position
  - [ ] With Search
  - [ ] With User Menu
  - [ ] Mobile Hamburger
- [ ] Menu - Vertical/horizontal navigation
  - [ ] Nested Menus
  - [ ] Collapsible Groups
  - [ ] With Icons
  - [ ] Active States
- [ ] Tabs - Content section navigation
  - [ ] Scrollable Tabs
  - [ ] With Counter Badges
  - [ ] With Close Button
  - [ ] Vertical Tabs
- [ ] Breadcrumbs - Hierarchical navigation
  - [ ] With Icons
  - [ ] Dynamic Updates
  - [ ] Truncation
- [ ] Pagination - Page navigation
  - [ ] With Size Options
  - [ ] Jump to Page
  - [ ] Items Per Page

### Secondary Navigation

- [ ] Drawer - Side panel navigation
  - [ ] Multiple Positions
  - [ ] Overlay/Push Modes
  - [ ] Backdrop Options
- [ ] Steps - Progress indicators
  - [ ] Vertical Layout
  - [ ] With Status
  - [ ] Interactive Steps
- [ ] Navigation Rail - Minimal Side Navigation
- [ ] Dock - Dock at the bottom for navigation (mobile)
- [ ] Command Palette - Keyboard Navigation

### Content Containers

- [ ] Card - Content wrapper
  - [ ] Loading State
  - [ ] With Actions
  - [ ] Hoverable
  - [ ] Clickable
- [ ] Modal - Overlay dialogs
  - [ ] Size Variants
  - [ ] With Animation
  - [ ] Nested Modals
  - [ ] Focus Trap
- [ ] Collapse - Expandable sections
  - [ ] Group Behavior
  - [ ] Custom Icons
  - [ ] With Animation
- [ ] Accordion - Collapsible panels
  - [ ] Multiple Open
  - [ ] Custom Headers
  - [ ] Nested Accordions
- [ ] Toast - Notification containers
  - [ ] Auto Dismiss
  - [ ] Stack Behavior
  - [ ] Custom Position
  - [ ] Progress Bar
  - [ ] With promiss and actions?
- [ ] Popover - Contextual overlays
  - [ ] Placement Options
  - [ ] Arrow Indicators
  - [ ] Click/Hover Trigger

## Display Components

### Status & Progress

- [ ] Alert - Status messages
  - [ ] Different Types (success, error, warning, info)
  - [ ] Dismissible
  - [ ] With Icons
  - [ ] With Actions
- [ ] Badge - Status indicators
  - [ ] Position Variants
  - [ ] Size Variants
  - [ ] With Icons
- [ ] Progress - Linear progress
  - [ ] Determinate/Indeterminate
  - [ ] With Label
  - [ ] Color Variants
- [ ] Radial Progress - Circular progress
  - [ ] With Label
  - [ ] Custom Size
  - [ ] Custom Colors
- [ ] Loading - Loading state spinners
  - [ ] Multiple Variants
  - [ ] Custom Colors
  - [ ] Custom Size
- [ ] Skeleton - Content placeholders
  - [ ] Text Variants
  - [ ] Image Placeholder
  - [ ] Custom Animations
- [ ] Stat - Metric displays
  - [ ] With Icons
  - [ ] With Trends
  - [ ] With Charts

### Media & Content

- [ ] Avatar - User images
  - [ ] With Status
  - [ ] Group Layout
  - [ ] Fallback Text
- [ ] Carousel - Content slider
  - [ ] Auto-play
  - [ ] Custom Controls
  - [ ] Multiple Items
- [ ] Chat Bubble - Message display
  - [ ] User/Bot Variants
  - [ ] With Time
  - [ ] With Status
- [ ] Indicator - Position markers
  - [ ] Different Positions
  - [ ] Custom Colors
- [ ] Mask - Image masks
  - [ ] Different Shapes
  - [ ] Custom Masks
- [ ] Timeline - Event sequences
  - [ ] Vertical/Horizontal
  - [ ] With Icons
  - [ ] Interactive Items

### Data Display

- [ ] Table - Data grid
  - [ ] Sortable Columns
  - [ ] Filterable
  - [ ] Pagination
  - [ ] Row Selection
  - [ ] Column Resizing
- [ ] Tree View - Hierarchical data
  - [ ] Drag & Drop
  - [ ] Checkbox Selection
  - [ ] Custom Icons
  - [ ] Search/Filter
- [ ] Tags/Chips
  - [ ] Removable
  - [ ] With Icons
  - [ ] Color Variants
  - [ ] Input Mode
- [ ] Diff Viewer
  - [ ] Side by Side
  - [ ] Inline Mode
  - [ ] Syntax Highlighting

## Utility Components

### Interactive Utils

- [ ] Countdown - Number animations
  - [ ] Different Formats
  - [ ] Custom Styling
  - [ ] With Events
- [ ] Kbd - Keyboard shortcuts
  - [ ] Combinations
  - [ ] Platform Specific
- [ ] Swap - Element toggle
  - [ ] Custom Animations
  - [ ] Transition Effects
- [ ] Theme Controller
  - [ ] System Preference
  - [ ] Persistent Storage
  - [ ] Custom Themes
- [ ] Language Toggle
  - [ ] Auto Detection
  - [ ] Persistent Choice
  - [ ] Language Names/Flags
- [ ] Tooltip
  - [ ] Multiple Positions
  - [ ] Custom Delay
  - [ ] Rich Content
- [ ] Copy to Clipboard
  - [ ] Success Feedback
  - [ ] Custom Content
- [ ] Intersection Observer
  - [ ] Lazy Loading
  - [ ] Infinite Scroll
  - [ ] Animations

## Prebuilt Compound Components

### Authentication & User

- [ ] Login
  - [ ] Social Login Options
  - [ ] Remember Me
  - [ ] 2FA Support
- [ ] Register
  - [ ] Multi-step Registration
  - [ ] Email Verification
  - [ ] Terms Acceptance
- [ ] Password Management
  - [ ] Password Reset Flow
  - [ ] Password Strength Indicator
  - [ ] Change Password Form
- [ ] Profile Management
  - [ ] Edit Profile Form
  - [ ] Avatar Upload
  - [ ] Privacy Settings

### Layout Components

- [ ] Navbar
  - [ ] Responsive Mobile Menu
  - [ ] Search Integration
  - [ ] User Menu Dropdown
- [ ] Footer
  - [ ] Multi-column Layout
  - [ ] Newsletter Signup
  - [ ] Social Links
- [ ] Hero Section
  - [ ] With Background Image/Video
  - [ ] With CTA Buttons
  - [ ] Animated Version
- [ ] Sidebar
  - [ ] Collapsible
  - [ ] With Search
  - [ ] With Categories

### Common Features

- [ ] Search Interface (configurable with JSON?)
  - [ ] Advanced Filters
  - [ ] Results Display
  - [ ] Recent Searches
- [ ] Cookie Consent
  - [ ] Customizable Options
  - [ ] Privacy Policy Link
  - [ ] Preference Center
- [ ] Settings Panel
  - [ ] Theme Settings
  - [ ] Notification Preferences
  - [ ] Account Settings
  - [ ] Application Stats
- [ ] Feedback Collection
  - [ ] Contact Form
  - [ ] Survey Template
  - [ ] Rating Widget

### Content Management

- [ ] Blog Post Card
  - [ ] Author Info
  - [ ] Reading Time
  - [ ] Share Buttons
- [ ] Comment Section
  - [ ] Nested Replies
  - [ ] Moderation Tools
  - [ ] Rich Text Support
- [ ] Media Gallery
  - [ ] Grid/List Views
  - [ ] Filtering Options
  - [ ] Lightbox Preview

## Advanced Components

- [ ] Rich text Editor
- [ ] Video Player
- [ ] Custom Date / time picker ?? (e.g. https://svelty-picker.vercel.app/)
- [ ] Color Picker
- [ ] Data Graphs ( simple premade graphs for library? )
- [ ] PIN (like OTP)
- [ ] Auto Complete
- [ ] Table of Content
- [ ] Lazy Loading?
- [ ] Image Compare (as Diff does not work?)
- [ ] Map (maplibre, openmap, etc?)
- [ ] Marquee
- [ ] Svelte Filepond (advance file upload with preview to replace current one or as advanced version?)
- [ ] svelte PDF (for bachelor thesis?)
- [ ] animated headline?
- [ ] Animations?
- [ ] mCaptha? else Turnstile
- [ ] Audio Visualiser
- [ ] Svelte Origami (3d animations)?
- [ ] auto animate: https://auto-animate.formkit.com/ ???
- [ ] ...

## Getting Started

```bash
npm install mljr-components
```

## Usage

```svelte
<script>
	import { Button } from 'mljr-components';
</script>

<Button>Click me!</Button>
```
