"use client";

import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { ChevronDown, Languages } from 'lucide-react';

export function LocaleSelectBanner() {
  const { locales = [], locale, onChange } = useI18n();

  if (locales.length === 0) {
    return null;
  }

  const currentLocale = locales.find((item) => item.locale === locale) ?? locales[0];

  return (
    <Popover>
      <PopoverTrigger
        aria-label={currentLocale.name}
        className={`${buttonVariants({ variant: 'secondary' })} w-full justify-start gap-1.5 bg-fd-secondary/50 text-fd-muted-foreground`}
      >
        <Languages className="size-4.5" />
        <span>{currentLocale.name}</span>
        <ChevronDown className="ms-auto size-3.5" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-0.5 p-1" align="start">
        {locales.map((item) => (
          <button
            key={item.locale}
            type="button"
            className={`rounded-lg px-2 py-1.5 text-start text-sm transition-colors ${item.locale === locale ? 'bg-fd-primary/10 text-fd-primary' : 'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground'}`}
            onClick={() => onChange?.(item.locale)}
          >
            {item.name}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}