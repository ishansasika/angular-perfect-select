/**
 * Utility functions for sorting select options
 */

import { SelectOption } from '../models/select-option.interface';

export type SortMode = 'none' | 'alphabetical-asc' | 'alphabetical-desc' | 'recently-used' | 'custom';

export interface SortConfig {
  mode: SortMode;
  customComparator?: (a: SelectOption, b: SelectOption) => number;
  getLabel?: (option: SelectOption) => string;
  recentlyUsedIds?: Set<any>;
}

/**
 * Sorts options based on the specified mode
 */
export function sortOptions(
  options: SelectOption[],
  config: SortConfig
): SelectOption[] {
  const { mode, customComparator, getLabel, recentlyUsedIds } = config;

  if (mode === 'none') {
    return options;
  }

  const sorted = [...options];

  switch (mode) {
    case 'alphabetical-asc':
      sorted.sort((a, b) => {
        const labelA = getLabel ? getLabel(a) : (a.label || String(a.value));
        const labelB = getLabel ? getLabel(b) : (b.label || String(b.value));
        return labelA.localeCompare(labelB);
      });
      break;

    case 'alphabetical-desc':
      sorted.sort((a, b) => {
        const labelA = getLabel ? getLabel(a) : (a.label || String(a.value));
        const labelB = getLabel ? getLabel(b) : (b.label || String(b.value));
        return labelB.localeCompare(labelA);
      });
      break;

    case 'recently-used':
      if (recentlyUsedIds && recentlyUsedIds.size > 0) {
        sorted.sort((a, b) => {
          const aRecent = recentlyUsedIds.has(a.id);
          const bRecent = recentlyUsedIds.has(b.id);

          if (aRecent && !bRecent) return -1;
          if (!aRecent && bRecent) return 1;

          // If both or neither are recent, maintain original order
          return 0;
        });
      }
      break;

    case 'custom':
      if (customComparator) {
        sorted.sort(customComparator);
      }
      break;
  }

  return sorted;
}
