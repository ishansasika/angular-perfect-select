# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2026-01-04

### Changed
- Updated README.md with v1.1.0 feature documentation
- Added usage examples for new features (max selection limit, search debounce, min search length)
- Updated demo app metadata with new props (maxSelectedOptions, debounceTime, minSearchLength)
- Added 3 new demo examples showcasing v1.1.0 features

## [1.1.0] - 2026-01-04

### Added
- **Max Selection Limit**: New `maxSelectedOptions` prop to limit the number of selections in multi-select mode
  - Displays warning message when maximum is reached
  - Disables unselected options when limit is hit
  - Respects limit in Select All functionality
  - Configurable message via `maxSelectedMessage` prop
- **Search Debounce**: New `debounceTime` prop (default: 300ms) for async loading
  - Reduces API calls by debouncing search input
  - Improves performance with remote data sources
  - Configurable delay in milliseconds
- **Min Search Length**: New `minSearchLength` prop to require minimum characters before filtering
  - Shows helpful message when below minimum (configurable via `minSearchMessage`)
  - Displays character count progress (e.g., "Type to search... (2/3)")
  - Prevents unnecessary filtering on large datasets

### Changed
- Async loading now uses debouncing to optimize API calls
- Filter logic respects minimum search length requirement
- Select All functionality now respects max selection limit

## [1.0.0] - 2025-12-31

### Added
- Initial release of Angular Perfect Select
- Full Angular 20 compatibility with standalone components and signals
- React-select API compatibility (74 props, 10 events)
- 7 color themes (blue, purple, green, red, orange, pink, dark)
- 5 font size variants (smaller, small, medium, large, larger)
- 5 container size variants (xs, sm, md, lg, xl)
- Multi-select mode with animated tag chips
- Async loading with caching support
- Creatable mode for dynamic option creation
- Search and filter functionality
- Option grouping with sticky headers
- Icons and badges support in options
- Select All / Deselect All functionality
- Full keyboard navigation support
- Comprehensive accessibility features (ARIA labels, screen reader support)
- Angular forms integration (ControlValueAccessor)
- Template-driven and reactive forms support
- RTL (right-to-left) language support
- Custom styles and render functions
- Menu positioning (auto, top, bottom)
- Loading states and error handling
- Enhanced animations (dropdown, tags, options list)
- Interactive demo application with playground
- Comprehensive documentation
- TypeScript type definitions

### Features
- **Core Functionality**
  - Single and multi-select modes
  - Searchable options with custom filter support
  - Clearable selection
  - Disabled state support
  - Loading state indicators
  - Placeholder text

- **Advanced Options**
  - Option descriptions
  - Disabled individual options
  - Option icons (URL or SVG)
  - Option badges with custom colors
  - Option grouping by category

- **Customization**
  - Custom option label extraction
  - Custom option value extraction
  - Custom option disabled check
  - Custom filter function
  - Custom message functions (no options, loading)
  - Custom create label formatting

- **User Experience**
  - Smooth animations and transitions
  - Keyboard navigation (arrows, enter, escape, tab, backspace)
  - Click outside to close
  - Focus management
  - Auto-focus support
  - Open menu on focus/click (configurable)
  - Tab selects value (configurable)
  - Backspace removes value (configurable)
  - Escape clears value (configurable)

- **Developer Experience**
  - Full TypeScript support with type definitions
  - Comprehensive event system
  - Async data loading support with caching
  - Forms integration (ControlValueAccessor)
  - Template-driven forms support
  - Reactive forms support
  - Standalone component architecture
  - Signals-based state management
  - Tree-shakeable
  - Zero external dependencies (except Angular)

### Documentation
- Comprehensive README with examples
- Interactive playground demo
- API documentation
- TypeScript type definitions
- Code examples for common use cases

[1.0.0]: https://github.com/ishansasika/angular-perfect-select/releases/tag/v1.0.0
