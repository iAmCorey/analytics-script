// src/moneyfast/helpers.ts

declare global {
  interface Window {
    MoneyFast?: {
      track: (eventName: string) => void;
      get: () => Record<string, string>;
      meta: () => Record<string, string>;
      clear: () => void;
    };
  }
}

function getMoneyFast() {
  return typeof window !== 'undefined' ? window.MoneyFast : undefined;
}

/**
 * Track a custom event in MoneyFast (client-side)
 * @param eventName - Name of the event to track (max 100 chars, [a-zA-Z0-9_\-.] only)
 *
 * @example
 * trackMoneyFastEvent('signup_click');
 * trackMoneyFastEvent('purchase_completed');
 */
export function trackMoneyFastEvent(eventName: string): void {
  getMoneyFast()?.track(eventName);
}

/**
 * Get raw attribution data from the MoneyFast cookie
 * Returns UTM, device, referrer, and timestamp fields
 *
 * @example
 * const data = getMoneyFastAttribution();
 * // { moneyfast_ref: 'google', moneyfast_campaign: 'summer', moneyfast_device: 'desktop', ... }
 */
export function getMoneyFastAttribution(): Record<string, string> {
  return getMoneyFast()?.get() ?? {};
}

/**
 * Get attribution data formatted for Stripe Checkout metadata
 * Adds exit_page, removes timestamp — ready to pass as metadata
 *
 * @example
 * const meta = getMoneyFastMeta();
 * // Pass to Stripe Checkout:
 * // stripe.checkout.sessions.create({
 * //   metadata: meta,
 * //   subscription_data: { metadata: meta },
 * // })
 */
export function getMoneyFastMeta(): Record<string, string> {
  return getMoneyFast()?.meta() ?? {};
}

/**
 * Clear MoneyFast attribution cookie
 *
 * @example
 * clearMoneyFastAttribution();
 */
export function clearMoneyFastAttribution(): void {
  getMoneyFast()?.clear();
}
