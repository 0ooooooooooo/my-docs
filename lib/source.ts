// lib/source.ts
import { docs } from 'collections/server'; // ← 来自自动生成的 .source/
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',                       // ← 文档的 URL 前缀
  source: docs.toFumadocsSource(),
});