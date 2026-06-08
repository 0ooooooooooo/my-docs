// lib/i18n.ts
import type { I18nConfig } from 'fumadocs-core/i18n'; // ← 官方类型

export const i18n: I18nConfig = {
  parser: 'dir',
  defaultLanguage: 'en',
  languages: ['en', 'nl', 'fi', 'fr', 'de', 'it', 'no', 'pt', 'es', 'sv'],
  // hideLocale: 'default-locale', // ← 可选：隐藏 /en/ 前缀，URL 更简洁
};