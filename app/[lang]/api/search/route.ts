import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// ← 基于文件内容自动建立全文搜索索引
export const { GET } = createFromSource(source);