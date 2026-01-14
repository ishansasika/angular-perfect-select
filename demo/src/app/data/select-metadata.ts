import { ComponentMetadata } from '../models/playground.types';

export const SELECT_METADATA: ComponentMetadata = {
  id: 'select',
  name: 'Perfect Select v2.3',
  description:
    'A modern, feature-rich select component with react-select API compatibility, virtual scrolling, custom templates, validation states, drag-drop reordering, option pinning, search highlighting, tag overflow management, fuzzy search, dark mode, loading skeleton, compact mode, checkboxes, bulk actions, sorting, and advanced features',
  defaultProps: {
    options: [
      { id: 'sl', label: 'Sri Lanka', value: 'sl' },
      { id: 'ind', label: 'India', value: 'ind' },
      { id: 'pak', label: 'Pakistan', value: 'pak' },
      { id: 'usa', label: 'United States', value: 'usa' },
      { id: 'uk', label: 'United Kingdom', value: 'uk' }
    ],
    placeholder: 'Select...',
    isMulti: false,
    isSearchable: true,
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    theme: 'blue',
    selectSize: 'medium',
    containerSize: 'md',
    borderRadius: '8px',
    showSelectAll: false,
    isCreatable: false,
    showOptionIcons: false,
    showOptionBadges: false,
    isGrouped: false,
    closeMenuOnSelect: true,
    openMenuOnClick: true,
    openMenuOnFocus: false,
    hideSelectedOptions: false
  },
  propDefinitions: [
    // Basic Props (6)
    {
      name: 'placeholder',
      type: 'string',
      control: { type: 'text' },
      description: 'Placeholder text when no option is selected',
      defaultValue: 'Select...',
      category: 'basic'
    },
    {
      name: 'isMulti',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable multi-select mode',
      defaultValue: false,
      category: 'basic'
    },
    {
      name: 'isSearchable',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable search functionality',
      defaultValue: true,
      category: 'basic'
    },
    {
      name: 'isClearable',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Show clear button',
      defaultValue: true,
      category: 'basic'
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Disable the select',
      defaultValue: false,
      category: 'basic'
    },
    {
      name: 'isLoading',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Show loading spinner',
      defaultValue: false,
      category: 'basic'
    },
    // Styling Props (4)
    {
      name: 'theme',
      type: 'string',
      control: {
        type: 'select',
        options: ['blue', 'purple', 'green', 'red', 'orange', 'pink', 'dark']
      },
      description: 'Color theme',
      defaultValue: 'blue',
      category: 'styling'
    },
    {
      name: 'selectSize',
      type: 'string',
      control: {
        type: 'select',
        options: ['smaller', 'small', 'medium', 'large', 'larger']
      },
      description: 'Font size variant',
      defaultValue: 'medium',
      category: 'styling'
    },
    {
      name: 'containerSize',
      type: 'string',
      control: {
        type: 'select',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      },
      description: 'Container physical size',
      defaultValue: 'md',
      category: 'styling'
    },
    {
      name: 'borderRadius',
      type: 'string',
      control: { type: 'text' },
      description: 'Border radius (CSS value)',
      defaultValue: '8px',
      category: 'styling'
    },
    // Advanced Props (8)
    {
      name: 'showSelectAll',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Show Select All option (multi-select)',
      defaultValue: false,
      category: 'advanced'
    },
    {
      name: 'isCreatable',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Allow creating new options',
      defaultValue: false,
      category: 'advanced'
    },
    {
      name: 'showOptionIcons',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable icon support',
      defaultValue: false,
      category: 'advanced'
    },
    {
      name: 'showOptionBadges',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable badge support',
      defaultValue: false,
      category: 'advanced'
    },
    {
      name: 'isGrouped',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable option grouping',
      defaultValue: false,
      category: 'advanced'
    },
    {
      name: 'maxSelectedOptions',
      type: 'number',
      control: { type: 'number', min: 1 },
      description: 'Maximum number of selections (multi-select) - v1.1.0',
      defaultValue: null,
      category: 'advanced'
    },
    {
      name: 'debounceTime',
      type: 'number',
      control: { type: 'number', min: 0, step: 100 },
      description: 'Debounce delay for async loading (ms) - v1.1.0',
      defaultValue: 300,
      category: 'advanced'
    },
    {
      name: 'minSearchLength',
      type: 'number',
      control: { type: 'number', min: 0 },
      description: 'Minimum characters required before filtering - v1.1.0',
      defaultValue: 0,
      category: 'advanced'
    },
    // v2.0.0 Props - Virtual Scrolling (4)
    {
      name: 'enableVirtualScroll',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable virtual scrolling for large datasets - v2.0.0',
      defaultValue: false,
      category: 'v2-features'
    },
    {
      name: 'virtualScrollItemSize',
      type: 'number',
      control: { type: 'number', min: 20, max: 100 },
      description: 'Item height in pixels for virtual scroll - v2.0.0',
      defaultValue: 40,
      category: 'v2-features'
    },
    {
      name: 'virtualScrollMinBufferPx',
      type: 'number',
      control: { type: 'number', min: 0 },
      description: 'Minimum buffer in pixels for virtual scroll - v2.0.0',
      defaultValue: 200,
      category: 'v2-features'
    },
    {
      name: 'virtualScrollMaxBufferPx',
      type: 'number',
      control: { type: 'number', min: 0 },
      description: 'Maximum buffer in pixels for virtual scroll - v2.0.0',
      defaultValue: 400,
      category: 'v2-features'
    },
    // v2.0.0 Props - Validation (3)
    {
      name: 'validationState',
      type: 'string',
      control: {
        type: 'select',
        options: ['default', 'error', 'warning', 'success', 'info']
      },
      description: 'Validation state for visual feedback - v2.0.0',
      defaultValue: 'default',
      category: 'v2-features'
    },
    {
      name: 'validationMessage',
      type: 'string',
      control: { type: 'text' },
      description: 'Validation message to display - v2.0.0',
      defaultValue: '',
      category: 'v2-features'
    },
    {
      name: 'showValidationIcon',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Show icon in validation message - v2.0.0',
      defaultValue: true,
      category: 'v2-features'
    },
    // v2.0.0 Props - Tooltips (2)
    {
      name: 'showTooltips',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable tooltips on options - v2.0.0',
      defaultValue: false,
      category: 'v2-features'
    },
    {
      name: 'tooltipDelay',
      type: 'number',
      control: { type: 'number', min: 0, step: 100 },
      description: 'Tooltip hover delay in milliseconds - v2.0.0',
      defaultValue: 300,
      category: 'v2-features'
    },
    // v2.0.0 Props - Recent Selections (4)
    {
      name: 'showRecentSelections',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Show recently selected items at top - v2.0.0',
      defaultValue: false,
      category: 'v2-features'
    },
    {
      name: 'recentSelectionsLimit',
      type: 'number',
      control: { type: 'number', min: 1, max: 20 },
      description: 'Maximum number of recent items - v2.0.0',
      defaultValue: 5,
      category: 'v2-features'
    },
    {
      name: 'recentSelectionsLabel',
      type: 'string',
      control: { type: 'text' },
      description: 'Label for recent selections section - v2.0.0',
      defaultValue: 'Recent',
      category: 'v2-features'
    },
    {
      name: 'enableRecentSelectionsPersistence',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Persist recent selections in localStorage - v2.0.0',
      defaultValue: false,
      category: 'v2-features'
    },
    // v2.0.0 Props - Infinite Scroll (3)
    {
      name: 'enableInfiniteScroll',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable infinite scroll for pagination - v2.0.0',
      defaultValue: false,
      category: 'v2-features'
    },
    {
      name: 'infiniteScrollThreshold',
      type: 'number',
      control: { type: 'number', min: 0, max: 100 },
      description: 'Scroll percentage to trigger load (%) - v2.0.0',
      defaultValue: 80,
      category: 'v2-features'
    },
    {
      name: 'totalOptionsCount',
      type: 'number',
      control: { type: 'number', min: 0 },
      description: 'Total options count for pagination - v2.0.0',
      defaultValue: null,
      category: 'v2-features'
    },
    // v2.0.0 Props - Advanced Keyboard (4)
    {
      name: 'enableAdvancedKeyboard',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable advanced keyboard shortcuts - v2.0.0',
      defaultValue: true,
      category: 'v2-features'
    },
    {
      name: 'typeAheadDelay',
      type: 'number',
      control: { type: 'number', min: 0, step: 100 },
      description: 'Type-ahead buffer timeout (ms) - v2.0.0',
      defaultValue: 500,
      category: 'v2-features'
    },
    {
      name: 'enableCopyPaste',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable copy/paste functionality - v2.0.0',
      defaultValue: true,
      category: 'v2-features'
    },
    {
      name: 'copyDelimiter',
      type: 'string',
      control: { type: 'text' },
      description: 'Delimiter for copying values - v2.0.0',
      defaultValue: ', ',
      category: 'v2-features'
    },
    // v2.1.0 Props - Drag & Drop (3)
    {
      name: 'enableDragDrop',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable drag-and-drop reordering for tags - v2.1.0',
      defaultValue: false,
      category: 'v2-features'
    },
    {
      name: 'dragDropPlaceholder',
      type: 'string',
      control: { type: 'text' },
      description: 'Placeholder text for drag-drop target - v2.1.0',
      defaultValue: 'Drop here',
      category: 'v2-features'
    },
    {
      name: 'dragDropAnimation',
      type: 'number',
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Animation duration for drag-drop (ms) - v2.1.0',
      defaultValue: 200,
      category: 'v2-features'
    },
    // v2.1.0 Props - Option Pinning (4)
    {
      name: 'enablePinning',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable option pinning to top - v2.1.0',
      defaultValue: false,
      category: 'v2-features'
    },
    {
      name: 'maxPinnedOptions',
      type: 'number',
      control: { type: 'number', min: 0, max: 20 },
      description: 'Maximum pinned options (null = unlimited) - v2.1.0',
      defaultValue: null,
      category: 'v2-features'
    },
    {
      name: 'pinnedOptionsLabel',
      type: 'string',
      control: { type: 'text' },
      description: 'Label for pinned options section - v2.1.0',
      defaultValue: 'Pinned',
      category: 'v2-features'
    },
    {
      name: 'persistPinnedOptions',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Persist pinned options in localStorage - v2.1.0',
      defaultValue: false,
      category: 'v2-features'
    },
    // v2.2.0 Props - Search Highlighting (3)
    {
      name: 'enableSearchHighlight',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable search result highlighting - v2.2.0',
      defaultValue: true,
      category: 'v2-features'
    },
    {
      name: 'searchHighlightColor',
      type: 'color',
      control: { type: 'color' },
      description: 'Background color for highlighted text - v2.2.0',
      defaultValue: '#ffeb3b',
      category: 'v2-features'
    },
    {
      name: 'searchHighlightTextColor',
      type: 'color',
      control: { type: 'color' },
      description: 'Text color for highlighted text - v2.2.0',
      defaultValue: '#000',
      category: 'v2-features'
    },
    // v2.2.0 Props - Tag Overflow Management (5)
    {
      name: 'maxVisibleTags',
      type: 'number',
      control: { type: 'number', min: 0, max: 20 },
      description: 'Maximum visible tags (null = show all) - v2.2.0',
      defaultValue: null,
      category: 'v2-features'
    },
    {
      name: 'showMoreTagsText',
      type: 'string',
      control: { type: 'text' },
      description: 'Text for overflow indicator (use {count}) - v2.2.0',
      defaultValue: '+{count} more',
      category: 'v2-features'
    },
    {
      name: 'collapsibleTags',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Make tags collapsible with toggle button - v2.2.0',
      defaultValue: false,
      category: 'v2-features'
    },
    {
      name: 'showAllTagsText',
      type: 'string',
      control: { type: 'text' },
      description: 'Text for show all tags button - v2.2.0',
      defaultValue: 'Show all',
      category: 'v2-features'
    },
    {
      name: 'showLessTagsText',
      type: 'string',
      control: { type: 'text' },
      description: 'Text for show less tags button - v2.2.0',
      defaultValue: 'Show less',
      category: 'v2-features'
    },

    // v2.3.0 Props - Fuzzy Search (3)
    {
      name: 'enableFuzzySearch',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable fuzzy search for flexible matching - v2.3.0',
      defaultValue: false,
      category: 'v2.3-features'
    },
    {
      name: 'fuzzySearchThreshold',
      type: 'number',
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
      description: 'Minimum score for fuzzy matches (0-1) - v2.3.0',
      defaultValue: 0,
      category: 'v2.3-features'
    },
    {
      name: 'fuzzySearchCaseSensitive',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Case-sensitive fuzzy matching - v2.3.0',
      defaultValue: false,
      category: 'v2.3-features'
    },

    // v2.3.0 Props - Dark Mode (4)
    {
      name: 'enableAutoThemeDetection',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Auto-detect system dark mode - v2.3.0',
      defaultValue: false,
      category: 'v2.3-features'
    },
    {
      name: 'colorScheme',
      type: 'string',
      control: { type: 'select', options: ['auto', 'light', 'dark'] },
      description: 'Color scheme preference - v2.3.0',
      defaultValue: 'auto',
      category: 'v2.3-features'
    },
    {
      name: 'darkModeTheme',
      type: 'string',
      control: {
        type: 'select',
        options: ['blue', 'purple', 'green', 'red', 'orange', 'pink', 'dark']
      },
      description: 'Theme to use in dark mode - v2.3.0',
      defaultValue: 'dark',
      category: 'v2.3-features'
    },
    {
      name: 'lightModeTheme',
      type: 'string',
      control: {
        type: 'select',
        options: ['blue', 'purple', 'green', 'red', 'orange', 'pink', 'dark']
      },
      description: 'Theme to use in light mode - v2.3.0',
      defaultValue: 'blue',
      category: 'v2.3-features'
    },

    // v2.3.0 Props - Loading Skeleton (4)
    {
      name: 'enableLoadingSkeleton',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Show skeleton UI while loading - v2.3.0',
      defaultValue: true,
      category: 'v2.3-features'
    },
    {
      name: 'skeletonItemCount',
      type: 'number',
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of skeleton items - v2.3.0',
      defaultValue: 5,
      category: 'v2.3-features'
    },
    {
      name: 'skeletonItemHeight',
      type: 'number',
      control: { type: 'number', min: 20, max: 100 },
      description: 'Height of skeleton items (px) - v2.3.0',
      defaultValue: 40,
      category: 'v2.3-features'
    },
    {
      name: 'skeletonAnimationDelay',
      type: 'number',
      control: { type: 'number', min: 100, max: 3000 },
      description: 'Animation delay (ms) - v2.3.0',
      defaultValue: 800,
      category: 'v2.3-features'
    },

    // v2.3.0 Props - Compact Mode (1)
    {
      name: 'compactMode',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Ultra-dense layout variant - v2.3.0',
      defaultValue: false,
      category: 'v2.3-features'
    },

    // v2.3.0 Props - Option Checkboxes (3)
    {
      name: 'showOptionCheckboxes',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Show checkboxes next to options - v2.3.0',
      defaultValue: false,
      category: 'v2.3-features'
    },
    {
      name: 'checkboxPosition',
      type: 'string',
      control: { type: 'select', options: ['left', 'right'] },
      description: 'Checkbox position - v2.3.0',
      defaultValue: 'left',
      category: 'v2.3-features'
    },
    {
      name: 'checkboxStyle',
      type: 'string',
      control: { type: 'select', options: ['default', 'filled', 'outlined'] },
      description: 'Checkbox style variant - v2.3.0',
      defaultValue: 'default',
      category: 'v2.3-features'
    },

    // v2.3.0 Props - Bulk Actions (3)
    {
      name: 'enableBulkActions',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Enable bulk action buttons - v2.3.0',
      defaultValue: false,
      category: 'v2.3-features'
    },
    {
      name: 'bulkActionsPosition',
      type: 'string',
      control: { type: 'select', options: ['above', 'below', 'float'] },
      description: 'Position of bulk actions bar - v2.3.0',
      defaultValue: 'above',
      category: 'v2.3-features'
    },
    {
      name: 'bulkActionsLabel',
      type: 'string',
      control: { type: 'text' },
      description: 'Label for bulk actions - v2.3.0',
      defaultValue: 'Actions:',
      category: 'v2.3-features'
    },

    // v2.3.0 Props - Option Sorting (2)
    {
      name: 'sortMode',
      type: 'string',
      control: {
        type: 'select',
        options: ['none', 'alphabetical-asc', 'alphabetical-desc', 'recently-used', 'custom']
      },
      description: 'Option sorting mode - v2.3.0',
      defaultValue: 'none',
      category: 'v2.3-features'
    },
    {
      name: 'recentlyUsedLimit',
      type: 'number',
      control: { type: 'number', min: 1, max: 50 },
      description: 'Recently used tracking limit - v2.3.0',
      defaultValue: 10,
      category: 'v2.3-features'
    },

    // Behavior Props (4)
    {
      name: 'closeMenuOnSelect',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Close menu after selection',
      defaultValue: true,
      category: 'behavior'
    },
    {
      name: 'openMenuOnClick',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Open menu on container click',
      defaultValue: true,
      category: 'behavior'
    },
    {
      name: 'openMenuOnFocus',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Open menu when focused',
      defaultValue: false,
      category: 'behavior'
    },
    {
      name: 'hideSelectedOptions',
      type: 'boolean',
      control: { type: 'boolean' },
      description: 'Hide selected options from menu',
      defaultValue: false,
      category: 'behavior'
    }
  ],
  examples: [],
  importPath: "import { PerfectSelectComponent } from 'angular-perfect-select';"
};
