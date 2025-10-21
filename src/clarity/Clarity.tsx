// src/clarity/Clarity.tsx
import * as React from 'react';

type Props = {
  projectId?: string;
  allowLocalhost?: boolean;
};

export function Clarity({ 
  projectId,
  allowLocalhost = false
}: Props): React.ReactElement | null {
  const isProd =
    allowLocalhost || (typeof process !== "undefined" ? process.env.NODE_ENV === "production" : true);

  const id =
    projectId ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID : undefined);

  if (!isProd || !id) return null;

  const clarityScript = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${id}");
  `;

  return React.createElement('script', {
    id: 'clarity-analytics',
    type: 'text/javascript',
    dangerouslySetInnerHTML: { __html: clarityScript },
  });
}


