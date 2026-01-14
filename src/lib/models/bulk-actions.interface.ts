/**
 * Bulk actions for multi-select mode
 */

import { SelectOption } from './select-option.interface';

export interface BulkAction {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  action: (selectedOptions: SelectOption[]) => void;
}

export interface SelectBulkActionEvent {
  action: BulkAction;
  selectedOptions: SelectOption[];
}
