# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-01-15

### 🚀 Breaking Changes

#### Angular 21 Upgrade
- **Angular 21.0.5** - Upgraded all Angular packages to version 21.0.5
- **TypeScript 5.9** - Updated to TypeScript ~5.9.0
- **Peer Dependencies** - Now requires Angular ^21.0.0

#### API Changes
- **`paste` Output renamed to `pasteValues`** - The `paste` event output has been renamed to `pasteValues` to avoid conflicts with the native DOM paste event in Angular 21's stricter AOT compilation

### 🔧 Internal Changes
- Replaced `CommonModule` import with explicit imports (`KeyValuePipe`, `NgTemplateOutlet`)
- Removed `FormsModule` from component imports (not used in template)
- Updated demo app for Angular 21 compatibility

### 📦 Migration Guide

**From v2.x to v3.0.0:**

1. Update Angular to 21.0.5:
   ```bash
   ng update @angular/core@21 @angular/cli@21
   ```

2. Update TypeScript to 5.9:
   ```bash
   npm install typescript@~5.9.0
   ```

3. If you were listening to the `paste` event, rename it to `pasteValues`:
   ```html
   <!-- Before -->
   <ng-perfect-select (paste)="onPaste($event)">

   <!-- After -->
   <ng-perfect-select (pasteValues)="onPaste($event)">
   ```

## [2.3.0] - 2026-01-14

### ✨ New Features

#### Fuzzy Search
- Advanced search algorithm supporting acronym-style matching (e.g., "fb" matches "Facebook")
- Scores and ranks results by relevance with consecutive match bonuses
- Word boundary detection for better acronym matching
- Configurable threshold and case sensitivity
- Props: `enableFuzzySearch`, `fuzzySearchThreshold`, `fuzzySearchCaseSensitive`
- New utility: `fuzzyMatch()` and `sortByFuzzyScore()` exported for external use

#### Dark Mode
- Automatic system dark mode detection via CSS media queries
- Uses Angular signals for reactive theme switching
- Manual override with `colorScheme` prop ('auto', 'light', 'dark')
- Dedicated dark theme with proper contrast and readability
- New provider: `DarkModeProvider` service for theme management
- Props: `enableAutoThemeDetection`, `colorScheme`, `darkModeTheme`, `lightModeTheme`

#### Loading Skeleton
- Modern shimmer skeleton UI during async loading operations
- Customizable item count, height, and animation delay
- Smooth gradient animation with configurable timing
- Props: `enableLoadingSkeleton`, `skeletonItemCount`, `skeletonItemHeight`, `skeletonAnimationDelay`

#### Compact Mode
- Ultra-dense layout variant for dashboards and data-heavy UIs
- Reduced padding, font sizes, and gaps throughout component
- Works with all existing features (multi-select, validation, etc.)
- Single prop activation: `compactMode`

#### Custom Tag Templates
- Full control over multi-select tag rendering via ng-template
- Support custom layouts, avatars, badges, and styling
- Template context includes option data and selection state
- Usage: `<ng-template #tagTemplate let-option>...</ng-template>`

#### Option Checkbox Mode
- Visual checkboxes next to options for better selection feedback
- Three style variants: default, filled, outlined
- Configurable left/right position
- Enhanced accessibility with proper ARIA attributes
- Props: `showOptionCheckboxes`, `checkboxPosition`, `checkboxStyle`

#### Bulk Actions
- Action buttons for performing operations on selected options
- Three position options: above, below, or floating
- Configurable label and disabled states
- Event emission for custom handling
- Props: `bulkActions`, `enableBulkActions`, `bulkActionsPosition`, `bulkActionsLabel`
- New event: `bulkActionSelected`
- New interface: `BulkAction`

#### Option Sorting
- Multiple built-in sort modes: alphabetical (asc/desc), recently-used
- Custom comparator function support for advanced sorting
- Recently used tracking with configurable limit
- Integrates seamlessly with existing filtering and pinning
- Props: `sortMode`, `customSortComparator`, `recentlyUsedLimit`
- New utility: `sortOptions()` exported for external use

### 📦 New Exports

- `DarkModeProvider` - Injectable service for dark mode management
- `ColorScheme` - Type for color scheme preference
- `BulkAction` - Interface for bulk action configuration
- `SelectBulkActionEvent` - Event interface for bulk actions
- `fuzzyMatch()` - Utility function for fuzzy string matching
- `FuzzyMatchResult` - Interface for fuzzy match results
- `sortByFuzzyScore()` - Utility to sort items by fuzzy score
- `sortOptions()` - Utility function for option sorting
- `SortMode` - Type for sorting modes
- `SortConfig` - Interface for sort configuration

### 🔧 Improvements

- Added `resolvedTheme` computed signal for automatic theme resolution
- Added `hasBulkActions` computed signal for conditional rendering
- Added `recentlyUsedIds` signal for tracking usage history
- Enhanced `filteredOptions` to support fuzzy search and sorting
- Better separation of concerns with new utility modules

### 🎨 Styles

- Added ~350 lines of new SCSS for all v2.3.0 features
- Complete dark mode styling with CSS custom properties
- Skeleton loader animations with shimmer effect
- Compact mode adjustments for all component parts
- Checkbox styles for all three variants
- Bulk actions bar with multiple position options
- Responsive design for all new features

### 📊 Statistics

- **27 new @Input properties**
- **1 new @Output event**
- **1 new @ContentChild template**
- **4 new utility files**
- **1 new provider**
- **1 new interface file**
- **~500 lines of new TypeScript**
- **~350 lines of new SCSS**
- **~50 lines of template updates**

### 🔄 Demo App Updates

- Added 14 new examples showcasing v2.3.0 features
- Updated metadata with 23 new prop definitions
- Added `v2.3-features` category
- Combined feature examples demonstrating integration

---

## [2.2.0] - 2026-01-09

### ✨ New Features

#### Search Result Highlighting
- Automatically highlights matching text in options during search
- Configurable highlight color and text color
- Works across all option rendering modes (grouped, virtual scroll, standard)
- Case-insensitive matching with regex escaping for special characters
- Props: `enableSearchHighlight`, `searchHighlightColor`, `searchHighlightTextColor`
- Visual feedback with bold yellow highlighting (customizable)
- Improves search experience and user orientation

#### Tag Overflow Management
- Show "+N more" indicator when tags exceed visible limit
- Optional collapsible tags with "Show all/Show less" toggle
- Configurable maximum visible tags
- Two display modes: static indicator or interactive toggle
- Computed signals for optimal performance
- Props: `maxVisibleTags`, `showMoreTagsText`, `collapsibleTags`, `showAllTagsText`, `showLessTagsText`
- Prevents UI overflow in multi-select mode
- Maintains full tag access through expansion

### 🔧 Improvements

- Added computed signals `visibleTags()` and `hiddenTagsCount()` for tag management
- Enhanced option label rendering with innerHTML for highlighted text
- Improved multi-select UX with better tag overflow handling
- Better visual feedback during search operations

### 🎨 Styles

- Added ~50 lines of new CSS for overflow management
- Tags toggle button styles with hover and focus states
- Overflow indicator badge styling
- Search highlight mark tag styling

### 📊 Statistics

- **8 new @Input properties**
- **3 new computed signals**
- **2 new methods**
- **~60 lines of new TypeScript**
- **~50 lines of new SCSS**
- **~20 lines of template updates**

---

## [2.1.0] - 2026-01-09

### ✨ New Features

#### Drag & Drop Reordering
- Added drag-and-drop support for multi-select tags using Angular CDK
- Reorder selected values by dragging tags horizontally
- Visual drag handle with hover effect
- Customizable drag placeholder and animation duration
- New event: `reorder` with previous/current index and values
- Props: `enableDragDrop`, `dragDropPlaceholder`, `dragDropAnimation`
- Works seamlessly with existing multi-select features

#### Option Pinning
- Pin frequently used options to the top of the dropdown
- Visual pin icon with filled/outline states
- Pinned options appear at top of filtered results
- Optional localStorage persistence for pinned options
- Configurable maximum pinned options limit
- New event: `pin` with option and pinned state
- Props: `enablePinning`, `maxPinnedOptions`, `pinnedOptionsLabel`, `persistPinnedOptions`
- Accessible with keyboard and screen readers

### 🔧 Improvements

- Updated `SelectOption` interface with `pinned` and `__isPinned__` properties
- Enhanced filtering to prioritize pinned options
- Added visual indicators for pinned state (border accent)
- Smooth animations for drag-drop transitions

### 📦 New Exports

- `SelectReorderEvent` interface
- `SelectPinEvent` interface
- Extended `SelectOption` with pinning properties

### 🎨 Styles

- Added ~60 lines of new CSS for drag-drop functionality
- Pin button styles with hover states
- Drag placeholder and preview styles
- Pinned option visual indicator

### 📊 Statistics

- **7 new @Input properties**
- **2 new @Output events**
- **6 new methods**
- **2 new interfaces**
- **~150 lines of new TypeScript**
- **~60 lines of new SCSS**

---

## [2.0.0] - 2026-01-06

### 🎉 Major Release - 8 New Features

This is a major release with significant new functionality and one breaking change.

### ⚠️ BREAKING CHANGES

- **Angular CDK Required**: Added `@angular/cdk` as a peer dependency. Users must install it:
  ```bash
  npm install @angular/cdk@^20.0.0
  ```

### ✨ New Features

#### Virtual Scrolling
- Added `enableVirtualScroll` input to handle 10,000+ options without performance degradation
- Uses Angular CDK's `CdkVirtualScrollViewport` for efficient rendering
- Configurable item size, min/max buffer pixels
- Props: `virtualScrollItemSize`, `virtualScrollMinBufferPx`, `virtualScrollMaxBufferPx`

#### Custom Option Templates
- Added `@ContentChild` support for custom option rendering
- Use `#optionTemplate` to provide fully custom option layouts
- Template context includes: option data, index, selected state
- Fallback to default rendering when template not provided

#### Validation States
- Added 4 validation states: `error`, `warning`, `success`, `info`
- Visual border colors and shadow effects for each state
- Validation message component with icons
- Props: `validationState`, `validationMessage`, `showValidationIcon`
- ARIA support with `aria-invalid` attribute

#### Advanced Keyboard Shortcuts
- **Ctrl/Cmd+A**: Select all options (multi-select mode)
- **Ctrl/Cmd+C**: Copy selected values to clipboard
- **Ctrl/Cmd+V**: Paste comma-separated values (multi-select mode)
- **Home**: Jump to first option
- **End**: Jump to last option
- **Type-ahead**: Character-by-character search with buffer
- Props: `enableAdvancedKeyboard`, `typeAheadDelay`

#### Copy/Paste Support
- Copy selected values to clipboard with configurable delimiter
- Paste comma-separated values to auto-select options
- Modern Clipboard API with fallback for older browsers
- New events: `copy`, `paste`
- Props: `enableCopyPaste`, `copyDelimiter`, `pasteDelimiter`

#### Option Tooltips
- Show additional information on hover using native tooltips
- Configurable delay and custom tooltip function
- Added `tooltip` property to `SelectOption` interface
- Props: `showTooltips`, `tooltipDelay`, `getOptionTooltip`

#### Recent Selections
- Display recently selected items at the top of dropdown
- Configurable limit (default: 5 items)
- Optional localStorage persistence
- Visual indicator with gradient bar
- Section header for recent items
- Props: `showRecentSelections`, `recentSelectionsLimit`, `recentSelectionsLabel`, `enableRecentSelectionsPersistence`

#### Infinite Scroll
- Load more options as user scrolls
- Configurable scroll threshold (default: 80%)
- Debounced scroll detection for performance
- New event: `scrollEnd` with scroll metrics
- Works with both standard and virtual scroll
- Props: `enableInfiniteScroll`, `infiniteScrollThreshold`, `totalOptionsCount`

### 🔧 Improvements

- Enhanced keyboard navigation with visual feedback
- Added accessibility improvements (high contrast mode, reduced motion)
- Added ARIA attributes for validation states
- Improved TypeScript types with new interfaces
- Better performance with signal-based state management

### 📦 New Exports

- `ValidationState` type
- `SelectCopyEvent` interface
- `SelectPasteEvent` interface
- `SelectScrollEndEvent` interface
- Extended `SelectOption` with `tooltip` and `__isRecent__` properties

### 🎨 Styles

- Added ~270 lines of new CSS for v2.0 features
- Validation state styling for all 4 states
- Recent option visual indicator
- Section header styling
- Virtual scroll viewport styles
- Copy flash animation
- Accessibility media queries

### 📊 Statistics

- **28 new @Input properties**
- **3 new @Output events**
- **10+ new methods**
- **4 new interfaces/types**
- **1000+ lines of new TypeScript**
- **~270 lines of new SCSS**

---

## [1.1.1] - 2025-XX-XX

### 🐛 Bug Fixes

- Fixed forwardRef issue in NG_VALUE_ACCESSOR for production builds

---

## [1.1.0] - 2025-XX-XX

### ✨ New Features

- **Max Selection Limit**: Limit number of selections in multi-select mode
  - Props: `maxSelectedOptions`, `maxSelectedMessage`
- **Search Debounce**: Configurable debounce delay for async loading
  - Prop: `debounceTime` (default: 300ms)
- **Min Search Length**: Require minimum characters before filtering
  - Props: `minSearchLength`, `minSearchMessage`

---

## [1.0.0] - 2025-XX-XX

### 🎉 Initial Release

- React-select compatible API
- Single and multi-select support
- Async loading with caching
- Creatable options
- Search/filter functionality
- Keyboard navigation
- Accessibility (ARIA labels)
- 7 color themes
- 5 font sizes + 5 container sizes
- Option grouping
- Icons and badges
- Select All/Deselect All
- Angular forms integration
- RTL support
- Custom render functions
- Enhanced animations

---

[2.2.0]: https://github.com/ishansasika/angular-perfect-select/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/ishansasika/angular-perfect-select/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/ishansasika/angular-perfect-select/compare/v1.1.1...v2.0.0
[1.1.1]: https://github.com/ishansasika/angular-perfect-select/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/ishansasika/angular-perfect-select/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ishansasika/angular-perfect-select/releases/tag/v1.0.0
