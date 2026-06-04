// src/components/Icon.tsx

import { iconRegistry } from '@/lib/iconRegistry';

interface Props {
  name: keyof typeof iconRegistry;
  className?: string;
}

export function Icon({
  name,
  className,
}: Props) {
  const Svg = iconRegistry[name];

  if (!Svg) return null;

  return <Svg className={className} />;
}