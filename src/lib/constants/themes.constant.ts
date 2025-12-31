export interface ThemeColors {
  primary: string;
  secondary: string;
  tag: string;
  tagText: string;
  tagBorder: string;
}

export type ThemeName = 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'pink' | 'dark';

export const THEMES: Record<ThemeName, ThemeColors> = {
  blue: {
    primary: '#2684FF',
    secondary: '#DEEBFF',
    tag: '#E6F2FF',
    tagText: '#0052CC',
    tagBorder: '#CCE0FF'
  },
  purple: {
    primary: '#9333EA',
    secondary: '#F3E8FF',
    tag: '#FAF5FF',
    tagText: '#7E22CE',
    tagBorder: '#E9D5FF'
  },
  green: {
    primary: '#10B981',
    secondary: '#D1FAE5',
    tag: '#ECFDF5',
    tagText: '#059669',
    tagBorder: '#A7F3D0'
  },
  red: {
    primary: '#EF4444',
    secondary: '#FEE2E2',
    tag: '#FEF2F2',
    tagText: '#DC2626',
    tagBorder: '#FECACA'
  },
  orange: {
    primary: '#F97316',
    secondary: '#FFEDD5',
    tag: '#FFF7ED',
    tagText: '#EA580C',
    tagBorder: '#FED7AA'
  },
  pink: {
    primary: '#EC4899',
    secondary: '#FCE7F3',
    tag: '#FDF2F8',
    tagText: '#DB2777',
    tagBorder: '#FBCFE8'
  },
  dark: {
    primary: '#1F2937',
    secondary: '#E5E7EB',
    tag: '#F3F4F6',
    tagText: '#111827',
    tagBorder: '#D1D5DB'
  }
};
