# analytics-script

Lightweight analytics script tags for React/Next.js applications (Plausible, Umami, Google Analytics, DataFast, OpenPanel, etc.)

## Github Repo
https://github.com/iamcorey/analytics-script.git

## NPM Package
https://www.npmjs.com/package/analytics-script

## Changelog

### v0.2.0
- ✅ Added DataFast Analytics support

### v0.1.0
- ✅ Added Umami Analytics support
- ✅ Added `allowLocalhost` prop for development testing
- 🐛 Fixed TypeScript JSX type errors

### v0.0.2
- 🐛 Fixed TypeScript type definitions

### v0.0.1
- 🎉 Initial release
- ✅ Plausible Analytics support

## License

MIT

## Supported Providers

- ✅ Plausible Analytics
- ✅ Umami
- ✅ DataFast
- 🚧 Google Analytics (Coming soon)
- 🚧 OpenPanel (Coming soon)

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

```tsx
import { Plausible } from 'analytics-script';

<Plausible 
  domain="yourdomain.com" 
  scriptUrl="https://plausible.io/js/script.js"
/>
```

**Props:**
- `domain` - Your website domain (or use env: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`)
- `scriptUrl` - Plausible script URL (or use env: `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL`)
- `defer` - Defer script loading (default: `true`)
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
  websiteId="dfid_XFdSyxWFOIZjQMDIE57qI" 
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

---

### Notes

- **Production Only**: By default, all components only render in production (`NODE_ENV === "production"`)
- **Environment Variables**: Set props via environment variables (e.g., in `.env.local`)
- **Development Testing**: Use `allowLocalhost={true}` to test in development

