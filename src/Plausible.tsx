// src/Plausible.tsx
import * as React from 'react';

type Props = {
  domain?: string;
  scriptUrl?: string;
  defer?: boolean;
};

export function Plausible({ domain, scriptUrl, defer = true }: Props): React.ReactElement | null {
  const isProd =
    typeof process !== "undefined" ? process.env.NODE_ENV === "production" : true;

  const d =
    domain ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN : undefined);

  const u =
    scriptUrl ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL : undefined);

  if (!isProd || !d || !u) return null;

  return React.createElement('script', {
    ...(defer ? { defer: true } : {}),
    'data-domain': d,
    src: u,
  });
}