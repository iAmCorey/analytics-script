// src/Umami.tsx
import * as React from 'react';

type Props = {
  websiteId?: string;
  scriptUrl?: string;
  defer?: boolean;
  allowLocalhost?: boolean;
};

export function Umami({ websiteId, scriptUrl, defer = true, allowLocalhost = false }: Props): React.ReactElement | null {
  const isProd =
    allowLocalhost || (typeof process !== "undefined" ? process.env.NODE_ENV === "production" : true);

  const id =
    websiteId ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID : undefined);

  const u =
    scriptUrl ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL : undefined);

  if (!isProd || !id || !u) return null;

  return React.createElement('script', {
    ...(defer ? { defer: true } : {}),
    'data-website-id': id,
    src: u,
  });
}

