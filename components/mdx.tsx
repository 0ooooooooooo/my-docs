// components/mdx.tsx
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents, // ← Fumadocs 内置 MDX 组件（Callout / Tab 等）
    ...components,           // ← 允许页面级覆盖
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

// ← 全局类型声明，MDX 文件内可直接用组件无需 import
declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}