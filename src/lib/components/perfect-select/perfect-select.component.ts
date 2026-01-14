import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  HostListener,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  ContentChild,
  TemplateRef,
  forwardRef,
  effect,
  SecurityContext
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DragDropModule, CdkDropList, CdkDrag, CdkDragHandle, CdkDragPlaceholder, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { selectAnimations } from '../../animations/select.animations';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { THEMES, ThemeName } from '../../constants/themes.constant';
import { SelectOption } from '../../models/select-option.interface';
import { ValidationState } from '../../models/validation.types';
import {
  SelectChangeEvent,
  SelectInputChangeEvent,
  SelectCreateOptionEvent,
  SelectOptionsLoadedEvent,
  SelectLoadErrorEvent,
  SelectCopyEvent,
  SelectPasteEvent,
  SelectScrollEndEvent,
  SelectReorderEvent,
  SelectPinEvent
} from '../../models/select-events.interface';
import { fuzzyMatch, sortByFuzzyScore } from '../../utils/fuzzy-search.util';
import { sortOptions, SortConfig, SortMode } from '../../utils/sort-options.util';
import { DarkModeProvider, ColorScheme } from '../../providers/dark-mode.provider';
import { BulkAction, SelectBulkActionEvent } from '../../models/bulk-actions.interface';

@Component({
  selector: 'ng-perfect-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideDirective,
    ScrollingModule,
    DragDropModule
  ],
  templateUrl: './perfect-select.component.html',
  styleUrls: ['./perfect-select.component.scss'],
  animations: selectAnimations,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PerfectSelectComponent),
    multi: true
  }]
})
export class PerfectSelectComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {

  // Core Props
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Select...';

  // React-Select Compatible Props (dual naming)
  @Input() isMulti = false;
  @Input() set multiple(value: boolean) { this.isMulti = value; }
  @Input() isSearchable = true;
  @Input() set searchable(value: boolean) { this.isSearchable = value; }
  @Input() isClearable = true;
  @Input() set clearable(value: boolean) { this.isClearable = value; }
  @Input() isDisabled = false;
  @Input() set disabled(value: boolean) { this.isDisabled = value; }
  @Input() isLoading = false;
  @Input() set loading(value: boolean) { this.isLoading = value; }
  @Input() isRtl = false;
  @Input() closeMenuOnSelect = true;
  @Input() hideSelectedOptions = false;

  // Creatable Mode
  @Input() isCreatable = false;
  @Input() allowCreateWhileLoading = false;
  @Input() createOptionPosition: 'first' | 'last' = 'last';
  @Input() formatCreateLabel: (inputValue: string) => string = (inputValue) => `Create "${inputValue}"`;

  // Async Loading
  @Input() loadOptions: ((inputValue: string) => Promise<SelectOption[]>) | null = null;
  @Input() cacheOptions = true;
  @Input() defaultOptions = false;

  // Styling & Theming
  @Input() selectSize: 'smaller' | 'small' | 'medium' | 'large' | 'larger' = 'medium';
  @Input() containerSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() theme: ThemeName = 'blue';
  @Input() borderRadius = '8px';
  @Input() customStyles: {
    container?: string;
    control?: string;
    menu?: string;
    option?: string;
    tag?: string;
  } = {};
  @Input() maxHeight = '300px';
  @Input() menuPlacement: 'auto' | 'top' | 'bottom' = 'auto';
  @Input() menuPosition: 'absolute' | 'fixed' = 'absolute';

  // Option Customization
  @Input() getOptionLabel: (option: SelectOption) => string = (option) => option.label || String(option.value);
  @Input() getOptionValue: (option: SelectOption) => any = (option) => option.id || option.value;
  @Input() isOptionDisabled: (option: SelectOption) => boolean = (option) => option.disabled || false;
  @Input() filterOption: ((option: SelectOption, inputValue: string) => boolean) | null = null;

  // Grouping
  @Input() isGrouped = false;
  @Input() groupBy: ((option: SelectOption) => string) | null = null;

  // Advanced Features
  @Input() showSelectAll = false;
  @Input() selectAllText = 'Select All';
  @Input() deselectAllText = 'Deselect All';
  @Input() showOptionIcons = false;
  @Input() showOptionBadges = false;
  @Input() maxOptionsDisplay = 1000;
  @Input() optionHeight = 40;
  @Input() emptyStateText = 'No options available';
  @Input() emptySearchText = 'No results found';

  // v1.0.1 Features
  @Input() maxSelectedOptions: number | null = null;
  @Input() maxSelectedMessage: string = 'Maximum selections reached';
  @Input() debounceTime: number = 300;
  @Input() minSearchLength: number = 0;
  @Input() minSearchMessage: string = 'Type to search...';

  // v1.2.0 Features - Virtual Scrolling
  @Input() enableVirtualScroll: boolean = false;
  @Input() virtualScrollItemSize: number = 40;
  @Input() virtualScrollMinBufferPx: number = 200;
  @Input() virtualScrollMaxBufferPx: number = 400;

  // v1.2.0 Features - Validation States
  @Input() validationState: ValidationState = 'default';
  @Input() validationMessage: string = '';
  @Input() showValidationIcon: boolean = true;

  // v1.2.0 Features - Tooltips
  @Input() showTooltips: boolean = false;
  @Input() tooltipDelay: number = 300;
  @Input() getOptionTooltip: (option: SelectOption) => string = (option) => option.tooltip || '';

  // v1.2.0 Features - Recent Selections
  @Input() showRecentSelections: boolean = false;
  @Input() recentSelectionsLimit: number = 5;
  @Input() recentSelectionsLabel: string = 'Recent';
  @Input() enableRecentSelectionsPersistence: boolean = false;

  // v1.2.0 Features - Infinite Scroll / Pagination
  @Input() enableInfiniteScroll: boolean = false;
  @Input() infiniteScrollThreshold: number = 80;
  @Input() totalOptionsCount: number | null = null;

  // v1.2.0 Features - Advanced Keyboard
  @Input() enableAdvancedKeyboard: boolean = true;
  @Input() typeAheadDelay: number = 500;
  @Input() enableCopyPaste: boolean = true;
  @Input() copyDelimiter: string = ', ';
  @Input() pasteDelimiter: string = ',';

  // v2.1.0 Features - Drag & Drop Reordering
  @Input() enableDragDrop: boolean = false;
  @Input() dragDropPlaceholder: string = 'Drop here';
  @Input() dragDropAnimation: number = 200;

  // v2.1.0 Features - Option Pinning
  @Input() enablePinning: boolean = false;
  @Input() maxPinnedOptions: number | null = null;
  @Input() pinnedOptionsLabel: string = 'Pinned';
  @Input() persistPinnedOptions: boolean = false;

  // v2.2.0 Features - Search Highlighting
  @Input() enableSearchHighlight: boolean = true;
  @Input() searchHighlightColor: string = '#ffeb3b';
  @Input() searchHighlightTextColor: string = '#000';

  // v2.2.0 Features - Tag Overflow Management
  @Input() maxVisibleTags: number | null = null;
  @Input() showMoreTagsText: string = '+{count} more';
  @Input() collapsibleTags: boolean = false;
  @Input() showAllTagsText: string = 'Show all';
  @Input() showLessTagsText: string = 'Show less';

  // v2.3.0 Features - Fuzzy Search
  @Input() enableFuzzySearch: boolean = false;
  @Input() fuzzySearchThreshold: number = 0;
  @Input() fuzzySearchCaseSensitive: boolean = false;

  // v2.3.0 Features - Dark Mode
  @Input() enableAutoThemeDetection: boolean = false;
  @Input() colorScheme: ColorScheme = 'auto';
  @Input() darkModeTheme: ThemeName = 'dark';
  @Input() lightModeTheme: ThemeName = 'blue';

  // v2.3.0 Features - Loading Skeleton
  @Input() enableLoadingSkeleton: boolean = true;
  @Input() skeletonItemCount: number = 5;
  @Input() skeletonItemHeight: number = 40;
  @Input() skeletonAnimationDelay: number = 800;

  // v2.3.0 Features - Compact Mode
  @Input() compactMode: boolean = false;

  // v2.3.0 Features - Option Checkboxes
  @Input() showOptionCheckboxes: boolean = false;
  @Input() checkboxPosition: 'left' | 'right' = 'left';
  @Input() checkboxStyle: 'default' | 'filled' | 'outlined' = 'default';

  // v2.3.0 Features - Bulk Actions
  @Input() bulkActions: BulkAction[] = [];
  @Input() enableBulkActions: boolean = false;
  @Input() bulkActionsPosition: 'above' | 'below' | 'float' = 'above';
  @Input() bulkActionsLabel: string = 'Actions:';

  // v2.3.0 Features - Option Sorting
  @Input() sortMode: SortMode = 'none';
  @Input() customSortComparator: ((a: SelectOption, b: SelectOption) => number) | null = null;
  @Input() recentlyUsedLimit: number = 10;

  // Behavior
  @Input() name = 'angular-perfect-select';
  @Input() id = 'angular-perfect-select';
  @Input() autoFocus = false;
  @Input() openMenuOnFocus = false;
  @Input() openMenuOnClick = true;
  @Input() tabSelectsValue = true;
  @Input() backspaceRemovesValue = true;
  @Input() escapeClearsValue = false;
  @Input() noOptionsMessage: () => string = () => 'No options';
  @Input() loadingMessage: () => string = () => 'Loading...';

  // Events
  @Output() change = new EventEmitter<SelectChangeEvent>();
  @Output() clear = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();
  @Output() menuOpen = new EventEmitter<void>();
  @Output() menuClose = new EventEmitter<void>();
  @Output() inputChange = new EventEmitter<SelectInputChangeEvent>();
  @Output() createOption = new EventEmitter<SelectCreateOptionEvent>();
  @Output() optionsLoaded = new EventEmitter<SelectOptionsLoadedEvent>();
  @Output() loadError = new EventEmitter<SelectLoadErrorEvent>();

  // v1.2.0 Events
  @Output() copy = new EventEmitter<SelectCopyEvent>();
  @Output() paste = new EventEmitter<SelectPasteEvent>();
  @Output() scrollEnd = new EventEmitter<SelectScrollEndEvent>();

  // v2.1.0 Events
  @Output() reorder = new EventEmitter<SelectReorderEvent>();
  @Output() pin = new EventEmitter<SelectPinEvent>();

  // v2.3.0 Events
  @Output() bulkActionSelected = new EventEmitter<SelectBulkActionEvent>();

  // ViewChildren
  @ViewChild('selectContainer', { static: false }) selectContainerRef!: ElementRef;
  @ViewChild('searchInput', { static: false }) searchInputRef!: ElementRef;
  @ViewChild('menuRef', { static: false }) menuElementRef!: ElementRef;
  @ViewChild(CdkVirtualScrollViewport, { static: false }) virtualScrollViewport?: CdkVirtualScrollViewport;

  // ContentChildren - Custom Templates
  @ContentChild('optionTemplate', { read: TemplateRef, static: false }) optionTemplate?: TemplateRef<any>;
  @ContentChild('selectedOptionTemplate', { read: TemplateRef, static: false }) selectedOptionTemplate?: TemplateRef<any>;
  @ContentChild('tagTemplate', { read: TemplateRef, static: false }) tagTemplate?: TemplateRef<any>;

  // Signals for reactive state
  isOpen = signal(false);
  searchTerm = signal('');
  highlightedIndex = signal(-1);
  internalValue = signal<any>(this.isMulti ? [] : null);
  internalOptions = signal<SelectOption[]>([]);
  isLoadingAsync = signal(false);
  private optionsCache = new Map<string, SelectOption[]>();
  private debounceTimeout: any = null;

  // v1.2.0 Signals
  recentSelections = signal<SelectOption[]>([]);
  typeAheadBuffer = signal<string>('');
  hoveredOptionIndex = signal<number>(-1);
  isScrolling = signal<boolean>(false);

  // v1.2.0 Private state
  private typeAheadTimeout: any = null;
  private tooltipTimeout: any = null;
  private recentSelectionsStorageKey = '';
  private scrollEndTimeout: any = null;

  // v2.1.0 Signals
  pinnedOptions = signal<SelectOption[]>([]);
  isDragging = signal<boolean>(false);

  // v2.1.0 Private state
  private pinnedOptionsStorageKey = '';

  // v2.2.0 Signals
  tagsExpanded = signal<boolean>(false);

  // v2.3.0 Signals
  isDarkMode = signal<boolean>(false);
  recentlyUsedIds = signal<Set<any>>(new Set());

  // Computed signals
  currentTheme = computed(() => THEMES[this.theme] || THEMES.blue);

  filteredOptions = computed(() => {
    const term = this.searchTerm();
    const opts = this.internalOptions();
    const pinned = this.pinnedOptions();

    // Check min search length
    if (this.minSearchLength > 0 && term.length < this.minSearchLength) {
      return [];
    }

    let filtered: SelectOption[];

    // v2.3.0: Fuzzy search if enabled
    if (this.enableFuzzySearch && term) {
      filtered = sortByFuzzyScore(
        opts,
        term,
        this.getOptionLabel,
        {
          caseSensitive: this.fuzzySearchCaseSensitive,
          threshold: this.fuzzySearchThreshold
        }
      );
    } else {
      // Standard filtering
      filtered = !term ? opts : opts.filter(option => {
        if (this.filterOption) {
          return this.filterOption(option, term);
        }
        const label = this.getOptionLabel(option);
        return label.toLowerCase().includes(term.toLowerCase());
      });
    }

    // v2.3.0: Apply sorting if configured
    if (this.sortMode !== 'none' && !term) {
      const sortConfig: SortConfig = {
        mode: this.sortMode,
        customComparator: this.customSortComparator || undefined,
        getLabel: this.getOptionLabel,
        recentlyUsedIds: this.recentlyUsedIds()
      };
      filtered = sortOptions(filtered, sortConfig);
    }

    // v2.1.0: Sort pinned options to the top
    if (this.enablePinning && pinned.length > 0) {
      const pinnedIds = new Set(pinned.map(p => p.id));
      const pinnedFiltered = filtered.filter(opt => pinnedIds.has(opt.id));
      const unpinnedFiltered = filtered.filter(opt => !pinnedIds.has(opt.id));
      filtered = [...pinnedFiltered, ...unpinnedFiltered];
    }

    return filtered;
  });

  selectedOptions = computed(() => {
    const value = this.internalValue();
    if (!value) return [];

    const allOptions = this.internalOptions();

    if (this.isMulti) {
      const values = Array.isArray(value) ? value : [];
      // Map values to option objects
      return values.map(v => {
        const found = allOptions.find(opt => this.getOptionValue(opt) === v);
        return found || { id: v, label: String(v), value: v };
      });
    }

    // Single select - find the option by value
    const found = allOptions.find(opt => this.getOptionValue(opt) === value);
    return found ? [found] : [];
  });

  displayText = computed(() => {
    const selected = this.selectedOptions();
    if (selected.length === 0) {
      return this.placeholder;
    }

    if (this.isMulti) {
      return `${selected.length} selected`;
    }

    return this.getOptionLabel(selected[0]);
  });

  // v2.2.0: Visible tags for overflow management
  visibleTags = computed(() => {
    const selected = this.selectedOptions();
    const expanded = this.tagsExpanded();

    if (!this.maxVisibleTags || expanded || selected.length <= this.maxVisibleTags) {
      return selected;
    }

    return selected.slice(0, this.maxVisibleTags);
  });

  hiddenTagsCount = computed(() => {
    const selected = this.selectedOptions();
    const visible = this.visibleTags();
    return selected.length - visible.length;
  });

  // v2.3.0 Computed signals
  resolvedTheme = computed(() => {
    if (this.enableAutoThemeDetection) {
      return this.isDarkMode() ? this.darkModeTheme : this.lightModeTheme;
    }
    return this.theme;
  });

  hasBulkActions = computed(() => {
    return this.enableBulkActions &&
           this.bulkActions.length > 0 &&
           this.selectedOptions().length > 0;
  });

  groupedOptions = computed(() => {
    if (!this.isGrouped || !this.groupBy) {
      return null;
    }

    const opts = this.filteredOptions();
    const groups: Record<string, SelectOption[]> = {};

    opts.forEach(option => {
      const group = this.groupBy!(option);
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(option);
    });

    return groups;
  });

  displayOptions = computed(() => {
    let opts = this.filteredOptions();

    if (this.isCreatable && this.searchTerm() && !this.isLoadingAsync()) {
      const term = this.searchTerm();
      const exactMatch = opts.some(opt =>
        this.getOptionLabel(opt).toLowerCase() === term.toLowerCase()
      );

      if (!exactMatch) {
        const createOption: SelectOption = {
          id: '__create__',
          label: this.formatCreateLabel(term),
          value: term,
          __isCreate__: true
        };

        if (this.createOptionPosition === 'first') {
          opts = [createOption, ...opts];
        } else {
          opts = [...opts, createOption];
        }
      }
    }

    return opts;
  });

  allOptionsSelected = computed(() => {
    if (!this.isMulti) return false;
    const opts = this.filteredOptions().filter(opt => !this.isOptionDisabled(opt));
    const selected = this.selectedOptions();
    return opts.length > 0 && opts.every(opt =>
      selected.some(s => this.getOptionValue(s) === this.getOptionValue(opt))
    );
  });

  someOptionsSelected = computed(() => {
    if (!this.isMulti) return false;
    const opts = this.filteredOptions().filter(opt => !this.isOptionDisabled(opt));
    const selected = this.selectedOptions();
    const selectedCount = opts.filter(opt =>
      selected.some(s => this.getOptionValue(s) === this.getOptionValue(opt))
    ).length;
    return selectedCount > 0 && selectedCount < opts.length;
  });

  // v1.0.1 Computed signals
  isMaxSelectionReached = computed(() => {
    if (!this.isMulti || this.maxSelectedOptions === null) return false;
    const selected = this.selectedOptions();
    return selected.length >= this.maxSelectedOptions;
  });

  showMinSearchMessage = computed(() => {
    if (this.minSearchLength === 0) return false;
    const term = this.searchTerm();
    return this.isOpen() && term.length > 0 && term.length < this.minSearchLength;
  });

  // v1.2.0 Computed signals
  displayOptionsWithRecent = computed(() => {
    if (!this.showRecentSelections || this.searchTerm()) {
      return this.displayOptions();
    }

    const recent = this.recentSelections();
    const display = this.displayOptions();

    // Filter out recent options from display list to avoid duplicates
    const displayWithoutRecent = display.filter(opt =>
      !recent.some(r => this.getOptionValue(r) === this.getOptionValue(opt))
    );

    // Combine recent (marked) and regular options
    const markedRecent = recent.map(opt => ({ ...opt, __isRecent__: true }));
    return [...markedRecent, ...displayWithoutRecent];
  });

  validationIconName = computed(() => {
    const state = this.validationState;
    switch (state) {
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'success': return 'check_circle';
      case 'info': return 'info';
      default: return '';
    }
  });

  // Helper method for template
  getEnabledOptionsCount(): number {
    return this.filteredOptions().filter(opt => !this.isOptionDisabled(opt)).length;
  }

  // ControlValueAccessor
  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(
    private sanitizer: DomSanitizer,
    private darkModeProvider: DarkModeProvider
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Update internal options when the options input changes
    if (changes['options'] && this.options.length > 0 && !this.loadOptions) {
      this.internalOptions.set([...this.options]);
    }

    // Update closeMenuOnSelect based on isMulti
    if (changes['isMulti'] && this.isMulti && this.closeMenuOnSelect === true) {
      this.closeMenuOnSelect = false;
    }
  }

  writeValue(value: any): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.isDisabled = disabled;
  }

  ngOnInit(): void {
    // Initialize options
    if (this.options.length > 0) {
      this.internalOptions.set([...this.options]);
    }

    // Update closeMenuOnSelect based on isMulti (initial setup)
    if (this.isMulti && this.closeMenuOnSelect === true) {
      this.closeMenuOnSelect = false;
    }

    // Load default options if async
    if (this.loadOptions && this.defaultOptions) {
      this.handleLoadOptions('');
    }

    // v1.2.0: Initialize recent selections
    if (this.showRecentSelections) {
      this.recentSelectionsStorageKey = `ps-recent-${this.name || this.id}`;
      this.loadRecentSelections();
    }

    // v2.1.0: Initialize pinned options
    if (this.enablePinning) {
      this.pinnedOptionsStorageKey = `ps-pinned-${this.name || this.id}`;
      this.loadPinnedOptions();
    }

    // v2.3.0: Initialize dark mode detection
    if (this.enableAutoThemeDetection) {
      effect(() => {
        const darkMode = this.darkModeProvider.isDarkMode();
        this.isDarkMode.set(darkMode);
      });
    }

    // Auto-focus if needed
    if (this.autoFocus) {
      setTimeout(() => {
        if (this.searchInputRef) {
          this.searchInputRef.nativeElement.focus();
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Clear debounce timeout
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // v1.2.0: Clear new timeouts
    if (this.typeAheadTimeout) {
      clearTimeout(this.typeAheadTimeout);
    }
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
    if (this.scrollEndTimeout) {
      clearTimeout(this.scrollEndTimeout);
    }
  }

  // Keyboard Navigation
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.isDisabled) return;

    // v1.2.0: Advanced keyboard shortcuts
    if (this.enableAdvancedKeyboard) {
      // Ctrl/Cmd + A: Select All
      if ((event.ctrlKey || event.metaKey) && event.key === 'a' && this.isMulti && this.isOpen()) {
        event.preventDefault();
        this.selectAll();
        return;
      }

      // Ctrl/Cmd + C: Copy
      if ((event.ctrlKey || event.metaKey) && event.key === 'c' && this.enableCopyPaste) {
        if (this.selectedOptions().length > 0) {
          event.preventDefault();
          this.copySelectedValues();
        }
        return;
      }

      // Ctrl/Cmd + V: Paste
      if ((event.ctrlKey || event.metaKey) && event.key === 'v' && this.enableCopyPaste && this.isMulti) {
        // Let browser handle paste, we'll catch it in the paste event
        return;
      }

      // Home: Jump to first option
      if (event.key === 'Home' && this.isOpen()) {
        event.preventDefault();
        this.highlightedIndex.set(0);
        this.scrollHighlightedIntoView();
        return;
      }

      // End: Jump to last option
      if (event.key === 'End' && this.isOpen()) {
        event.preventDefault();
        const opts = this.displayOptions();
        this.highlightedIndex.set(Math.max(0, opts.length - 1));
        this.scrollHighlightedIntoView();
        return;
      }

      // Type-ahead: Single character typing
      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && this.isOpen()) {
        this.handleTypeAhead(event.key);
      }
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) {
          this.toggleDropdown();
        } else {
          this.moveHighlight(1);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.moveHighlight(-1);
        break;

      case 'Enter':
        event.preventDefault();
        if (this.isOpen()) {
          const index = this.highlightedIndex();
          const opts = this.showRecentSelections ? this.displayOptionsWithRecent() : this.displayOptions();
          if (index >= 0 && index < opts.length) {
            this.selectOption(opts[index]);
          }
        } else {
          this.toggleDropdown();
        }
        break;

      case 'Escape':
        event.preventDefault();
        if (this.isOpen()) {
          this.closeDropdown();
        }
        if (this.escapeClearsValue) {
          this.clearSelection(event);
        }
        break;

      case 'Tab':
        if (this.isOpen() && this.tabSelectsValue) {
          const index = this.highlightedIndex();
          const opts = this.displayOptions();
          if (index >= 0 && index < opts.length) {
            event.preventDefault();
            this.selectOption(opts[index]);
          }
        }
        if (this.isOpen()) {
          this.closeDropdown();
        }
        break;

      case 'Backspace':
        if (this.backspaceRemovesValue && this.isMulti && !this.searchTerm()) {
          const selected = this.selectedOptions();
          if (selected.length > 0) {
            event.preventDefault();
            this.removeOption(selected[selected.length - 1], event);
          }
        }
        break;
    }
  }

  // v1.2.0: Paste event handler
  @HostListener('paste', ['$event'])
  handlePaste(event: ClipboardEvent): void {
    if (!this.enableCopyPaste || !this.isMulti || this.isDisabled) return;

    const pastedText = event.clipboardData?.getData('text');
    if (!pastedText) return;

    event.preventDefault();
    this.pasteValues(pastedText);
  }

  // Toggle dropdown
  toggleDropdown(): void {
    if (this.isDisabled) return;

    if (this.isOpen()) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    this.isOpen.set(true);
    this.menuOpen.emit();

    // Focus search input
    setTimeout(() => {
      if (this.isSearchable && this.searchInputRef) {
        this.searchInputRef.nativeElement.focus();
      }
    });
  }

  closeDropdown(): void {
    this.isOpen.set(false);
    this.searchTerm.set('');
    this.highlightedIndex.set(-1);
    this.menuClose.emit();
    this.onTouched();
  }

  // Select option
  selectOption(option: SelectOption): void {
    if (this.isOptionDisabled(option)) return;

    // Handle create option
    if (option.__isCreate__) {
      const newOption: SelectOption = {
        id: Date.now().toString(),
        label: this.searchTerm(),
        value: this.searchTerm(),
        __isNew__: true
      };
      this.internalOptions.update(opts => [...opts, newOption]);
      this.createOption.emit({ option: newOption });
      option = newOption;
    }

    const optionValue = this.getOptionValue(option);

    if (this.isMulti) {
      const currentValue = Array.isArray(this.internalValue()) ? [...this.internalValue()] : [];
      const exists = currentValue.includes(optionValue);

      let newValue: any[];
      if (exists) {
        newValue = currentValue.filter((v: any) => v !== optionValue);
      } else {
        // Check max selection limit
        if (this.maxSelectedOptions !== null && currentValue.length >= this.maxSelectedOptions) {
          return; // Don't allow selection beyond max
        }
        newValue = [...currentValue, optionValue];
      }

      this.internalValue.set(newValue);
      this.onChange(newValue);
      this.change.emit({
        value: newValue,
        option,
        action: exists ? 'remove-value' : 'select-option'
      });

      // v1.2.0: Track recent selection
      if (!exists && this.showRecentSelections) {
        this.addToRecentSelections(option);
      }

      // v2.3.0: Track recently used for sorting
      if (!exists && this.sortMode === 'recently-used') {
        this.trackRecentlyUsed(option);
      }
    } else {
      this.internalValue.set(optionValue);
      this.onChange(optionValue);
      this.change.emit({
        value: optionValue,
        option,
        action: 'select-option'
      });

      // v1.2.0: Track recent selection
      if (this.showRecentSelections) {
        this.addToRecentSelections(option);
      }

      // v2.3.0: Track recently used for sorting
      if (this.sortMode === 'recently-used') {
        this.trackRecentlyUsed(option);
      }
    }

    if (this.closeMenuOnSelect) {
      this.closeDropdown();
    }

    this.searchTerm.set('');
  }

  // Remove option (multi-select)
  removeOption(option: SelectOption, event: Event): void {
    event.stopPropagation();

    const currentValue = Array.isArray(this.internalValue()) ? [...this.internalValue()] : [];
    const optionValue = this.getOptionValue(option);
    const newValue = currentValue.filter((v: any) => v !== optionValue);

    this.internalValue.set(newValue);
    this.onChange(newValue);
    this.change.emit({
      value: newValue,
      option,
      action: 'remove-value'
    });
  }

  // Clear selection
  clearSelection(event: Event): void {
    event.stopPropagation();

    const newValue = this.isMulti ? [] : null;
    this.internalValue.set(newValue);
    this.onChange(newValue);
    this.change.emit({
      value: newValue,
      action: 'clear'
    });
    this.clear.emit();
  }

  // Select All / Deselect All
  selectAll(): void {
    let opts = this.filteredOptions().filter(opt => !this.isOptionDisabled(opt));

    // Respect max selection limit
    if (this.maxSelectedOptions !== null && opts.length > this.maxSelectedOptions) {
      opts = opts.slice(0, this.maxSelectedOptions);
    }

    const values = opts.map(opt => this.getOptionValue(opt));
    this.internalValue.set(values);
    this.onChange(values);
    this.change.emit({
      value: values,
      option: opts,
      action: 'select-all'
    });
  }

  deselectAll(): void {
    this.internalValue.set([]);
    this.onChange([]);
    this.change.emit({
      value: [],
      action: 'deselect-all'
    });
  }

  // Search input change
  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.highlightedIndex.set(0);
    this.inputChange.emit({
      value: term,
      action: 'input-change'
    });

    // Trigger async loading if configured with debounce
    if (this.loadOptions) {
      // Clear existing timeout
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      // Set new timeout for debounced loading
      this.debounceTimeout = setTimeout(() => {
        this.handleLoadOptions(term);
      }, this.debounceTime);
    }
  }

  // Async loading
  async handleLoadOptions(inputValue: string): Promise<void> {
    if (!this.loadOptions) return;

    // Check cache
    if (this.cacheOptions && this.optionsCache.has(inputValue)) {
      this.internalOptions.set(this.optionsCache.get(inputValue)!);
      return;
    }

    this.isLoadingAsync.set(true);

    try {
      const options = await this.loadOptions(inputValue);
      this.internalOptions.set(options);

      if (this.cacheOptions) {
        this.optionsCache.set(inputValue, options);
      }

      this.optionsLoaded.emit({ options });
    } catch (error) {
      this.loadError.emit({ error: error as Error });
    } finally {
      this.isLoadingAsync.set(false);
    }
  }

  // Move highlight index
  moveHighlight(direction: number): void {
    const opts = this.displayOptions();
    if (opts.length === 0) return;

    let newIndex = this.highlightedIndex() + direction;

    if (newIndex < 0) newIndex = 0;
    if (newIndex >= opts.length) newIndex = opts.length - 1;

    this.highlightedIndex.set(newIndex);
    this.scrollHighlightedIntoView();
  }

  // Scroll highlighted option into view
  scrollHighlightedIntoView(): void {
    setTimeout(() => {
      if (!this.menuElementRef) return;

      const menu = this.menuElementRef.nativeElement;
      const highlighted = menu.querySelector('.option.highlighted');

      if (highlighted) {
        const menuRect = menu.getBoundingClientRect();
        const optionRect = highlighted.getBoundingClientRect();

        if (optionRect.bottom > menuRect.bottom) {
          menu.scrollTop += optionRect.bottom - menuRect.bottom;
        } else if (optionRect.top < menuRect.top) {
          menu.scrollTop -= menuRect.top - optionRect.top;
        }
      }
    });
  }

  // Click outside handler
  onClickOutside(): void {
    if (this.isOpen()) {
      this.closeDropdown();
      this.blur.emit();
    }
  }

  // Check if option is selected
  isSelected(option: SelectOption): boolean {
    const selected = this.selectedOptions();
    const optionValue = this.getOptionValue(option);
    return selected.some(s => this.getOptionValue(s) === optionValue);
  }

  // Sanitize HTML for icons
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // Track by function for ngFor
  trackByValue(index: number, option: SelectOption): any {
    return this.getOptionValue(option);
  }

  trackByGroup(index: number, item: [string, SelectOption[]]): string {
    return item[0];
  }

  // ==================== v1.2.0 NEW METHODS ====================

  // Copy selected values to clipboard
  copySelectedValues(): void {
    const selected = this.selectedOptions();
    if (selected.length === 0) return;

    const values = selected.map(opt => this.getOptionLabel(opt));
    const formattedText = values.join(this.copyDelimiter);

    // Copy to clipboard using modern API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(formattedText).then(() => {
        this.copy.emit({ values: selected.map(opt => this.getOptionValue(opt)), formattedText });
      });
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = formattedText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.copy.emit({ values: selected.map(opt => this.getOptionValue(opt)), formattedText });
    }
  }

  // Paste values from clipboard
  pasteValues(pastedText: string): void {
    const values = pastedText
      .split(this.pasteDelimiter)
      .map(v => v.trim())
      .filter(v => v.length > 0);

    if (values.length === 0) return;

    this.paste.emit({ values, pastedText });

    // Find matching options and select them
    const allOptions = this.internalOptions();
    const currentValue = Array.isArray(this.internalValue()) ? [...this.internalValue()] : [];

    values.forEach(value => {
      const option = allOptions.find(opt =>
        this.getOptionLabel(opt).toLowerCase() === value.toLowerCase() ||
        String(this.getOptionValue(opt)).toLowerCase() === value.toLowerCase()
      );

      if (option && !currentValue.includes(this.getOptionValue(option))) {
        // Check max selection limit
        if (this.maxSelectedOptions === null || currentValue.length < this.maxSelectedOptions) {
          currentValue.push(this.getOptionValue(option));
        }
      }
    });

    this.internalValue.set(currentValue);
    this.onChange(currentValue);
    this.change.emit({
      value: currentValue,
      action: 'set-value'
    });
  }

  // Type-ahead functionality
  handleTypeAhead(key: string): void {
    // Clear previous timeout
    if (this.typeAheadTimeout) {
      clearTimeout(this.typeAheadTimeout);
    }

    // Append key to buffer
    const newBuffer = this.typeAheadBuffer() + key.toLowerCase();
    this.typeAheadBuffer.set(newBuffer);

    // Find matching option
    const opts = this.displayOptions();
    const matchIndex = opts.findIndex(opt =>
      this.getOptionLabel(opt).toLowerCase().startsWith(newBuffer)
    );

    if (matchIndex !== -1) {
      this.highlightedIndex.set(matchIndex);
      this.scrollHighlightedIntoView();
    }

    // Clear buffer after delay
    this.typeAheadTimeout = setTimeout(() => {
      this.typeAheadBuffer.set('');
    }, this.typeAheadDelay);
  }

  // Recent selections management
  addToRecentSelections(option: SelectOption): void {
    const recent = this.recentSelections();
    const optionValue = this.getOptionValue(option);

    // Remove if already exists
    const filtered = recent.filter(r => this.getOptionValue(r) !== optionValue);

    // Add to beginning
    const updated = [option, ...filtered].slice(0, this.recentSelectionsLimit);
    this.recentSelections.set(updated);

    // Save to storage if enabled
    if (this.enableRecentSelectionsPersistence) {
      this.saveRecentSelections();
    }
  }

  loadRecentSelections(): void {
    if (!this.enableRecentSelectionsPersistence) return;

    try {
      const stored = localStorage.getItem(this.recentSelectionsStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.recentSelections.set(parsed.slice(0, this.recentSelectionsLimit));
      }
    } catch (error) {
      console.warn('Failed to load recent selections:', error);
    }
  }

  saveRecentSelections(): void {
    if (!this.enableRecentSelectionsPersistence) return;

    try {
      const recent = this.recentSelections();
      localStorage.setItem(this.recentSelectionsStorageKey, JSON.stringify(recent));
    } catch (error) {
      console.warn('Failed to save recent selections:', error);
    }
  }

  // v2.1.0: Drag & Drop handlers
  onTagsReorder(event: CdkDragDrop<any[]>): void {
    if (!this.enableDragDrop || !this.isMulti) return;

    const values = Array.isArray(this.internalValue()) ? [...this.internalValue()] : [];
    const options = this.selectedOptions();

    moveItemInArray(values, event.previousIndex, event.currentIndex);

    this.internalValue.set(values);
    this.onChange(values);

    // Emit reorder event
    this.reorder.emit({
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
      values: values,
      options: options
    });
  }

  onDragStart(): void {
    this.isDragging.set(true);
  }

  onDragEnd(): void {
    setTimeout(() => {
      this.isDragging.set(false);
    }, this.dragDropAnimation);
  }

  // v2.1.0: Pinning handlers
  togglePin(option: SelectOption, event: Event): void {
    event.stopPropagation();

    if (!this.enablePinning) return;

    const pinned = this.pinnedOptions();
    const isPinned = pinned.some(p => p.id === option.id);

    if (isPinned) {
      // Unpin
      const updated = pinned.filter(p => p.id !== option.id);
      this.pinnedOptions.set(updated);
      this.pin.emit({ option, pinned: false });
    } else {
      // Pin
      if (this.maxPinnedOptions && pinned.length >= this.maxPinnedOptions) {
        return; // Max limit reached
      }
      const updated = [...pinned, option];
      this.pinnedOptions.set(updated);
      this.pin.emit({ option, pinned: true });
    }

    // Persist if enabled
    if (this.persistPinnedOptions) {
      this.savePinnedOptions();
    }
  }

  isPinned(option: SelectOption): boolean {
    const pinned = this.pinnedOptions();
    return pinned.some(p => p.id === option.id);
  }

  loadPinnedOptions(): void {
    if (!this.persistPinnedOptions) return;

    try {
      const stored = localStorage.getItem(this.pinnedOptionsStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.pinnedOptions.set(parsed);
      }
    } catch (error) {
      console.warn('Failed to load pinned options:', error);
    }
  }

  savePinnedOptions(): void {
    if (!this.persistPinnedOptions) return;

    try {
      const pinned = this.pinnedOptions();
      localStorage.setItem(this.pinnedOptionsStorageKey, JSON.stringify(pinned));
    } catch (error) {
      console.warn('Failed to save pinned options:', error);
    }
  }

  // v2.2.0: Search highlighting
  highlightSearchTerm(text: string): SafeHtml {
    const term = this.searchTerm();

    if (!this.enableSearchHighlight || !term || !text) {
      return text;
    }

    // Escape special regex characters in search term
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedTerm})`, 'gi');

    const highlighted = text.replace(regex, (match) => {
      return `<mark style="background-color: ${this.searchHighlightColor}; color: ${this.searchHighlightTextColor}; padding: 0 2px; border-radius: 2px;">${match}</mark>`;
    });

    return this.sanitizer.sanitize(SecurityContext.HTML, highlighted) || text;
  }

  // v2.2.0: Tag overflow management
  toggleTagsExpanded(): void {
    this.tagsExpanded.set(!this.tagsExpanded());
  }

  getMoreTagsText(): string {
    const count = this.hiddenTagsCount();
    return this.showMoreTagsText.replace('{count}', count.toString());
  }

  // Infinite scroll handler
  onOptionsScroll(event: Event): void {
    if (!this.enableInfiniteScroll) return;

    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    const scrollPercentage = ((scrollTop + clientHeight) / scrollHeight) * 100;

    // Clear previous timeout
    if (this.scrollEndTimeout) {
      clearTimeout(this.scrollEndTimeout);
    }

    // Debounce scroll end detection
    this.scrollEndTimeout = setTimeout(() => {
      if (scrollPercentage >= this.infiniteScrollThreshold) {
        this.scrollEnd.emit({ scrollTop, scrollHeight, clientHeight });
      }
    }, 100);
  }

  // Virtual scroll index tracking
  onVirtualScrollIndexChange(index: number): void {
    // Update highlighted index for virtual scroll
    if (this.enableVirtualScroll) {
      this.highlightedIndex.set(index);
    }
  }

  // Tooltip methods
  showTooltip(option: SelectOption, index: number): void {
    if (!this.showTooltips) return;

    this.hoveredOptionIndex.set(index);
  }

  hideTooltip(): void {
    this.hoveredOptionIndex.set(-1);
  }

  getTooltipContent(option: SelectOption): string {
    return this.getOptionTooltip(option) || option.tooltip || '';
  }

  // Validation state CSS class
  getValidationClass(): string {
    return `validation-${this.validationState}`;
  }

  // v2.3.0 Methods

  // Track recently used options for sorting
  trackRecentlyUsed(option: SelectOption): void {
    const ids = this.recentlyUsedIds();
    const newIds = new Set(ids);
    newIds.add(option.id);

    // Maintain limit
    if (newIds.size > this.recentlyUsedLimit) {
      const idsArray = Array.from(newIds);
      const limitedIds = new Set(idsArray.slice(-this.recentlyUsedLimit));
      this.recentlyUsedIds.set(limitedIds);
    } else {
      this.recentlyUsedIds.set(newIds);
    }
  }

  // Check if option is selected (for checkbox mode)
  isOptionSelected(option: SelectOption): boolean {
    const selected = this.selectedOptions();
    const optionValue = this.getOptionValue(option);
    return selected.some(s => this.getOptionValue(s) === optionValue);
  }

  // Execute bulk action
  executeBulkAction(action: BulkAction): void {
    if (action.disabled || this.selectedOptions().length === 0) return;

    const selectedOptions = this.selectedOptions();

    // Execute action callback
    action.action(selectedOptions);

    // Emit event
    this.bulkActionSelected.emit({
      action,
      selectedOptions
    });
  }

  // Get skeleton items array for loading state
  getSkeletonItems(): number[] {
    return Array.from({ length: this.skeletonItemCount }, (_, i) => i);
  }
}
