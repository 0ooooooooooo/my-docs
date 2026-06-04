import { source } from '@/lib/source';
import { icons } from '@/icons/index';
import { createElement } from 'react';
const tabsConfig = [
  {
    title: 'Compatible list',
    icon: 'compatibleList',
    url: '/docs/CompatibleList/solar-battery',
    prefix: '/docs/CompatibleList',
  },
  {
    title: 'Support center',
    icon: 'supportCenter',
    url: '/docs/SupportCenter/EndUser',
    prefix: '/docs/SupportCenter',
  },
  {
    title: 'FAQ',
    icon: 'faq',
    url: '/docs/FAQ/hems-controller',
    prefix: '/docs/FAQ',
  },
] as const;
const allDocUrls = source
    .generateParams()
    .map((params) => source.getPage(params.slug)?.url)
    .filter((url): url is string => Boolean(url));
const sectionUrls = (prefix: string) =>
    new Set(allDocUrls.filter((url) => url === prefix || url.startsWith(`${prefix}/`)));
export function handleTabs() {
  return tabsConfig.map((tab) => {
    const Svg = icons[tab.icon];
    return {
      title: tab.title,
      description: '',
      url: tab.url,
      urls: sectionUrls(tab.prefix),
      icon: createElement(Svg, { className: "size-5 text-fd-muted-foreground" }),
    };
  })
}