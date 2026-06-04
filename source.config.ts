// source.config.ts（项目根目录）
import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';

// ← 声明 docs 集合，dir 指向 MDX 文件目录
export const docs = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  plugins: [lastModified()],
});