export type ControlType = 'number' | 'color' | 'select' | 'boolean' | 'range' | 'text';

export interface ControlConfig {
  type: ControlType;
  min?: number;
  max?: number;
  step?: number;
  options?: string[] | { label: string; value: any }[];
  placeholder?: string;
}

export interface PropDefinition {
  name: string;
  type: string;
  control: ControlConfig;
  description: string;
  defaultValue?: any;
  category?: 'basic' | 'advanced' | 'styling' | 'async' | 'behavior';
}

export interface Example {
  name: string;
  description?: string;
  props: Record<string, any>;
  code?: string;
}

export interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  defaultProps: Record<string, any>;
  propDefinitions: PropDefinition[];
  examples: Example[];
  importPath: string;
}

export type PreviewTheme = 'light' | 'dark' | 'gray';

export interface CodeExample {
  typescript: string;
  template: string;
}
