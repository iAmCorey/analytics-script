// src/google-analytics/helpers.ts

type ConsentParams = {
  ad_storage?: 'granted' | 'denied';
  ad_user_data?: 'granted' | 'denied';
  ad_personalization?: 'granted' | 'denied';
  analytics_storage?: 'granted' | 'denied';
};

/**
 * Update Google Analytics consent status
 * @param consent - Consent parameters to update
 */
export function updateGoogleConsent(consent: ConsentParams): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', consent);
  }
}

/**
 * Send custom event to Google Analytics
 * @param eventName - Name of the event
 * @param eventParams - Optional event parameters
 * 
 * @example
 * sendGAEvent('button_click', { category: 'engagement', label: 'signup' });
 */
export function sendGAEvent(eventName: string, eventParams?: Record<string, any>): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams || {});
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: any) => void;
  }
}

