// src/GoogleAnalytics.tsx
import * as React from 'react';

type Props = {
  gtagId?: string;
  allowLocalhost?: boolean;
};

export function GoogleAnalytics({ gtagId, allowLocalhost = false }: Props): React.ReactElement | null {
  const isProd =
    allowLocalhost || (typeof process !== "undefined" ? process.env.NODE_ENV === "production" : true);

  const id =
    gtagId ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLE_TAG_ID : undefined);

  if (!isProd || !id) return null;

  return React.createElement(
    React.Fragment,
    null,
    React.createElement('script', {
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${id}`,
    }),
    React.createElement('script', {
      dangerouslySetInnerHTML: {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `,
      },
    })
  );
}

