// src/plausible/Plausible.tsx
import * as React from 'react';

type Props = {
  domain?: string;
  scriptUrl?: string;
  defer?: boolean;
  allowLocalhost?: boolean;
};

/**
 * Plausible Analytics component (legacy format)
 */
export function Plausible({ domain, scriptUrl, defer = true, allowLocalhost = false }: Props): React.ReactElement | null {
  const isProd =
    allowLocalhost || (typeof process !== "undefined" ? process.env.NODE_ENV === "production" : true);

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

/**
 * Plausible Analytics component (with initialization script)
 */
export function PlausibleInit({ scriptUrl, defer = true, allowLocalhost = false }: Omit<Props, 'domain'>): React.ReactElement | null {
  const isProd =
    allowLocalhost || (typeof process !== "undefined" ? process.env.NODE_ENV === "production" : true);

  const u =
    scriptUrl ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL : undefined);

  if (!isProd || !u) return null;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement('script', {
      async: defer,
      src: u,
    }),
    React.createElement('script', {
      dangerouslySetInnerHTML: {
        __html: `
          window.plausible = window.plausible || function() { (plausible.q = plausible.q || []).push(arguments) };
          plausible.init = plausible.init || function(i) { plausible.o = i || {} };
          plausible.init();
        `,
      },
    })
  );
}

