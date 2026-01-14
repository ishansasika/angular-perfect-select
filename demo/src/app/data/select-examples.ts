import { Example } from '../models/playground.types';

export const SELECT_EXAMPLES: Example[] = [
  {
    name: 'Basic Single Select',
    description: 'Simple single selection',
    props: {
      placeholder: 'Choose a country...'
    }
  },
  {
    name: 'Multi-Select',
    description: 'Select multiple options with tags',
    props: {
      isMulti: true,
      placeholder: 'Select multiple countries...'
    }
  },
  {
    name: 'Purple Theme',
    description: 'Beautiful purple color scheme',
    props: {
      theme: 'purple',
      placeholder: 'Purple themed select...'
    }
  },
  {
    name: 'Green Theme',
    description: 'Fresh green color scheme',
    props: {
      theme: 'green',
      placeholder: 'Green themed select...'
    }
  },
  {
    name: 'Red Theme',
    description: 'Bold red color scheme',
    props: {
      theme: 'red',
      placeholder: 'Red themed select...'
    }
  },
  {
    name: 'Dark Theme',
    description: 'Sleek dark color scheme',
    props: {
      theme: 'dark',
      placeholder: 'Dark themed select...'
    }
  },
  {
    name: 'Large Size',
    description: 'Larger font and container',
    props: {
      selectSize: 'large',
      containerSize: 'lg',
      placeholder: 'Large select...'
    }
  },
  {
    name: 'Small Size',
    description: 'Smaller font and container',
    props: {
      selectSize: 'small',
      containerSize: 'sm',
      placeholder: 'Small select...'
    }
  },
  {
    name: 'Creatable',
    description: 'Create new options on the fly',
    props: {
      isCreatable: true,
      placeholder: 'Select or create...'
    }
  },
  {
    name: 'With Select All',
    description: 'Quick select/deselect all options',
    props: {
      isMulti: true,
      showSelectAll: true,
      placeholder: 'Multi-select with Select All...'
    }
  },
  {
    name: 'Loading State',
    description: 'Show loading indicator',
    props: {
      isLoading: true,
      placeholder: 'Loading...'
    }
  },
  {
    name: 'Disabled',
    description: 'Disabled select component',
    props: {
      isDisabled: true,
      placeholder: 'Disabled select...'
    }
  },
  {
    name: 'No Search',
    description: 'Simple dropdown without search',
    props: {
      isSearchable: false,
      placeholder: 'Select without search...'
    }
  },
  {
    name: 'Not Clearable',
    description: 'No clear button',
    props: {
      isClearable: false,
      placeholder: 'Cannot clear selection...'
    }
  },
  {
    name: 'Green Multi-Select',
    description: 'Multi-select with green theme',
    props: {
      isMulti: true,
      theme: 'green',
      placeholder: 'Green multi-select...'
    }
  },
  {
    name: 'Purple Multi-Select Large',
    description: 'Large multi-select with purple theme',
    props: {
      isMulti: true,
      theme: 'purple',
      selectSize: 'large',
      containerSize: 'lg',
      placeholder: 'Large purple multi-select...'
    }
  },
  {
    name: 'Orange Theme Small',
    description: 'Small select with orange theme',
    props: {
      theme: 'orange',
      selectSize: 'small',
      containerSize: 'sm',
      placeholder: 'Small orange select...'
    }
  },
  {
    name: 'Pink Theme Creatable',
    description: 'Creatable select with pink theme',
    props: {
      theme: 'pink',
      isCreatable: true,
      placeholder: 'Create with pink theme...'
    }
  },
  {
    name: 'Max Selection Limit',
    description: 'Limit selections to 3 items (v1.1.0)',
    props: {
      isMulti: true,
      maxSelectedOptions: 3,
      maxSelectedMessage: 'You can only select up to 3 countries',
      placeholder: 'Select up to 3 countries...'
    }
  },
  {
    name: 'Min Search Length',
    description: 'Require at least 2 characters to search (v1.1.0)',
    props: {
      minSearchLength: 2,
      minSearchMessage: 'Please type at least 2 characters',
      placeholder: 'Type at least 2 characters...'
    }
  },
  {
    name: 'Search Debounce',
    description: 'Debounce search with 500ms delay (v1.1.0)',
    props: {
      debounceTime: 500,
      placeholder: 'Search with debounce...'
    }
  },
  {
    name: 'Virtual Scrolling',
    description: 'Handle 10,000+ options efficiently (v2.0.0)',
    props: {
      enableVirtualScroll: true,
      virtualScrollItemSize: 40,
      placeholder: 'Virtual scroll enabled...'
    }
  },
  {
    name: 'Validation Error',
    description: 'Show error validation state (v2.0.0)',
    props: {
      validationState: 'error',
      validationMessage: 'Please select a valid country',
      placeholder: 'Select a country...'
    }
  },
  {
    name: 'Validation Success',
    description: 'Show success validation state (v2.0.0)',
    props: {
      validationState: 'success',
      validationMessage: 'Selection verified successfully',
      placeholder: 'Select a country...'
    }
  },
  {
    name: 'Recent Selections',
    description: 'Show recently selected items at top (v2.0.0)',
    props: {
      showRecentSelections: true,
      recentSelectionsLimit: 5,
      recentSelectionsLabel: 'Recently Selected',
      placeholder: 'Select with recent history...'
    }
  },
  {
    name: 'Copy/Paste Multi-Select',
    description: 'Copy and paste comma-separated values (v2.0.0)',
    props: {
      isMulti: true,
      enableCopyPaste: true,
      copyDelimiter: ', ',
      placeholder: 'Try Ctrl+C and Ctrl+V...'
    }
  },
  {
    name: 'Drag & Drop Tags',
    description: 'Reorder selected tags with drag-and-drop (v2.1.0)',
    props: {
      isMulti: true,
      enableDragDrop: true,
      dragDropPlaceholder: 'Drop here',
      dragDropAnimation: 200,
      placeholder: 'Select and drag tags...'
    }
  },
  {
    name: 'Pin Favorite Options',
    description: 'Pin frequently used options to top (v2.1.0)',
    props: {
      enablePinning: true,
      maxPinnedOptions: 3,
      persistPinnedOptions: true,
      pinnedOptionsLabel: 'Favorites',
      placeholder: 'Select and pin options...'
    }
  },
  {
    name: 'Search Highlighting',
    description: 'Highlight matching text in options (v2.2.0)',
    props: {
      enableSearchHighlight: true,
      searchHighlightColor: '#ffeb3b',
      searchHighlightTextColor: '#000',
      isSearchable: true,
      placeholder: 'Search with highlighting...'
    }
  },
  {
    name: 'Tag Overflow Static',
    description: 'Show +N more when tags exceed limit (v2.2.0)',
    props: {
      isMulti: true,
      maxVisibleTags: 3,
      showMoreTagsText: '+{count} more',
      placeholder: 'Select multiple (max 3 visible)...'
    }
  },
  {
    name: 'Tag Overflow Collapsible',
    description: 'Collapsible tags with show all/less (v2.2.0)',
    props: {
      isMulti: true,
      maxVisibleTags: 3,
      collapsibleTags: true,
      showAllTagsText: 'Show all',
      showLessTagsText: 'Show less',
      placeholder: 'Select multiple (collapsible)...'
    }
  },
  {
    name: 'Advanced Keyboard',
    description: 'Home/End, Type-ahead, Ctrl+A (v2.0.0)',
    props: {
      isMulti: true,
      enableAdvancedKeyboard: true,
      typeAheadDelay: 500,
      placeholder: 'Try keyboard shortcuts...'
    }
  },
  {
    name: 'Multi-Select with Validation',
    description: 'Combine multi-select with validation (v2.0.0)',
    props: {
      isMulti: true,
      validationState: 'warning',
      validationMessage: 'Select at least 2 countries',
      placeholder: 'Select multiple...'
    }
  },
  {
    name: 'Purple Theme + Recent',
    description: 'Purple theme with recent selections (v2.0.0)',
    props: {
      theme: 'purple',
      showRecentSelections: true,
      enableRecentSelectionsPersistence: true,
      placeholder: 'Purple with recent...'
    }
  },
  {
    name: 'Large Size + Validation',
    description: 'Large size with success validation (v2.0.0)',
    props: {
      selectSize: 'large',
      containerSize: 'lg',
      validationState: 'success',
      validationMessage: 'Perfect choice!',
      placeholder: 'Large validated select...'
    }
  },
  {
    name: 'Green Multi + Copy/Paste',
    description: 'Green theme multi-select with copy/paste (v2.0.0)',
    props: {
      isMulti: true,
      theme: 'green',
      enableCopyPaste: true,
      enableAdvancedKeyboard: true,
      placeholder: 'Green multi with copy/paste...'
    }
  },

  // v2.3.0 Features
  {
    name: 'Fuzzy Search',
    description: 'Intelligent fuzzy search - try "fb" to match "Facebook" (v2.3.0)',
    props: {
      enableFuzzySearch: true,
      fuzzySearchThreshold: 0.3,
      fuzzySearchCaseSensitive: false,
      isSearchable: true,
      placeholder: 'Try fuzzy search (e.g., "fb")...'
    }
  },
  {
    name: 'Auto Dark Mode',
    description: 'Automatic system dark mode detection (v2.3.0)',
    props: {
      enableAutoThemeDetection: true,
      darkModeTheme: 'dark',
      lightModeTheme: 'blue',
      colorScheme: 'auto',
      placeholder: 'Follows system theme...'
    }
  },
  {
    name: 'Manual Dark Mode',
    description: 'Always use dark mode (v2.3.0)',
    props: {
      colorScheme: 'dark',
      darkModeTheme: 'dark',
      placeholder: 'Always dark mode...'
    }
  },
  {
    name: 'Loading Skeleton',
    description: 'Modern shimmer skeleton while loading (v2.3.0)',
    props: {
      isLoading: true,
      enableLoadingSkeleton: true,
      skeletonItemCount: 5,
      skeletonItemHeight: 40,
      placeholder: 'Loading with skeleton...'
    }
  },
  {
    name: 'Compact Mode',
    description: 'Ultra-dense layout for dashboards (v2.3.0)',
    props: {
      compactMode: true,
      isMulti: true,
      placeholder: 'Compact select...'
    }
  },
  {
    name: 'Option Checkboxes',
    description: 'Visual checkboxes for better selection feedback (v2.3.0)',
    props: {
      isMulti: true,
      showOptionCheckboxes: true,
      checkboxPosition: 'left',
      checkboxStyle: 'filled',
      placeholder: 'Select with checkboxes...'
    }
  },
  {
    name: 'Checkbox Outlined Style',
    description: 'Checkboxes with outlined style (v2.3.0)',
    props: {
      isMulti: true,
      showOptionCheckboxes: true,
      checkboxPosition: 'left',
      checkboxStyle: 'outlined',
      theme: 'purple',
      placeholder: 'Outlined checkboxes...'
    }
  },
  {
    name: 'Alphabetical Sorting',
    description: 'Auto-sort options A-Z (v2.3.0)',
    props: {
      sortMode: 'alphabetical-asc',
      placeholder: 'Sorted A-Z...'
    }
  },
  {
    name: 'Recently Used Sorting',
    description: 'Show recently selected options first (v2.3.0)',
    props: {
      sortMode: 'recently-used',
      recentlyUsedLimit: 10,
      placeholder: 'Recently used first...'
    }
  },
  {
    name: 'Fuzzy + Dark + Compact',
    description: 'Combine fuzzy search, dark mode, and compact layout (v2.3.0)',
    props: {
      enableFuzzySearch: true,
      colorScheme: 'dark',
      compactMode: true,
      isSearchable: true,
      placeholder: 'Fuzzy + Dark + Compact...'
    }
  },
  {
    name: 'Multi-Select + Checkboxes + Sorting',
    description: 'Multi-select with checkboxes and alphabetical sorting (v2.3.0)',
    props: {
      isMulti: true,
      showOptionCheckboxes: true,
      checkboxStyle: 'filled',
      sortMode: 'alphabetical-asc',
      theme: 'green',
      placeholder: 'Multi + Checkboxes + Sorted...'
    }
  },
  {
    name: 'Compact + Dark + Checkboxes',
    description: 'Dense dark mode select with checkboxes (v2.3.0)',
    props: {
      isMulti: true,
      compactMode: true,
      colorScheme: 'dark',
      showOptionCheckboxes: true,
      checkboxStyle: 'outlined',
      placeholder: 'Compact dark with checkboxes...'
    }
  },
  {
    name: 'Skeleton + Purple + Virtual Scroll',
    description: 'Loading skeleton with purple theme and virtual scrolling (v2.3.0)',
    props: {
      isLoading: true,
      enableLoadingSkeleton: true,
      enableVirtualScroll: true,
      theme: 'purple',
      skeletonItemCount: 8,
      placeholder: 'Skeleton + Virtual Scroll...'
    }
  },
  {
    name: 'Fuzzy + Sorting + Checkboxes',
    description: 'Ultimate combo: fuzzy search, sorting, and checkboxes (v2.3.0)',
    props: {
      isMulti: true,
      enableFuzzySearch: true,
      sortMode: 'alphabetical-asc',
      showOptionCheckboxes: true,
      checkboxStyle: 'filled',
      theme: 'blue',
      placeholder: 'Ultimate v2.3.0 combo...'
    }
  }
];
