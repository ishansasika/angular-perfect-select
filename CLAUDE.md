# CLAUDE.md

This file provides guidance for AI assistants when working with the angular-perfect-select codebase.

## Project Overview

**angular-perfect-select** is a feature-rich, accessible select component for Angular 20+ applications. It's a port of svelte-perfect-select with 100% feature parity, maintaining react-select API compatibility while leveraging Angular's latest features (standalone components, signals).

## Architecture

### Project Structure
- **Root as Library**: Unlike typical Angular workspaces, the root directory IS the library package
- **Demo as Subdirectory**: Demo application lives in `demo/` subfolder
- **Standalone Components**: Uses Angular 20 standalone components (no NgModules)
- **Signals-based**: State management uses Angular signals, not RxJS observables

### Key Directories
```
angular-perfect-select/
├── src/lib/                          # Library source (ship to npm)
│   ├── components/perfect-select/    # Main component (~650 lines TS, ~300 HTML, ~550 SCSS)
│   ├── models/                       # TypeScript interfaces
│   ├── constants/                    # Theme definitions (7 themes)
│   ├── animations/                   # Angular animations (dropdown, tags, options)
│   └── directives/                   # Click-outside directive
├── demo/                             # Demo app (NOT shipped to npm)
│   ├── src/app/
│   │   ├── pages/                    # Home, Playground, Docs
│   │   ├── components/playground/    # Interactive playground components
│   │   ├── components/common/        # Header, Footer
│   │   ├── services/                 # Code generator
│   │   └── data/                     # Metadata, examples
│   ├── tailwind.config.js            # Tailwind for demo styling
│   └── package.json                  # Separate demo dependencies
├── package.json                      # Library package (published to npm)
├── ng-package.json                   # ng-packagr config
└── tsconfig*.json                    # TypeScript configs
```

## Development Commands

### Library Development
```bash
# Build library for distribution
npm run build

# Watch mode for library development
npm run build:watch

# Pack for local testing
npm pack
```

### Demo Application
```bash
cd demo/

# Run development server (port 4200)
npm start
# or
npm run dev

# Build demo for production
npm run build

# Preview demo build
npm run preview
```

## Component API

### Core Implementation
- **74 @Input Props**: All react-select props + Angular-specific extensions
- **10 @Output Events**: change, clear, focus, blur, menuOpen, menuClose, inputChange, createOption, optionsLoaded, loadError
- **ControlValueAccessor**: Full Angular forms integration
- **Signals**: All state management uses Angular signals (isOpen, searchTerm, highlightedIndex, etc.)
- **Computed Signals**: currentTheme, filteredOptions, selectedOptions, displayText

### Key Features
1. **Multi-Select**: Tag chips with animations, Select All/Deselect All
2. **Async Loading**: loadOptions with Map-based caching
3. **Creatable Mode**: Dynamic option creation
4. **Option Grouping**: groupBy function support with sticky headers
5. **Icons & Badges**: SVG/image icons, custom badge colors
6. **Keyboard Navigation**: ArrowDown, Arrow Up, Enter, Escape, Tab, Backspace
7. **Themes**: 7 color themes via CSS custom properties
8. **Sizes**: 5 font sizes + 5 container sizes
9. **RTL Support**: Right-to-left language support
10. **Accessibility**: Full ARIA labels, keyboard navigation, screen reader support

## Critical Constraints

### DO
- ✅ Maintain react-select API compatibility (dual naming: isMulti/multiple, isSearchable/searchable, etc.)
- ✅ Use Angular 20 features (standalone components, signals, new control flow @if/@for)
- ✅ Keep library zero-dependency (only Angular peer deps)
- ✅ Export all public types via `src/public-api.ts`
- ✅ Use signals for state management
- ✅ Implement ControlValueAccessor for forms
- ✅ Support both template-driven and reactive forms
- ✅ Maintain accessibility (ARIA, keyboard nav)
- ✅ Use ng-packagr for building library

### DO NOT
- ❌ Add external dependencies (except Angular)
- ❌ Use NgModules (use standalone components)
- ❌ Use RxJS for simple state (use signals instead)
- ❌ Break react-select API compatibility
- ❌ Remove ARIA attributes or keyboard navigation
- ❌ Modify the 7 theme colors without discussion
- ❌ Ship demo code to npm (use .npmignore)

## Build & Publish

### Building
```bash
# Clean build
rm -rf dist/
npm run build

# Build produces:
dist/
├── index.d.ts              # Type definitions
├── index.js                # ESM bundle
├── fesm2022/               # Angular format
├── esm2022/                # ES2022 modules
└── package.json            # Generated package.json
```

### Publishing to npm
```bash
# From root directory
npm version patch|minor|major
npm run build
cd dist
npm publish
```

### Demo Deployment
The demo app deploys to Firebase Hosting or Vercel:
```bash
cd demo
npm run build
# Deploy dist/demo/ to hosting service
```

## Testing Strategy

### Unit Tests (Jasmine/Karma)
- Component initialization
- All 74 props
- All 10 events
- Forms integration (ControlValueAccessor)
- Keyboard navigation
- Search/filter
- Async loading
- Creatable mode
- Multi-select
- Option grouping
- Icons/badges
- Accessibility

Target: >85% coverage

### Manual Testing Checklist
- [ ] All 18 playground examples work
- [ ] Keyboard navigation (all keys)
- [ ] All 7 themes render correctly
- [ ] All 5 font sizes + 5 container sizes
- [ ] Multi-select with tags
- [ ] Async loading with caching
- [ ] Creatable mode
- [ ] Select All/Deselect All
- [ ] Option grouping
- [ ] Icons and badges
- [ ] Forms (template-driven + reactive)
- [ ] Accessibility (screen reader, keyboard-only)
- [ ] RTL mode
- [ ] Mobile responsiveness
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)

## Common Tasks

### Adding a New Prop
1. Add to PerfectSelectComponent class:
   ```typescript
   @Input() newProp: string = 'default';
   @Input() new_prop: string = 'default'; // Dual naming if needed
   ```
2. Add to template if needed
3. Update types in `models/`
4. Add to demo metadata (`demo/src/app/data/select-metadata.ts`)
5. Update README

### Adding a New Event
1. Add to PerfectSelectComponent:
   ```typescript
   @Output() newEvent = new EventEmitter<NewEventPayload>();
   ```
2. Create interface in `models/select-events.interface.ts`
3. Emit event at appropriate time
4. Update README events table

### Adding a Theme
1. Add to `constants/themes.constant.ts`:
   ```typescript
   newcolor: {
     primary: '#hexcode',
     secondary: '#hexcode',
     tag: '#hexcode',
     tagText: '#hexcode',
     tagBorder: '#hexcode'
   }
   ```
2. Add CSS class in `perfect-select.component.scss`:
   ```scss
   &.theme-newcolor {
     --ps-primary: #hexcode;
     // ... other custom properties
   }
   ```
3. Add to demo examples

## Troubleshooting

### Build Errors
- **ng-packagr errors**: Check `ng-package.json` and tsconfig files
- **TypeScript errors**: Ensure `tsconfig.lib.json` has correct paths
- **Import errors**: Verify exports in `src/public-api.ts`

### Demo App Issues
- **Import not found**: Check path alias in `demo/tsconfig.json`:
  ```json
  "paths": {
    "angular-perfect-select": ["../src/public-api.ts"]
  }
  ```
- **Styles not loading**: Check `demo/src/styles.scss` has Tailwind directives
- **Component not rendering**: Ensure component is imported in standalone component imports array

### Common Pitfalls
- Forgetting to export new interfaces in `public-api.ts`
- Using old Angular syntax (*ngIf instead of @if)
- Not updating both template and TypeScript when adding props
- Forgetting to update demo metadata when adding props
- Not testing with both template-driven and reactive forms

## Performance Considerations
- **Large Option Lists**: Component handles 1000+ options efficiently
- **Async Caching**: Uses Map for O(1) cache lookups
- **Signals**: Automatic change detection optimization
- **Animations**: Use `@angular/animations` for GPU-accelerated transforms
- **Virtual Scrolling**: Implemented in v2.0 using Angular CDK

## Accessibility Notes
- All interactive elements have ARIA labels
- Keyboard navigation must work for all features
- Screen reader announcements for state changes
- Focus management (visible focus indicators)
- Color contrast ratios meet WCAG AA standards
- High contrast mode support

## Version History
- **v2.3.0** (2026-01-14): Fuzzy search, dark mode, loading skeleton, compact mode, custom tag templates, option checkboxes, bulk actions, option sorting
- **v2.2.0** (2026-01-09): Search result highlighting, tag overflow management
- **v2.1.0** (2026-01-09): Drag & drop reordering, option pinning
- **v2.0.0** (2026-01-08): Virtual scrolling, validation states, tooltips, recent selections, infinite scroll, advanced keyboard, copy/paste
- **v1.1.0** (2026-01-07): Max selection limit, search debounce, min search length
- **v1.0.0** (2025-12-31): Initial release with full react-select API parity

## Resources
- [Angular Docs](https://angular.io)
- [React-Select API](https://react-select.com)
- [Svelte Perfect Select](https://github.com/ishansasika/svelte-perfect-select) (source of truth for features)
- [ng-packagr](https://github.com/ng-packagr/ng-packagr)

## Notes for AI Assistants
- This is a port from Svelte, so reference svelte-perfect-select for feature implementations
- The library uses Angular 20's latest features (standalone, signals)
- Never add dependencies without explicit approval
- Always maintain backwards compatibility with react-select API
- Prioritize accessibility and keyboard navigation
- Test all changes in both demo and actual Angular apps
