# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
