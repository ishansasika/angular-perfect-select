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
npm install angular-perfect-select
```

Install using yarn:

```bash
yarn add angular-perfect-select
```

Install using pnpm:

```bash
pnpm add angular-perfect-select
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

