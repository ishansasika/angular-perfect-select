import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeExample } from '../../../models/playground.types';

// Prism will be loaded globally via CDN in index.html
declare const Prism: any;

@Component({
  selector: 'app-code-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-display.component.html',
  styleUrls: ['./code-display.component.scss']
})
export class CodeDisplayComponent implements OnChanges {
  @Input() code!: CodeExample;

  activeTab = signal<'typescript' | 'template'>('typescript');
  copySuccess = signal(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['code']) {
      // Re-highlight code when it changes
      setTimeout(() => {
        if (typeof Prism !== 'undefined') {
          Prism.highlightAll();
        }
      }, 0);
    }
  }

  setActiveTab(tab: 'typescript' | 'template'): void {
    this.activeTab.set(tab);
    // Re-highlight after tab change
    setTimeout(() => {
      if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
      }
    }, 0);
  }

  async copyToClipboard(): Promise<void> {
    const currentCode = this.activeTab() === 'typescript'
      ? this.code.typescript
      : this.code.template;

    try {
      await navigator.clipboard.writeText(currentCode);
      this.copySuccess.set(true);
      setTimeout(() => this.copySuccess.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }

  getHighlightedCode(code: string, language: string): string {
    if (typeof Prism !== 'undefined' && Prism.languages[language]) {
      return Prism.highlight(code, Prism.languages[language], language);
    }
    return code;
  }
}
