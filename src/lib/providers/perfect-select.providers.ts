import { EnvironmentProviders, makeEnvironmentProviders, importProvidersFrom } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

/**
 * Provides necessary CDK modules for PerfectSelectComponent.
 * Import this in your app configuration if you encounter production build issues.
 *
 * @example
 * ```typescript
 * import { providePerfectSelect } from 'angular-perfect-select';
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     // ... other providers
 *     providePerfectSelect()
 *   ]
 * });
 * ```
 */
export function providePerfectSelect(): EnvironmentProviders {
  return makeEnvironmentProviders([
    importProvidersFrom(ScrollingModule, DragDropModule)
  ]);
}
