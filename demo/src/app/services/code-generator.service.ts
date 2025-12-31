import { Injectable } from '@angular/core';
import { SelectOption } from 'angular-perfect-select';

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {

  generateComponentCode(
    props: Record<string, any>,
    defaultProps: Record<string, any>
  ): string {
    const relevantProps = this.getRelevantProps(props, defaultProps);
    const propsString = this.formatPropsForTemplate(relevantProps);

    return `<ngps-perfect-select
  [options]="options"
  [(ngModel)]="selectedValue"${propsString}
></ngps-perfect-select>`;
  }

  generateTypeScriptCode(
    props: Record<string, any>,
    defaultProps: Record<string, any>
  ): string {
    const options = props['options'] || defaultProps['options'] || [];
    const isMulti = props['isMulti'] || defaultProps['isMulti'] || false;

    return `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfectSelectComponent, SelectOption } from 'angular-perfect-select';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FormsModule, PerfectSelectComponent],
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  options: SelectOption[] = ${this.formatOptions(options)};

  selectedValue: ${isMulti ? 'SelectOption[]' : 'SelectOption | null'} = ${isMulti ? '[]' : 'null'};

  onSelectionChange(event: any) {
    console.log('Selection changed:', this.selectedValue);
  }
}`;
  }

  generateFullExample(
    props: Record<string, any>,
    defaultProps: Record<string, any>
  ): { typescript: string; html: string } {
    return {
      typescript: this.generateTypeScriptCode(props, defaultProps),
      html: this.generateComponentCode(props, defaultProps)
    };
  }

  private getRelevantProps(
    props: Record<string, any>,
    defaultProps: Record<string, any>
  ): Record<string, any> {
    const relevant: Record<string, any> = {};

    for (const key in props) {
      if (key === 'options') continue; // Already in template

      const value = props[key];
      const defaultValue = defaultProps[key];

      // Only include if different from default
      if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
        relevant[key] = value;
      }
    }

    return relevant;
  }

  private formatPropsForTemplate(props: Record<string, any>): string {
    const lines: string[] = [];

    for (const [key, value] of Object.entries(props)) {
      const formattedValue = this.formatPropValue(value);

      if (typeof value === 'boolean') {
        if (value) {
          lines.push(`\n  [${key}]="true"`);
        } else {
          lines.push(`\n  [${key}]="false"`);
        }
      } else if (typeof value === 'string') {
        lines.push(`\n  ${key}="${value}"`);
      } else if (typeof value === 'number') {
        lines.push(`\n  [${key}]="${value}"`);
      } else {
        lines.push(`\n  [${key}]="${formattedValue}"`);
      }
    }

    return lines.join('');
  }

  private formatPropValue(value: any): string {
    if (typeof value === 'string') {
      return `"${value}"`;
    } else if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    } else if (typeof value === 'number') {
      return String(value);
    } else if (Array.isArray(value)) {
      return JSON.stringify(value);
    } else if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  }

  private formatOptions(options: SelectOption[]): string {
    if (!options || options.length === 0) {
      return '[]';
    }

    const formattedOptions = options.map(opt => {
      const props = [
        `id: '${opt.id}'`,
        `label: '${opt.label}'`,
        `value: '${opt.value}'`
      ];
      return `    { ${props.join(', ')} }`;
    });

    return `[\n${formattedOptions.join(',\n')}\n  ]`;
  }

  copyToClipboard(text: string): Promise<boolean> {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text)
        .then(() => true)
        .catch(() => false);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        return Promise.resolve(successful);
      } catch (err) {
        document.body.removeChild(textarea);
        return Promise.resolve(false);
      }
    }
  }
}
