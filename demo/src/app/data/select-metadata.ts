import { ComponentMetadata } from '../models/playground.types';

export const SELECT_METADATA: ComponentMetadata = {
  id: 'select',
  name: 'Perfect Select v2.1',
  description:
    'A modern, feature-rich select component with react-select API compatibility, virtual scrolling, custom templates, validation states, drag-drop reordering, option pinning, and advanced features',
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
