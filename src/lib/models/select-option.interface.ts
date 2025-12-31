export interface SelectOption {
  id: string | number;
  label: string;
  value: any;
  description?: string;
  disabled?: boolean;
  icon?: string;
  badge?: string;
  badgeColor?: string;
  group?: string;
  __isNew__?: boolean;
  __isCreate__?: boolean;
}
