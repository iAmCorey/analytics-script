# analytics-script

Lightweight analytics script tags for React/Next.js applications (Plausible, Umami, Google Analytics, DataFast, etc.)


## Github Repo
https://github.com/iamcorey/analytics-script.git


## NPM Package
https://www.npmjs.com/package/analytics-script


## Supported Providers

- Plausible Analytics
- Umami
- DataFast
- Google Analytics


## Installation

```bash
npm i analytics-script
```

Or using pnpm:

```bash
pnpm add analytics-script
```

## Usage

### Plausible

**Standard (legacy format):**
```tsx
import { Plausible } from 'analytics-script';

<Plausible 
  domain="yourdomain.com" 
  scriptUrl="https://plausible.io/js/script.js"
/>
```

**With initialization (newer format):**
```tsx
import { PlausibleInit } from 'analytics-script';

<PlausibleInit 
  scriptUrl="https://plausible.io/js/pa-XXXXX.js"
/>
```

**Props for `Plausible`:**
- `domain` - Your website domain (or use env: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`)
- `scriptUrl` - Plausible script URL (or use env: `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL`)
- `defer` - Defer script loading (default: `true`)
- `allowLocalhost` - Enable in development (default: `false`)

**Props for `PlausibleInit`:**
- `scriptUrl` - Plausible script URL (domain is encoded in the URL) (or use env: `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL`)
- `defer` - Use async loading (default: `true`)
- `allowLocalhost` - Enable in development (default: `false`)


### Umami

```tsx
import { Umami } from 'analytics-script';

<Umami 
  websiteId="your-website-id" 
  scriptUrl="https://cloud.umami.is/script.js"
/>
```

**Props:**
- `websiteId` - Your Umami website ID (or use env: `NEXT_PUBLIC_UMAMI_WEBSITE_ID`)
- `scriptUrl` - Umami script URL (or use env: `NEXT_PUBLIC_UMAMI_SCRIPT_URL`)
- `defer` - Defer script loading (default: `true`)
- `allowLocalhost` - Enable in development (default: `false`)


### DataFast

```tsx
import { DataFast } from 'analytics-script';

<DataFast 
  websiteId="your-website-id" 
  domain="yourdomain.com"
  scriptUrl="https://datafa.st/js/script.js"
/>
```

**Props:**
- `websiteId` - Your DataFast website ID (or use env: `NEXT_PUBLIC_DATAFAST_WEBSITE_ID`)
- `domain` - Your website domain (or use env: `NEXT_PUBLIC_DATAFAST_DOMAIN`)
- `scriptUrl` - DataFast script URL (or use env: `NEXT_PUBLIC_DATAFAST_SCRIPT_URL`)
- `defer` - Defer script loading (default: `true`)
- `allowLocalhost` - Enable in development (default: `false`)


### Google Analytics

```tsx
import { GoogleAnalytics } from 'analytics-script';

<GoogleAnalytics gtagId="G-XXXXXXXXXX" />
```

**Props:**
- `gtagId` - Your Google Analytics measurement ID (or use env: `NEXT_PUBLIC_GOOGLE_TAG_ID`)
- `allowLocalhost` - Enable in development (default: `false`)
- `defaultConsent` - Default consent settings for GDPR compliance (optional). **Note**: This only sets the default consent state, you need to implement your own cookie banner UI and update consent when users accept.

**Sending Custom Events:**

```tsx
import { sendGAEvent } from 'analytics-script';

// Send a custom event
<button onClick={() => sendGAEvent('button_click', { category: 'engagement' })}>
  Click me
</button>
```

**With Consent Mode (GDPR Compliance):**

```tsx
<GoogleAnalytics 
  gtagId="G-XXXXXXXXXX"
  defaultConsent={{
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  }}
/>
```

> **Note**: For GDPR compliance, consider using a cookie consent library like:
> - [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent)
> - [vanilla-cookieconsent](https://www.npmjs.com/package/vanilla-cookieconsent)


#### Example Code
using `react-cookie-consent`


1. Install a cookie consent library:
```bash
npm install react-cookie-consent
```

2. Complete Code
```tsx
import { GoogleAnalytics, updateGoogleConsent } from 'analytics-script';
import CookieConsent from 'react-cookie-consent';

export default function App() {
  return (
    <>
      {/* Set default consent to denied */}
      <GoogleAnalytics 
        gtagId="G-XXXXXXXXXX"
        defaultConsent={{
          analytics_storage: 'denied'
        }}
      />

      {/* Cookie consent banner */}
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        enableDeclineButton
        onAccept={() => {
          // Update consent when user accepts
          updateGoogleConsent({
            analytics_storage: 'granted'
          });
        }}
        style={{ background: '#2B373B' }}
        buttonStyle={{ background: '#4CAF50', color: '#fff', fontSize: '14px' }}
        declineButtonStyle={{ background: '#f44336', color: '#fff', fontSize: '14px' }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>

      {/* Your app content */}
    </>
  );
}
```


using `vanilla-cookieconsent`


1. Install a cookie consent library:
```bash
npm install vanilla-cookieconsent
```

2. Complete Code
```tsx
'use client';
import { GoogleAnalytics } from 'analytics-script';
import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

export default function App() {
  useEffect(() => {
    CookieConsent.run({
      categories: {
        necessary: {
          enabled: true,
          readOnly: true
        },
        analytics: {
          enabled: false
        }
      },

      language: {
        default: 'en',
        translations: {
          en: {
            consentModal: {
              title: 'We use cookies',
              description: 'Cookie modal description',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              showPreferencesBtn: 'Manage preferences'
            },
            preferencesModal: {
              title: 'Cookie preferences',
              acceptAllBtn: 'Accept all',
              acceptNecessaryBtn: 'Reject all',
              savePreferencesBtn: 'Save preferences',
              sections: [
                {
                  title: 'Analytics cookies',
                  description: 'These cookies help us improve our website.',
                  linkedCategory: 'analytics'
                }
              ]
            }
          }
        }
      },

      onConsent: () => {
        if (CookieConsent.acceptedCategory('analytics')) {
          window.gtag?.('consent', 'update', {
            analytics_storage: 'granted'
          });
        }
      },

      onChange: () => {
        if (CookieConsent.acceptedCategory('analytics')) {
          window.gtag?.('consent', 'update', {
            analytics_storage: 'granted'
          });
        } else {
          window.gtag?.('consent', 'update', {
            analytics_storage: 'denied'
          });
        }
      }
    });
  }, []);

  return (
    <>
      <GoogleAnalytics 
        gtagId="G-XXXXXXXXXX"
        defaultConsent={{
          analytics_storage: 'denied'
        }}
      />
      {/* Your app content */}
    </>
  );
}
```


---


### Notes

- **Production Only**: By default, all components only render in production (`NODE_ENV === "production"`)
- **Environment Variables**: Set props via environment variables (e.g., in `.env.local`)
- **Development Testing**: Use `allowLocalhost={true}` to test in development


## Changelog

### v0.4.1
- Updated new Plausible script

### v0.4.0
- Added new Plausible script support
- Added Google Analytics Events support
- Added Google Analytics Consent Mode update function

### v0.3.5
- Added Google Analytics Consent Mode Example Code

### v0.3.3
- Added Google Analytics Consent Mode support (GDPR compliance)

### v0.3.2
- Changed React from dependencies to peerDependencies

### v0.3.1
- Updated GoogleAnalytics props

### v0.3.0
- Added GoogleAnalytics support

### v0.2.0
- Added DataFast support

### v0.1.0
- Added Umami support
- Added `allowLocalhost` prop for development testing
- Fixed TypeScript JSX type errors

### v0.0.2
- Fixed TypeScript type definitions

### v0.0.1
- Initial release
- Plausible support


## License

MIT