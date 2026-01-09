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
  tooltip?: string;
  pinned?: boolean;
  __isNew__?: boolean;
  __isCreate__?: boolean;
  __isRecent__?: boolean;
  __isPinned__?: boolean;
}
