// src/crisp/Crisp.tsx
import * as React from 'react';

type Props = {
  websiteId?: string;
  allowLocalhost?: boolean;
};

export function Crisp({ 
  websiteId,
  allowLocalhost = false
}: Props): React.ReactElement | null {
  const isProd =
    allowLocalhost || (typeof process !== "undefined" ? process.env.NODE_ENV === "production" : true);

  const id =
    websiteId ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID : undefined);

  if (!isProd || !id) return null;

  const crispScript = `
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "${id}";
    (function(){
      d = document;
      s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  `;

  return React.createElement('script', {
    id: 'crisp-chat',
    type: 'text/javascript',
    dangerouslySetInnerHTML: { __html: crispScript },
  });
}

