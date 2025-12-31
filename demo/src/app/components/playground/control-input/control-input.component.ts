import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropDefinition } from '../../../models/playground.types';

@Component({
  selector: 'app-control-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-input.component.html',
  styleUrls: ['./control-input.component.scss']
})
export class ControlInputComponent {
  @Input() propDef!: PropDefinition;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  onValueChange(newValue: any): void {
    this.valueChange.emit(newValue);
  }

  onCheckboxChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.valueChange.emit(checked);
  }

  onSelectChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;

    // Try to parse as JSON for complex values
    try {
      const parsed = JSON.parse(value);
      this.valueChange.emit(parsed);
    } catch {
      // If not JSON, emit as-is (for string values)
      this.valueChange.emit(value);
    }
  }

  onTextChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  onNumberChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.valueChange.emit(value);
  }

  onRangeChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.valueChange.emit(value);
  }

  onColorChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  getSelectOptionValue(option: any): string {
    // Convert option to JSON string for value attribute
    return typeof option === 'object' ? JSON.stringify(option) : option;
  }

  getSelectOptionLabel(option: any): string {
    // Display label for option
    if (typeof option === 'object' && option !== null) {
      return option.label || option.name || String(option.value || option);
    }
    return String(option);
  }

  isOptionSelected(option: any): boolean {
    const optionValue = this.getSelectOptionValue(option);
    const currentValue = typeof this.value === 'object' ? JSON.stringify(this.value) : this.value;
    return optionValue === currentValue;
  }
}
