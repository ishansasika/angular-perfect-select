# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[2.0.0]: https://github.com/ishansasika/angular-perfect-select/compare/v1.1.1...v2.0.0
[1.1.1]: https://github.com/ishansasika/angular-perfect-select/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/ishansasika/angular-perfect-select/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ishansasika/angular-perfect-select/releases/tag/v1.0.0
