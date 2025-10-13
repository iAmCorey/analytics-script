// src/datafast/DataFast.tsx
import * as React from 'react';

type Props = {
  websiteId?: string;
  domain?: string;
  scriptUrl?: string;
  defer?: boolean;
  allowLocalhost?: boolean;
};

export function DataFast({ websiteId, domain, scriptUrl, defer = true, allowLocalhost = false }: Props): React.ReactElement | null {
  const isProd =
    allowLocalhost || (typeof process !== "undefined" ? process.env.NODE_ENV === "production" : true);

  const id =
    websiteId ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_DATAFAST_WEBSITE_ID : undefined);

  const d =
    domain ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_DATAFAST_DOMAIN : undefined);

  const u =
    scriptUrl ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_DATAFAST_SCRIPT_URL : undefined);

  if (!isProd || !id || !d || !u) return null;

  return React.createElement('script', {
    ...(defer ? { defer: true } : {}),
    ...(allowLocalhost ? { 'data-allow-localhost': 'true' } : {}),
    'data-website-id': id,
    'data-domain': d,
    src: u,
  });
}

