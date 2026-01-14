/**
 * Dark mode detection and management provider
 * Uses CSS media queries to detect system dark mode preference
 */

import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ColorScheme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root'
})
export class DarkModeProvider {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // User preference (auto follows system, or manual light/dark)
  private preferredScheme = signal<ColorScheme>('auto');

  // System dark mode detection
  private systemPrefersDark = signal<boolean>(false);

  // Computed: final resolved dark mode state
  isDarkMode = computed(() => {
    const preferred = this.preferredScheme();
    if (preferred === 'auto') {
      return this.systemPrefersDark();
    }
    return preferred === 'dark';
  });

  constructor() {
    if (this.isBrowser) {
      this.initDarkModeDetection();
    }
  }

  /**
   * Initialize system dark mode detection
   */
  private initDarkModeDetection(): void {
    // Check initial system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemPrefersDark.set(mediaQuery.matches);

    // Listen for system theme changes
    mediaQuery.addEventListener('change', (e) => {
      this.systemPrefersDark.set(e.matches);
    });
  }

  /**
   * Set user's color scheme preference
   */
  setColorScheme(scheme: ColorScheme): void {
    this.preferredScheme.set(scheme);
  }

  /**
   * Get current color scheme preference
   */
  getColorScheme(): ColorScheme {
    return this.preferredScheme();
  }

  /**
   * Toggle between light and dark mode
   */
  toggleDarkMode(): void {
    const current = this.isDarkMode();
    this.preferredScheme.set(current ? 'light' : 'dark');
  }
}
