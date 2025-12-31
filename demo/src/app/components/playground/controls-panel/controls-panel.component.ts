import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentMetadata, PropDefinition } from '../../../models/playground.types';
import { ControlInputComponent } from '../control-input/control-input.component';

@Component({
  selector: 'app-controls-panel',
  standalone: true,
  imports: [CommonModule, ControlInputComponent],
  templateUrl: './controls-panel.component.html',
  styleUrls: ['./controls-panel.component.scss']
})
export class ControlsPanelComponent {
  @Input() metadata!: ComponentMetadata;
  @Input() currentProps: Record<string, any> = {};
  @Output() propChange = new EventEmitter<{ propName: string; value: any }>();
  @Output() reset = new EventEmitter<void>();

  get categorizedProps(): Map<string, PropDefinition[]> {
    const categories = new Map<string, PropDefinition[]>();

    this.metadata.propDefinitions.forEach(prop => {
      const category = prop.category || 'basic';
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(prop);
    });

    // Sort categories in desired order
    const orderedCategories = new Map<string, PropDefinition[]>();
    const order = ['basic', 'styling', 'advanced', 'behavior'];

    order.forEach(cat => {
      if (categories.has(cat)) {
        orderedCategories.set(cat, categories.get(cat)!);
      }
    });

    // Add any remaining categories
    categories.forEach((props, cat) => {
      if (!orderedCategories.has(cat)) {
        orderedCategories.set(cat, props);
      }
    });

    return orderedCategories;
  }

  getCategoryLabel(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  onPropChange(propName: string, value: any): void {
    this.propChange.emit({ propName, value });
  }

  onReset(): void {
    this.reset.emit();
  }
}
