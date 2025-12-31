import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SELECT_METADATA } from '../../data/select-metadata';
import { PropDefinition } from '../../models/playground.types';

interface Event {
  name: string;
  detail: string;
  description: string;
}

@Component({
  selector: 'app-docs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent {
  installCode = 'npm install angular-perfect-select';

  basicUsageCode = `import { Component } from '@angular/core';
import { PerfectSelectComponent, SelectOption } from 'angular-perfect-select';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [PerfectSelectComponent],
  template: \`
    <ngps-perfect-select
      [options]="options"
      [(ngModel)]="value"
    ></ngps-perfect-select>
  \`
})
export class DemoComponent {
  value: any = null;

  options: SelectOption[] = [
    { id: 'opt1', label: 'Option 1', value: 'opt1' },
    { id: 'opt2', label: 'Option 2', value: 'opt2' }
  ];
}`;

  multiSelectCode = `<ngps-perfect-select
  [options]="options"
  [(ngModel)]="values"
  [isMulti]="true"
></ngps-perfect-select>`;

  themeCode = `<ngps-perfect-select
  [options]="options"
  [(ngModel)]="value"
  theme="purple"
></ngps-perfect-select>`;

  creatableCode = `<ngps-perfect-select
  [options]="options"
  [(ngModel)]="value"
  [isCreatable]="true"
  (createOption)="handleCreate($event)"
></ngps-perfect-select>`;

  asyncCode = `<ngps-perfect-select
  [(ngModel)]="value"
  [loadOptions]="loadCountries"
></ngps-perfect-select>`;

  propCategories = ['basic', 'styling', 'advanced', 'behavior'] as const;

  events: Event[] = [
    {
      name: 'change',
      detail: '{ value, option, action }',
      description: 'Fired when selection changes'
    },
    {
      name: 'clear',
      detail: '-',
      description: 'Fired when selection is cleared'
    },
    {
      name: 'focus',
      detail: '-',
      description: 'Fired when select gains focus'
    },
    {
      name: 'blur',
      detail: '-',
      description: 'Fired when select loses focus'
    },
    {
      name: 'menuOpen',
      detail: '-',
      description: 'Fired when dropdown menu opens'
    },
    {
      name: 'menuClose',
      detail: '-',
      description: 'Fired when dropdown menu closes'
    },
    {
      name: 'inputChange',
      detail: '{ value }',
      description: 'Fired when search input value changes'
    },
    {
      name: 'createOption',
      detail: '{ option }',
      description: 'Fired when new option is created (creatable mode)'
    },
    {
      name: 'optionsLoaded',
      detail: '{ options }',
      description: 'Fired when async options are loaded'
    },
    {
      name: 'loadError',
      detail: '{ error }',
      description: 'Fired when async option loading fails'
    }
  ];

  getCategoryProps(category: string): PropDefinition[] {
    return SELECT_METADATA.propDefinitions.filter((p: PropDefinition) => p.category === category);
  }

  getDefaultValueDisplay(value: any): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'number') return value.toString();
    if (Array.isArray(value)) return JSON.stringify(value);
    return JSON.stringify(value);
  }
}
