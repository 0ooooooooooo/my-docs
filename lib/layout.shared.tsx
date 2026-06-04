// lib/layout.shared.tsx
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: false,
      url: '/docs/CompatibleList/solar-battery',
    },
    themeSwitch: {
      enabled: true,
      mode: 'light-dark', // 或 'light-dark-system'
      className: 'sidebar-theme-switch',
    },
  };
}