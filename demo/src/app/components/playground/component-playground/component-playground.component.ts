import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentMetadata, CodeExample } from '../../../models/playground.types';
import { SELECT_EXAMPLES } from '../../../data/select-examples';
import { CodeGeneratorService } from '../../../services/code-generator.service';
import { PreviewAreaComponent } from '../preview-area/preview-area.component';
import { ControlsPanelComponent } from '../controls-panel/controls-panel.component';
import { CodeDisplayComponent } from '../code-display/code-display.component';

@Component({
  selector: 'app-component-playground',
  standalone: true,
  imports: [
    CommonModule,
    PreviewAreaComponent,
    ControlsPanelComponent,
    CodeDisplayComponent
  ],
  templateUrl: './component-playground.component.html',
  styleUrls: ['./component-playground.component.scss']
})
export class ComponentPlaygroundComponent {
  @Input() metadata!: ComponentMetadata;

  currentProps = signal<Record<string, any>>({});
  examples = SELECT_EXAMPLES;

  generatedCode = computed<CodeExample>(() => {
    const typescript = this.codeGenerator.generateTypeScriptCode(
      this.currentProps(),
      this.metadata.defaultProps
    );
    const template = this.codeGenerator.generateComponentCode(
      this.currentProps(),
      this.metadata.defaultProps
    );
    return { typescript, template };
  });

  constructor(private codeGenerator: CodeGeneratorService) {
    // Initialize with default props
    setTimeout(() => {
      if (this.metadata) {
        this.currentProps.set({ ...this.metadata.defaultProps });
      }
    });
  }

  onPropChange(propName: string, value: any): void {
    this.currentProps.update(props => ({
      ...props,
      [propName]: value
    }));
  }

  applyExample(exampleProps: Record<string, any>): void {
    this.currentProps.set({
      ...this.metadata.defaultProps,
      ...exampleProps
    });
  }

  resetToDefaults(): void {
    this.currentProps.set({ ...this.metadata.defaultProps });
  }
}
