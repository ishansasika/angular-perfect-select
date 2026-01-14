import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PerfectSelectComponent, SelectOption } from 'angular-perfect-select';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, PerfectSelectComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  demoValue: any = null;

  demoOptions: SelectOption[] = [
    { id: 'react', label: 'React', value: 'react' },
    { id: 'vue', label: 'Vue', value: 'vue' },
    { id: 'svelte', label: 'Svelte', value: 'svelte' },
    { id: 'angular', label: 'Angular', value: 'angular' }
  ];

  features: Feature[] = [
    {
      icon: '🚀',
      title: 'Virtual Scrolling (v2.0)',
      description: 'Handle 10,000+ options without performance issues using Angular CDK'
    },
    {
      icon: '🎨',
      title: 'Custom Templates (v2.0)',
      description: 'Full control over option rendering with ng-template support'
    },
    {
      icon: '✅',
      title: 'Validation States (v2.0)',
      description: 'Visual error, warning, success, and info states with messages'
    },
    {
      icon: '⌨️',
      title: 'Advanced Keyboard (v2.0)',
      description: 'Ctrl+A, Ctrl+C/V, Home/End, type-ahead navigation'
    },
    {
      icon: '📋',
      title: 'Copy/Paste (v2.0)',
      description: 'Copy selected values and paste comma-separated lists'
    },
    {
      icon: '🕐',
      title: 'Recent Selections (v2.0)',
      description: 'Show recently selected items with localStorage persistence'
    },
    {
      icon: '♾️',
      title: 'Infinite Scroll (v2.0)',
      description: 'Load more options as user scrolls with pagination'
    },
    {
      icon: '💬',
      title: 'Option Tooltips (v2.0)',
      description: 'Display additional information on hover'
    },
    {
      icon: '🎯',
      title: 'Multi-Select & Themes',
      description: '7 color themes, tags, Select All/Deselect All'
    },
    {
      icon: '🌐',
      title: 'Async & Creatable',
      description: 'Load options dynamically, create new options on the fly'
    },
    {
      icon: '📦',
      title: 'Grouping & Badges',
      description: 'Organize options with groups, icons, and badges'
    },
    {
      icon: '♿',
      title: 'Fully Accessible',
      description: 'ARIA labels, keyboard navigation, screen reader support'
    }
  ];

  installCommand = 'npm install angular-perfect-select @angular/cdk';

  usageExample = `import { Component } from '@angular/core';
import { PerfectSelectComponent, SelectOption } from 'angular-perfect-select';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [PerfectSelectComponent],
  template: \`
    <ng-perfect-select
      [options]="options"
      [(ngModel)]="value"
      placeholder="Select an option..."
    ></ng-perfect-select>
  \`
})
export class DemoComponent {
  value: any = null;

  options: SelectOption[] = [
    { id: 'opt1', label: 'Option 1', value: 'opt1' },
    { id: 'opt2', label: 'Option 2', value: 'opt2' }
  ];
}`;

  onDemoChange(event: any): void {
    console.log('Demo selection changed:', event);
  }
}
