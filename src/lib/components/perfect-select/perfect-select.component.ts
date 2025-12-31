import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  computed,
  forwardRef,
  HostListener,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { selectAnimations } from '../../animations/select.animations';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { THEMES, ThemeName } from '../../constants/themes.constant';
import { SelectOption } from '../../models/select-option.interface';
import {
  SelectChangeEvent,
  SelectInputChangeEvent,
  SelectCreateOptionEvent,
  SelectOptionsLoadedEvent,
  SelectLoadErrorEvent
} from '../../models/select-events.interface';

@Component({
  selector: 'ng-perfect-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
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
  private sanitizer: DomSanitizer;

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

  // ViewChildren
  @ViewChild('selectContainer') selectContainerRef!: ElementRef;
  @ViewChild('searchInput') searchInputRef!: ElementRef;
  @ViewChild('menuRef') menuElementRef!: ElementRef;

  // Signals for reactive state
  isOpen = signal(false);
  searchTerm = signal('');
  highlightedIndex = signal(-1);
  internalValue = signal<any>(this.isMulti ? [] : null);
  internalOptions = signal<SelectOption[]>([]);
  isLoadingAsync = signal(false);
  private optionsCache = new Map<string, SelectOption[]>();

  // Computed signals
  currentTheme = computed(() => THEMES[this.theme] || THEMES.blue);

  filteredOptions = computed(() => {
    const term = this.searchTerm();
    const opts = this.internalOptions();

    if (!term) return opts;

    return opts.filter(option => {
      if (this.filterOption) {
        return this.filterOption(option, term);
      }
      const label = this.getOptionLabel(option);
      return label.toLowerCase().includes(term.toLowerCase());
    });
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

  // Helper method for template
  getEnabledOptionsCount(): number {
    return this.filteredOptions().filter(opt => !this.isOptionDisabled(opt)).length;
  }

  // ControlValueAccessor
  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }

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
    // Cleanup handled by DestroyRef
  }

  // Keyboard Navigation
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.isDisabled) return;

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
          const opts = this.displayOptions();
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
        newValue = [...currentValue, optionValue];
      }

      this.internalValue.set(newValue);
      this.onChange(newValue);
      this.change.emit({
        value: newValue,
        option,
        action: exists ? 'remove-value' : 'select-option'
      });
    } else {
      this.internalValue.set(optionValue);
      this.onChange(optionValue);
      this.change.emit({
        value: optionValue,
        option,
        action: 'select-option'
      });
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
    const opts = this.filteredOptions().filter(opt => !this.isOptionDisabled(opt));
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

    // Trigger async loading if configured
    if (this.loadOptions) {
      this.handleLoadOptions(term);
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
}
