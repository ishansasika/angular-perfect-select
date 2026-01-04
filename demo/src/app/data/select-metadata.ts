import { ComponentMetadata } from '../models/playground.types';

export const SELECT_METADATA: ComponentMetadata = {
  id: 'select',
  name: 'Perfect Select',
  description:
    'A modern, feature-rich select component with react-select API compatibility, color themes, and enhanced animations',
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
