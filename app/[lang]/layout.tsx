import './globals.css';

import { Manrope, JetBrains_Mono } from 'next/font/google';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { Translations } from 'fumadocs-ui/i18n';

export const metadata: Metadata = {
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

// ← UI 翻译：只翻译 fumadocs-ui 内置组件的文案
// 注意：这不是文档内容翻译，是搜索框、侧边栏等 UI 字符串
const translations: Partial<Record<string, Partial<Translations>>> = {
  nl: { search: 'Zoeken', toc: 'Op deze pagina' },
  fi: { search: 'Hae', toc: 'Tällä sivulla' },
  fr: { search: 'Rechercher', toc: 'Sur cette page' },
  de: { search: 'Suchen', toc: 'Auf dieser Seite' },
  it: { search: 'Cerca', toc: 'In questa pagina' },
  no: { search: 'Søk', toc: 'På denne siden' },
  pt: { search: 'Pesquisar', toc: 'Nesta página' },
  es: { search: 'Buscar', toc: 'En esta página' },
  sv: { search: 'Sök', toc: 'På den här sidan' },
};

// ← 语言切换器显示的选项
const locales = [
  { name: 'English', locale: 'en' },
  { name: 'Dutch', locale: 'nl' },
  { name: 'Finnish', locale: 'fi' },
  { name: 'French', locale: 'fr' },
  { name: 'German', locale: 'de' },
  { name: 'Italian', locale: 'it' },
  { name: 'Norwegian', locale: 'no' },
  { name: 'Portuguese', locale: 'pt' },
  { name: 'Spanish', locale: 'es' },
  { name: 'Swedish', locale: 'sv' },
];

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export default async function Layout({ params, children }: { params: Promise<{ lang: string }>; children: ReactNode }) {
  const { lang } = await params;
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider
          i18n={{
            locale: lang,
            locales,
            translations: translations[lang], // ← undefined 时自动 fallback 到英文
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
