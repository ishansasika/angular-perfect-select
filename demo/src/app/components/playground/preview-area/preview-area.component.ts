import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfectSelectComponent } from 'angular-perfect-select';

type PreviewTheme = 'light' | 'dark' | 'gray';

@Component({
  selector: 'app-preview-area',
  standalone: true,
  imports: [CommonModule, FormsModule, PerfectSelectComponent],
  templateUrl: './preview-area.component.html',
  styleUrls: ['./preview-area.component.scss']
})
export class PreviewAreaComponent {
  @Input() props: Record<string, any> = {};

  selectedValue = signal<any>(null);
  previewTheme = signal<PreviewTheme>('light');

  onSelectionChange(event: any): void {
    console.log('Selection changed:', this.selectedValue());
  }

  cycleTheme(): void {
    const themes: PreviewTheme[] = ['light', 'dark', 'gray'];
    const currentIndex = themes.indexOf(this.previewTheme());
    const nextIndex = (currentIndex + 1) % themes.length;
    this.previewTheme.set(themes[nextIndex]);
  }

  get themeClass(): string {
    return `bg-${this.previewTheme()}`;
  }
}
