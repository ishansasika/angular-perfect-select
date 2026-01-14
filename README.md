# Angular Perfect Select

A modern, feature-rich, and fully accessible select component for Angular applications. Built with react-select API compatibility, enhanced animations, and a focus on user experience.

[![npm version](https://badge.fury.io/js/angular-perfect-select.svg)](https://www.npmjs.com/package/angular-perfect-select)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

### Core Features
- **React-Select Compatible** - Full API compatibility with react-select
- **Modern UI** - Beautiful design with smooth, enhanced animations
- **Angular 20+** - Built with standalone components and signals
- **Async Loading** - Load options asynchronously with caching support
- **Creatable Options** - Allow users to create new options on the fly
- **Search/Filter** - Built-in search functionality with custom filter support
- **Multi-Select** - Support for selecting multiple options with animated tag chips
- **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape, Tab, Backspace)
- **Accessibility** - ARIA labels and comprehensive screen reader support
- **Forms Integration** - Full support for Angular template-driven and reactive forms

### Advanced Features

#### v2.3.0 Features 🎉 NEW
- **Fuzzy Search** - Advanced search algorithm supporting acronym-style matching (e.g., 'fb' matches 'Facebook')
- **Dark Mode** - Automatic dark mode detection with manual override and dedicated dark theme
- **Loading Skeleton** - Modern shimmer skeleton UI while loading async options
- **Compact Mode** - Ultra-dense layout variant with reduced padding for data-heavy UIs
- **Custom Tag Templates** - Full control over multi-select tag rendering with ng-template
- **Option Checkbox Mode** - Display checkboxes next to options for better visual selection feedback
- **Bulk Actions** - Action buttons for performing operations on all selected options
- **Option Sorting** - Built-in sorting modes (alphabetical, recently used, custom comparator)

#### v2.2.0 Features
- **Search Result Highlighting** - Automatically highlights matching text in options with customizable colors
- **Tag Overflow Management** - Show "+N more" or collapsible tags when exceeding visible limit

#### v2.1.0 Features
- **Drag & Drop Reordering** - Reorder selected tags in multi-select mode with intuitive drag handles
- **Option Pinning** - Pin frequently used options to the top with persistence support

#### v2.0.0 Features
- **Virtual Scrolling** - Handle 10,000+ options without performance degradation using Angular CDK
- **Custom Option Templates** - Full control over option rendering with ng-template support
- **Validation States** - Visual error, warning, success, and info states with custom messages
- **Advanced Keyboard Shortcuts** - Ctrl+A, Ctrl+C/V, Home/End, and type-ahead navigation
- **Copy/Paste Support** - Copy selected values and paste comma-separated lists
- **Option Tooltips** - Display additional information on hover with configurable content
- **Recent Selections** - Show recently selected items at top with optional persistence
- **Infinite Scroll** - Load more options as user scrolls with pagination support

#### v1.1.0 Features
- **Max Selection Limit** - Limit the number of selections in multi-select mode with visual feedback
- **Search Debounce** - Configurable debounce delay for async loading to reduce API calls
- **Min Search Length** - Require minimum characters before filtering with helpful progress indicator

#### Core Features
- **Select All / Deselect All** - One-click selection for multi-select mode
- **Option Grouping** - Organize options into categories with sticky headers
- **Icons in Options** - Add visual elements (SVG or images) to options
- **Badges in Options** - Display status, roles, or categories with custom colors
- **Color Themes** - 7 beautiful color themes: blue, purple, green, red, orange, pink, dark
- **Container Sizing** - 5 physical container sizes: xs, sm, md, lg, xl
- **Font Sizing** - 5 font size variants: smaller (11px), small (13px), medium (14px), large (16px), larger (18px)
- **Custom Styles** - Inject custom styles for complete control over appearance
- **Custom Render Functions** - `getOptionLabel`, `getOptionValue`, `isOptionDisabled`
- **Flexible Options** - Support for option descriptions and disabled states
- **Loading States** - Built-in loading indicators for sync and async operations
- **RTL Support** - Right-to-left language support
- **Menu Positioning** - Auto, top, or bottom placement with fixed positioning support
- **Enhanced Animations** - Smooth dropdown animations, staggered options, and tag transitions
- **Modern UI** - Beautiful design with enhanced shadows, backdrop blur effects, and rounded corners

## Installation

Install using npm:

```bash
npm install angular-perfect-select @angular/cdk
```

> **⚠️ v2.0.0 Breaking Change**: Angular CDK is now a required peer dependency. Make sure to install `@angular/cdk@^20.0.0` alongside the package.

Install using yarn:

```bash
yarn add angular-perfect-select @angular/cdk
```

Install using pnpm:

```bash
pnpm add angular-perfect-select @angular/cdk
```

## Quick Start

### Standalone Component (Recommended)

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfectSelectComponent, SelectOption } from 'angular-perfect-select';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [FormsModule, PerfectSelectComponent],
  template: \`
    <ng-perfect-select
      [options]="options"
      [(ngModel)]="selectedValue"
      placeholder="Select a country..."
    ></ng-perfect-select>
  \`
})
export class DemoComponent {
  selectedValue: any = null;

  options: SelectOption[] = [
    { id: 'sl', label: 'Sri Lanka', value: 'sl' },
    { id: 'ind', label: 'India', value: 'ind' },
    { id: 'pak', label: 'Pakistan', value: 'pak' }
  ];
}
```

### NgModule Usage

```typescript
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfectSelectComponent } from 'angular-perfect-select';

@NgModule({
  imports: [
    FormsModule,
    PerfectSelectComponent
  ],
  // ...
})
export class AppModule { }
```

## Usage Examples

### Fuzzy Search (v2.3.0)

Enable intelligent fuzzy search for better option matching:

```typescript
<angular-perfect-select
  [options]="options"
  [enableFuzzySearch]="true"
  [fuzzySearchThreshold]="0.3"
  [fuzzySearchCaseSensitive]="false"
  [isSearchable]="true"
  placeholder="Try searching 'fb' to find 'Facebook'..."
/>
```

### Dark Mode (v2.3.0)

Automatic dark mode detection with system preference:

```typescript
<angular-perfect-select
  [options]="options"
  [enableAutoThemeDetection]="true"
  [darkModeTheme]="'dark'"
  [lightModeTheme]="'blue'"
  [colorScheme]="'auto'"
  placeholder="Auto dark mode..."
/>

// Manual dark mode override
<angular-perfect-select
  [options]="options"
  [colorScheme]="'dark'"
  placeholder="Always dark mode..."
/>
```

### Loading Skeleton (v2.3.0)

Show modern skeleton UI while loading:

```typescript
<angular-perfect-select
  [loadOptions]="loadRemoteData"
  [enableLoadingSkeleton]="true"
  [skeletonItemCount]="5"
  [skeletonItemHeight]="40"
  [skeletonAnimationDelay]="800"
  placeholder="Loading with skeleton..."
/>
```

### Compact Mode (v2.3.0)

Dense layout for dashboards and data grids:

```typescript
<angular-perfect-select
  [options]="options"
  [compactMode]="true"
  placeholder="Compact select..."
/>
```

### Custom Tag Templates (v2.3.0)

Fully customize how multi-select tags are rendered:

```typescript
<angular-perfect-select
  [options]="options"
  [isMulti]="true"
  [(ngModel)]="selectedValues"
>
  <ng-template #tagTemplate let-option>
    <div class="custom-tag">
      <img [src]="option.avatar" alt="" class="tag-avatar" />
      <span>{{option.label}}</span>
      <span class="tag-badge">{{option.role}}</span>
    </div>
  </ng-template>
</angular-perfect-select>
```

### Option Checkbox Mode (v2.3.0)

Display checkboxes for better visual feedback:

```typescript
<angular-perfect-select
  [options]="options"
  [isMulti]="true"
  [showOptionCheckboxes]="true"
  [checkboxPosition]="'left'"
  [checkboxStyle]="'filled'"
  placeholder="Select with checkboxes..."
/>
```

### Bulk Actions (v2.3.0)

Add action buttons for selected options:

```typescript
// Component
bulkActions: BulkAction[] = [
  {
    id: 'export',
    label: 'Export',
    icon: '/assets/export.svg',
    action: (selectedOptions) => this.exportSelected(selectedOptions)
  },
  {
    id: 'delete',
    label: 'Delete All',
    action: (selectedOptions) => this.deleteSelected(selectedOptions)
  }
];

// Template
<angular-perfect-select
  [options]="options"
  [isMulti]="true"
  [enableBulkActions]="true"
  [bulkActions]="bulkActions"
  [bulkActionsPosition]="'above'"
  [bulkActionsLabel]="'Actions:'"
  (bulkActionSelected)="onBulkAction($event)"
/>
```

### Option Sorting (v2.3.0)

Sort options automatically:

```typescript
// Alphabetical sorting
<angular-perfect-select
  [options]="options"
  [sortMode]="'alphabetical-asc'"
  placeholder="Sorted A-Z..."
/>

// Recently used sorting
<angular-perfect-select
  [options]="options"
  [sortMode]="'recently-used'"
  [recentlyUsedLimit]="10"
  placeholder="Recently used first..."
/>

// Custom sorting
<angular-perfect-select
  [options]="options"
  [sortMode]="'custom'"
  [customSortComparator]="customSort"
  placeholder="Custom sorted..."
/>

// Component
customSort = (a: SelectOption, b: SelectOption) => {
  return a.priority - b.priority;
};
```

### Search Result Highlighting (v2.2.0)

Highlight matching text in options during search:

```typescript
<angular-perfect-select
  [options]="options"
  [enableSearchHighlight]="true"
  [searchHighlightColor]="'#ffeb3b'"
  [searchHighlightTextColor]="'#000'"
  [isSearchable]="true"
  placeholder="Search with highlighting..."
/>
```

### Tag Overflow Management (v2.2.0)

Show "+N more" when tags exceed limit:

```typescript
<angular-perfect-select
  [options]="options"
  [isMulti]="true"
  [maxVisibleTags]="3"
  [showMoreTagsText]="'+{count} more'"
  placeholder="Select multiple..."
/>

// With collapsible tags
<angular-perfect-select
  [options]="options"
  [isMulti]="true"
  [maxVisibleTags]="3"
  [collapsibleTags]="true"
  [showAllTagsText]="'Show all'"
  [showLessTagsText]="'Show less'"
  placeholder="Select multiple (collapsible)..."
/>
```

### Drag & Drop Reordering (v2.1.0)

Reorder selected tags in multi-select mode with drag-and-drop:

```typescript
<angular-perfect-select
  [options]="options"
  [isMulti]="true"
  [enableDragDrop]="true"
  [dragDropPlaceholder]="'Drop here'"
  [dragDropAnimation]="200"
  (reorder)="handleReorder($event)"
/>

// In your component
handleReorder(event: SelectReorderEvent) {
  console.log('Reordered from', event.previousIndex, 'to', event.currentIndex);
  console.log('New order:', event.values);
}
```

### Option Pinning (v2.1.0)

Pin frequently used options to the top of the dropdown:

```typescript
<angular-perfect-select
  [options]="options"
  [enablePinning]="true"
  [maxPinnedOptions]="3"
  [persistPinnedOptions]="true"
  [pinnedOptionsLabel]="'Favorites'"
  (pin)="handlePin($event)"
/>

// In your component
handlePin(event: SelectPinEvent) {
  console.log('Option', event.option.label, event.pinned ? 'pinned' : 'unpinned');
}
```

### Max Selection Limit (v1.1.0)

Limit the number of selections in multi-select mode:

```typescript
<ng-perfect-select
  [options]="options"
  [isMulti]="true"
  [maxSelectedOptions]="3"
  maxSelectedMessage="You can only select up to 3 items"
  [(ngModel)]="selectedValues"
></ng-perfect-select>
```

### Search Debounce (v1.1.0)

Add debouncing to async search to reduce API calls:

```typescript
<ng-perfect-select
  [options]="[]"
  [loadOptions]="loadCountries"
  [debounceTime]="500"
  [(ngModel)]="selectedCountry"
></ng-perfect-select>
```

```typescript
loadCountries = async (searchTerm: string): Promise<SelectOption[]> => {
  const response = await fetch(`/api/countries?search=${searchTerm}`);
  return response.json();
};
```

### Minimum Search Length (v1.1.0)

Require minimum characters before filtering options:

```typescript
<ng-perfect-select
  [options]="largeDataset"
  [minSearchLength]="3"
  minSearchMessage="Please enter at least 3 characters"
  [(ngModel)]="selectedValue"
></ng-perfect-select>
```

### Virtual Scrolling (v2.0.0)

Handle large datasets (10,000+ options) with virtual scrolling:

```typescript
<ng-perfect-select
  [options]="hugeDataset"
  [enableVirtualScroll]="true"
  [virtualScrollItemSize]="40"
  [(ngModel)]="selectedValue"
></ng-perfect-select>
```

### Custom Option Templates (v2.0.0)

Provide custom rendering for options:

```typescript
<ng-perfect-select [options]="options" [(ngModel)]="selectedValue">
  <ng-template #optionTemplate let-option let-selected="selected">
    <div class="custom-option">
      <img [src]="option.avatar" />
      <div>
        <strong>{{option.label}}</strong>
        <span>{{option.email}}</span>
      </div>
      @if (selected) {
        <span class="badge">Selected</span>
      }
    </div>
  </ng-template>
</ng-perfect-select>
```

### Validation States (v2.0.0)

Visual validation feedback for forms:

```typescript
<ng-perfect-select
  [options]="options"
  validationState="error"
  validationMessage="Please select at least one option"
  [(ngModel)]="selectedValue"
></ng-perfect-select>

<!-- Available states: 'error', 'warning', 'success', 'info', 'default' -->
```

### Advanced Keyboard Shortcuts (v2.0.0)

Power-user keyboard navigation:

- **Ctrl/Cmd+A**: Select all options (multi-select)
- **Ctrl/Cmd+C**: Copy selected values to clipboard
- **Ctrl/Cmd+V**: Paste comma-separated values (multi-select)
- **Home**: Jump to first option
- **End**: Jump to last option
- **Type-ahead**: Type characters to jump to matching option

```typescript
<ng-perfect-select
  [options]="options"
  [enableAdvancedKeyboard]="true"
  [enableCopyPaste]="true"
  [typeAheadDelay]="500"
  [(ngModel)]="selectedValue"
></ng-perfect-select>
```

### Copy/Paste Support (v2.0.0)

Copy selected values and paste comma-separated lists:

```typescript
<ng-perfect-select
  [options]="options"
  [isMulti]="true"
  [enableCopyPaste]="true"
  [copyDelimiter]="', '"
  [pasteDelimiter]=","
  (copy)="onCopy($event)"
  (paste)="onPaste($event)"
  [(ngModel)]="selectedValues"
></ng-perfect-select>
```

### Option Tooltips (v2.0.0)

Show additional information on hover:

```typescript
<ng-perfect-select
  [options]="optionsWithTooltips"
  [showTooltips]="true"
  [tooltipDelay]="300"
  [(ngModel)]="selectedValue"
></ng-perfect-select>
```

```typescript
// Options with tooltip property
options = [
  { id: 1, label: 'Option 1', value: 'opt1', tooltip: 'This is a helpful tooltip' },
  { id: 2, label: 'Option 2', value: 'opt2', tooltip: 'Additional information here' }
];
```

### Recent Selections (v2.0.0)

Display recently selected items at the top:

```typescript
<ng-perfect-select
  [options]="options"
  [showRecentSelections]="true"
  [recentSelectionsLimit]="5"
  [recentSelectionsLabel]="'Recently Selected'"
  [enableRecentSelectionsPersistence]="true"
  [(ngModel)]="selectedValue"
></ng-perfect-select>
```

### Infinite Scroll (v2.0.0)

Load more options as user scrolls:

```typescript
<ng-perfect-select
  [options]="options"
  [enableInfiniteScroll]="true"
  [infiniteScrollThreshold]="80"
  (scrollEnd)="loadMoreOptions($event)"
  [(ngModel)]="selectedValue"
></ng-perfect-select>
```

```typescript
loadMoreOptions(event: SelectScrollEndEvent) {
  // Load more data when user scrolls to 80% of the list
  this.fetchMoreOptions().then(newOptions => {
    this.options = [...this.options, ...newOptions];
  });
}
```

### Multi-Select with Tags

```typescript
<ng-perfect-select
  [options]="options"
  [isMulti]="true"
  placeholder="Select multiple..."
  [(ngModel)]="selectedValues"
></ng-perfect-select>
```

### Async Loading with Caching

```typescript
<ng-perfect-select
  [loadOptions]="loadRemoteData"
  [cacheOptions]="true"
  [defaultOptions]="true"
  [(ngModel)]="selectedValue"
></ng-perfect-select>
```

### Creatable Options

```typescript
<ng-perfect-select
  [options]="options"
  [isCreatable]="true"
  (createOption)="onCreateOption($event)"
  [(ngModel)]="selectedValue"
></ng-perfect-select>
```

### With Themes and Styling

```typescript
<ng-perfect-select
  [options]="options"
  theme="purple"
  selectSize="large"
  containerSize="lg"
  [(ngModel)]="selectedValue"
></ng-perfect-select>
```

## Documentation

For complete documentation, examples, and interactive playground, visit:
**[https://angular-perfect-select.ishansasika.dev](https://angular-perfect-select.ishansasika.dev)**

## License

MIT © [Ishan Karunaratne](https://ishansasika.dev)

