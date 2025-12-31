import { SelectOption } from './select-option.interface';

export type SelectChangeAction =
  | 'select-option'
  | 'remove-value'
  | 'clear'
  | 'set-value'
  | 'select-all'
  | 'deselect-all';

export interface SelectChangeEvent {
  value: any;
  option?: SelectOption | SelectOption[];
  action: SelectChangeAction;
}

export type InputChangeAction = 'input-change' | 'set-value';

export interface SelectInputChangeEvent {
  value: string;
  action: InputChangeAction;
}

export interface SelectCreateOptionEvent {
  option: SelectOption;
}

export interface SelectOptionsLoadedEvent {
  options: SelectOption[];
}

export interface SelectLoadErrorEvent {
  error: Error;
}
