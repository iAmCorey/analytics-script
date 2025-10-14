// src/datafast/DataFast.tsx
import * as React from 'react';

type Props = {
  websiteId?: string;
  domain?: string;
  scriptUrl?: string;
  apiUrl?: string;
  allowedHostnames?: string;
  defer?: boolean;
  allowLocalhost?: boolean;
  allowFileProtocol?: boolean;
  debug?: boolean;
  disableConsole?: boolean;
};

export function DataFast({ 
  websiteId, 
  domain, 
  scriptUrl, 
  apiUrl, 
  allowedHostnames,
  defer = true, 
  allowLocalhost = false,
  allowFileProtocol = false,
  debug = false,
  disableConsole = false
}: Props): React.ReactElement | null {
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

  const a =
    apiUrl ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_DATAFAST_API_URL : undefined);

  const h =
    allowedHostnames ??
    (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_DATAFAST_ALLOWED_HOSTNAMES : undefined);

  if (!isProd || !id || !d || !u) return null;

  return React.createElement('script', {
    ...(defer ? { defer: true } : {}),
    ...(allowLocalhost ? { 'data-allow-localhost': 'true' } : {}),
    ...(allowFileProtocol ? { 'data-allow-file-protocol': 'true' } : {}),
    ...(debug ? { 'data-debug': 'true' } : {}),
    ...(disableConsole ? { 'data-disable-console': 'true' } : {}),
    'data-website-id': id,
    'data-domain': d,
    ...(a ? { 'data-api-url': a } : {}),
    ...(h ? { 'data-allowed-hostnames': h } : {}),
    src: u,
  });
}

type QueueProps = {
  allowLocalhost?: boolean;
};

/**
 * DataFast Queue Script
 * Add this component before the main DataFast script to ensure reliable tracking.
 * It guarantees events are captured even when triggered before the main script loads.
 */
export function DataFastQueue({ allowLocalhost = false }: QueueProps = {}): React.ReactElement | null {
  const isProd =
    allowLocalhost || (typeof process !== "undefined" ? process.env.NODE_ENV === "production" : true);

  if (!isProd) return null;

  const queueScript = `
    window.datafast = window.datafast || function() {
      window.datafast.q = window.datafast.q || [];
      window.datafast.q.push(arguments);
    };
  `;

  return React.createElement('script', {
    id: 'datafast-queue',
    dangerouslySetInnerHTML: { __html: queueScript },
  });
}

