import { Component, Input, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfectSelectComponent } from 'angular-perfect-select';

type PreviewTheme = 'light' | 'dark' | 'gray';

@Component({
  selector: 'app-preview-area',
  standalone: true,
  imports: [JsonPipe, FormsModule, PerfectSelectComponent],
  templateUrl: './preview-area.component.html',
  styleUrls: ['./preview-area.component.scss']
})
export class PreviewAreaComponent {
  @Input() props: Record<string, any> = {};

  selectedValue: any = null;
  previewTheme = signal<PreviewTheme>('light');

  onSelectionChange(event: any): void {
    console.log('Selection changed:', event);
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
