// next.config.mjs（必须用 .mjs，fumadocs-mdx 是 ESM-only）
import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

// ← 通过 Next.js 插件在构建时编译 MDX
const withMDX = createMDX();

export default withMDX(config);