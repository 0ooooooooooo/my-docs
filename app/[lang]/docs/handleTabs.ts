import { source } from '@/lib/source';
import { icons } from '@/icons/index';
import { createElement } from 'react';

type TabTitleKey = 'compatibleList' | 'supportCenter' | 'faq';

const tabTitleTranslations: Record<string, Record<TabTitleKey, string>> = {
  en: {
    compatibleList: 'Compatible list',
    supportCenter: 'Support center',
    faq: 'FAQ',
  },
  nl: {
    compatibleList: 'Compatibiliteitslijst',
    supportCenter: 'Ondersteuningscentrum',
    faq: 'FAQ',
  },
  fi: {
    compatibleList: 'Yhteensopivuusluettelo',
    supportCenter: 'Tukikeskus',
    faq: 'UKK',
  },
  fr: {
    compatibleList: 'Liste de compatibilite',
    supportCenter: 'Centre d assistance',
    faq: 'FAQ',
  },
  de: {
    compatibleList: 'Kompatibilitatsliste',
    supportCenter: 'Support Center',
    faq: 'FAQ',
  },
  it: {
    compatibleList: 'Elenco compatibilita',
    supportCenter: 'Centro di supporto',
    faq: 'FAQ',
  },
  no: {
    compatibleList: 'Kompatibilitetsliste',
    supportCenter: 'Brukerstotte',
    faq: 'OSS',
  },
  pt: {
    compatibleList: 'Lista de compatibilidade',
    supportCenter: 'Centro de suporte',
    faq: 'FAQ',
  },
  es: {
    compatibleList: 'Lista de compatibilidad',
    supportCenter: 'Centro de soporte',
    faq: 'Preguntas frecuentes',
  },
  sv: {
    compatibleList: 'Kompatibilitetslista',
    supportCenter: 'Supportcenter',
    faq: 'Vanliga fragor',
  },
};

const resolveTabTitle = (lang: string, key: TabTitleKey): string =>
  tabTitleTranslations[lang]?.[key] ?? tabTitleTranslations.en[key];

const tabsConfig = [
  {
    titleKey: 'compatibleList',
    icon: 'compatibleList',
    url: '/docs/CompatibleList/solar-battery',
    prefix: '/docs/CompatibleList',
  },
  {
    titleKey: 'supportCenter',
    icon: 'supportCenter',
    url: '/docs/SupportCenter/EndUser',
    prefix: '/docs/SupportCenter',
  },
  {
    titleKey: 'faq',
    icon: 'faq',
    url: '/docs/FAQ/hems-controller',
    prefix: '/docs/FAQ',
  },
] as const;

const allDocUrls = source
  .generateParams()
  .map((params) => source.getPage(params.slug)?.url)
  .filter((url): url is string => Boolean(url));

const stripLocalePrefix = (url: string) =>
  url.replace(/^\/[a-z]{2}(?=\/docs(?:\/|$))/, '');

const isSectionUrl = (url: string, prefix: string) =>
  url === prefix || url.startsWith(`${prefix}/`);

const sectionUrls = (lang: string, prefix: string) => {
  const urls = new Set<string>();

  for (const url of allDocUrls) {
    const normalizedUrl = stripLocalePrefix(url);

    if (!isSectionUrl(normalizedUrl, prefix)) {
      continue;
    }

    // Keep both variants so matching works regardless of locale URL strategy.
    urls.add(normalizedUrl);
    urls.add(toLocaleUrl(lang, normalizedUrl));
  }

  return urls;
};

const toLocaleUrl = (lang: string, url: string) => `/${lang}${url}`;

export function handleTabs(lang: string) {
  return tabsConfig.map((tab) => {
    const Svg = icons[tab.icon];

    return {
      title: resolveTabTitle(lang, tab.titleKey),
      description: '',
      url: toLocaleUrl(lang, tab.url),
      urls: sectionUrls(lang, tab.prefix),
      icon: createElement(Svg, { className: 'size-5 text-fd-muted-foreground' }),
    };
  });
}