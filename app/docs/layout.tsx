// app/docs/layout.tsx
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import { injectIcons } from '@/app/docs/injectIcons';
import { handleTabs } from '@/app/docs/handleTabs';

export default function Layout({ children }: { children: ReactNode }) {
  const tree = injectIcons(source.pageTree.children);
  const tabs = handleTabs();
  return (
    <DocsLayout
      tabs={tabs}
      sidebar={{
        defaultOpenLevel: 1,
        prefetch: true,
      }}
      tree={{
        ...source.pageTree,
        children: tree,
      }}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}