// src/moneyfast/MoneyFast.tsx
import * as React from 'react';

type Props = {
  websiteId?: string;
  scriptUrl?: string;
  debug?: boolean;
  defer?: boolean;
  allowLocalhost?: boolean;
};

export function MoneyFast({
  websiteId,
  scriptUrl,
  debug = false,
  defer = true,
  allowLocalhost = false,
}: Props): React.ReactElement | null {
  const isProd =
    allowLocalhost || (typeof process !== "undefined" ? process.env.NODE_ENV === "production" : true);

  const id =
    websiteId ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_MONEYFAST_WEBSITE_ID : undefined);

  const src =
    scriptUrl ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_MONEYFAST_SCRIPT_URL : undefined) ??
    "https://moneyfa.st/js/script.min.js";

  if (!isProd || !id) return null;

  return React.createElement('script', {
    ...(defer ? { defer: true } : {}),
    ...(debug ? { 'data-debug': 'true' } : {}),
    'data-website-id': id,
    src,
  });
}
