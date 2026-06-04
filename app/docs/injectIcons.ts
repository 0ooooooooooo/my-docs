import { source } from '@/lib/source';
import { icons } from '@/icons/index';
import { createElement } from 'react';

type IconComponent = (typeof icons)[keyof typeof icons];
type IconKey = keyof typeof icons;
type TreeNode = (typeof source.pageTree.children)[number];

export function injectIcons(items: TreeNode[]): TreeNode[] {
  const ICON_CLASS = '!size-5';
  function getIconByName(name: unknown): IconComponent | undefined {
    if (typeof name !== 'string') {
      return undefined;
    }
    return icons[name as IconKey];
  }
  return items.map((item) => {
    if ('children' in item && item.children?.length) {
      return {
        ...item,
        children: item.children.map((child) => {
            const Icon = getIconByName(child.name);
            return {
              ...child,
              icon: Icon ? createElement(Icon, { className: ICON_CLASS }) : undefined,
            };
        }),
      };
    }
    return {
      ...item,
    } as TreeNode;
  });
};