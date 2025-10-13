// src/google-analytics/GoogleAnalytics.tsx
import * as React from 'react';

type ConsentMode = {
  ad_storage?: 'granted' | 'denied';
  ad_user_data?: 'granted' | 'denied';
  ad_personalization?: 'granted' | 'denied';
  analytics_storage?: 'granted' | 'denied';
};

type Props = {
  gtagId?: string;
  allowLocalhost?: boolean;
  defaultConsent?: ConsentMode;
};

export function GoogleAnalytics({ 
  gtagId, 
  allowLocalhost = false,
  defaultConsent
}: Props): React.ReactElement | null {
  const isProd =
    allowLocalhost || (typeof process !== "undefined" ? process.env.NODE_ENV === "production" : true);

  const id =
    gtagId ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLE_TAG_ID : undefined);

  if (!isProd || !id) return null;

  // Build consent configuration
  const consentConfig = defaultConsent 
    ? `gtag('consent', 'default', ${JSON.stringify(defaultConsent)});`
    : '';

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
          ${consentConfig}
          gtag('config', '${id}');
        `,
      },
    })
  );
}

