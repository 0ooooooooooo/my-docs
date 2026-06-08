import { source } from '@/lib/source';
import { icons } from '@/icons/index';
import { createElement } from 'react';

type IconComponent = (typeof icons)[keyof typeof icons];
type IconKey = keyof typeof icons;
type PageTree = (typeof source.pageTree)[string];
type TreeNode = PageTree['children'][number];

const ICON_CLASS = '!size-5' as const;

function resolveIconKey(value: unknown): IconKey | undefined {
  if (typeof value === 'string' && value in icons) {
    return value as IconKey;
  }

  // 处理 $ref 为 { folder: string } 的情况
  if (
    value !== null &&
    typeof value === 'object' &&
    'folder' in value &&
    typeof (value as Record<string, unknown>).folder === 'string'
  ) {
    const folder = (value as Record<string, unknown>).folder as string;
    if (folder in icons) {
      return folder as IconKey;
    }
  }

  return undefined;
}

function resolveIcon(iconKey: IconKey) {
  const Icon: IconComponent = icons[iconKey];
  // ← createElement 只在 icon 确实存在时调用，避免渲染 undefined
  return createElement(Icon, { className: ICON_CLASS });
}

export function injectIcons(items: TreeNode[]): TreeNode[] {
  return items.map((item) => {
    // 只处理有 children 的 folder 节点
    if (!('children' in item) || !item.children?.length) {
      return item; // ← 直接返回原引用，避免不必要的对象拷贝
    }

    const processedChildren = item.children.map((child) => {
      const ref = '$ref' in child
        ? (child as unknown as Record<string, unknown>).$ref
        : undefined;

      const iconKey = resolveIconKey(ref);

      // ← 只有 iconKey 存在时才覆盖 icon，保留原有 icon
      if (!iconKey) {
        return child;
      }

      return {
        ...child,
        icon: resolveIcon(iconKey),
      };
    });

    return {
      ...item,
      children: processedChildren,
    };
  });
}