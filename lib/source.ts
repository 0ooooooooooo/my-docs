// lib/source.ts
import { docs } from 'collections/server'; // ← 来自自动生成的 .source/
import { loader } from 'fumadocs-core/source';
import { i18n } from '@/lib/i18n'; // ← 注入 i18n 配置

export const source = loader({
  baseUrl: '/docs',                       // ← 文档的 URL 前缀
  source: docs.toFumadocsSource(),
  i18n,                                   // ← 注入 i18n 配置
});