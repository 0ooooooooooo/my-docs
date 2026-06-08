// app/[lang]/docs/layout.tsx
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import { injectIcons } from './injectIcons';
import { LocaleSelectBanner } from './LocaleSelectBanner';
import { handleTabs } from './handleTabs';

interface LayoutProps {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}

export default async function Layout({ params, children }: LayoutProps) {
  const { lang } = await params;

  const pageTree = source.pageTree[lang];
  const tree = injectIcons(pageTree.children);
  const tabs = handleTabs(lang);

  return (
    <DocsLayout
      tabs={tabs}
      sidebar={{
        defaultOpenLevel: 1,
        prefetch: true,
        // ← 直接传 JSX，不需要 cloneElement
        banner: <LocaleSelectBanner key="locale-banner" />,
      }}
      tree={{
        ...pageTree,
        children: tree,
      }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}