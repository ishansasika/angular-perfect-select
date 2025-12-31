import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, FormsModule, RouterLink, PerfectSelectComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  demoValue = signal<any>(null);

  demoOptions: SelectOption[] = [
    { id: 'react', label: 'React', value: 'react' },
    { id: 'vue', label: 'Vue', value: 'vue' },
    { id: 'svelte', label: 'Svelte', value: 'svelte' },
    { id: 'angular', label: 'Angular', value: 'angular' }
  ];

  features: Feature[] = [
    {
      icon: '🎨',
      title: '7 Color Themes',
      description: 'Beautiful pre-built themes: blue, purple, green, red, orange, pink, dark'
    },
    {
      icon: '⚡',
      title: 'React-Select Compatible',
      description: 'Familiar API for developers coming from React ecosystem'
    },
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'Built-in search with custom filter support'
    },
    {
      icon: '🎯',
      title: 'Multi-Select',
      description: 'Select multiple options with animated tag chips'
    },
    {
      icon: '🌐',
      title: 'Async Loading',
      description: 'Load options dynamically with caching'
    },
    {
      icon: '✨',
      title: 'Creatable',
      description: 'Allow users to create new options'
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

  installCommand = 'npm install angular-perfect-select';

  usageExample = `import { Component } from '@angular/core';
import { PerfectSelectComponent, SelectOption } from 'angular-perfect-select';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [PerfectSelectComponent],
  template: \`
    <ngps-perfect-select
      [options]="options"
      [(ngModel)]="value"
      placeholder="Select an option..."
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

  onDemoChange(value: any): void {
    this.demoValue.set(value);
  }
}
