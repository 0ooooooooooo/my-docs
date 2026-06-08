// app/docs/[[...slug]]/page.tsx
import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
  PageLastUpdate,
} from 'fumadocs-ui/page';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { notFound, redirect } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import { findPath } from 'fumadocs-core/page-tree';
import { icons } from '@/icons/index';

const ROOT_REDIRECTS: Record<string, string> = {
  '/docs/CompatibleList': '/docs/CompatibleList/solar-battery',
  '/docs/SupportCenter': '/docs/SupportCenter/EndUser',
  '/docs/FAQ': '/docs/FAQ/hems-controller',
};

type SubmenuItem = {
  name: React.ReactNode;
  url: string;
};

type PageTreeRoot = (typeof source.pageTree)[string];
type PageTreeNode = PageTreeRoot['children'][number];

function toAnchorId(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function collectSubmenuItems(nodes: PageTreeNode[]): SubmenuItem[] {
  return nodes.flatMap((node) => {
    if (node.type === 'page') {
      return [{ name: node.name, url: node.url }];
    }

    if (node.type === 'folder') {
      const folderItem = node.index?.url
        ? [{ name: node.name, url: node.index.url }]
        : [];
      const childItems = collectSubmenuItems(node.children);

      return [...folderItem, ...childItems];
    }

    return [];
  });
}

function getSubmenuItems(pageTree: PageTreeRoot, pageUrl: string): SubmenuItem[] {
  const path = findPath(pageTree.children, (node) => {
    if (node.type === 'page') {
      return node.url === pageUrl;
    }

    if (node.type === 'folder') {
      return node.index?.url === pageUrl;
    }

    return false;
  });

  if (!path || path.length === 0) {
    return [];
  }

  const currentNode = path[path.length - 1];
  if (currentNode.type !== 'folder' || currentNode.index?.url !== pageUrl) {
    return [];
  }

  const recursiveItems = collectSubmenuItems(currentNode.children);
  const uniqueItems = new Map<string, SubmenuItem>();

  for (const item of recursiveItems) {
    if (!uniqueItems.has(item.url)) {
      uniqueItems.set(item.url, item);
    }
  }

  return Array.from(uniqueItems.values());
}

interface Props {
  params: Promise<{ lang: string; slug?: string[] }>;
}

// ← 静态生成所有文档页（SSG）
export async function generateStaticParams() {
  return source.generateParams();
}

// ← 自动从 frontmatter 生成页面 metadata
export async function generateMetadata({ params }: Props) {
  const { slug, lang } = await params;
  const page = source.getPage(slug, lang);
  if (!page) {
    notFound();
  }
  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug, lang } = await params;
  const page = source.getPage(slug, lang);

  if (!page) {
    notFound();
  }

  const redirectTarget = ROOT_REDIRECTS[page.url];
  if (redirectTarget) {
    redirect(redirectTarget);
  }

  const MDX = page.data.body;
  const submenuItems = getSubmenuItems(source.pageTree[lang], page.url);
  const titleId = toAnchorId(page.data.title) || page.url.split('/').filter(Boolean).at(-1) || 'section';
  const lastModifiedTime = page.data.lastModified;
  const LinkIcon = icons['link'];
  console.log(source.pageTree, submenuItems, submenuItems.length);
  return (
    <DocsPage toc={page.data.toc}>   {/* ← 自动生成目录 */}
      <DocsBody>
        {/* DocsTitle 渲染模板 */}
        {submenuItems.length > 0 ? (
          <DocsTitle className="flex scroll-m-28 flex-row items-center gap-2" id={titleId}>
          <a data-card="" href={`#${titleId}`} className="peer">
            {page.data.title}
          </a>
          <LinkIcon />
          </DocsTitle>
        ) : null}
        {/* DocsDescription 渲染模板 */}
        {page.data.description ? (
          <DocsDescription>{page.data.description}</DocsDescription>
        ) : null}
        {/* 链接卡片 渲染模板 */}
        {submenuItems.length > 0 ? (
          <Cards className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {submenuItems.map((item) => (
              <Card
                className="group
                rounded-lg
                border
                bg-card
                p-6
                transition-all
                hover:border-fd-foreground/20
                hover:bg-accent/30
                hover:shadow-sm
                [&_h3]:underline
                [&_h3]:underline-offset-2"
                key={item.url}
                title={item.name}
                href={item.url}
              />
            ))}
          </Cards>
        ) : null}
        <MDX components={getMDXComponents()} />
        {lastModifiedTime && <PageLastUpdate date={lastModifiedTime} />}
      </DocsBody>
    </DocsPage>
  );
}