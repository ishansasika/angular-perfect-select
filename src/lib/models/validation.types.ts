export type ValidationState = 'default' | 'error' | 'warning' | 'success' | 'info';

export interface ValidationConfig {
  state: ValidationState;
  message?: string;
}
