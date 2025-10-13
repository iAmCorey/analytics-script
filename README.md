# analytics-script

Lightweight analytics script tags for web/Next.js (Plausible, Umami, Google Analytics, DataFast, OpenPanel, etc.)

## Github Repo
https://github.com/iamcorey/analytics-script.git

## NPM Package
https://www.npmjs.com/package/analytics-script

## Supported Analytics

- ✅ Plausible Analytics
- 🚧 Umami (Coming soon)
- 🚧 Google Analytics (Coming soon)
- 🚧 DataFast (Coming soon)
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

### Plausible Analytics

Use in your Next.js application:

```tsx
import { Plausible } from 'analytics-script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Plausible 
          domain="yourdomain.com" 
          scriptUrl="https://plausible.io/js/script.js"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### Props

- `domain` (optional): Your website domain. If not provided, it will use the environment variable `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `scriptUrl` (optional): The URL of the Plausible script. If not provided, it will use the environment variable `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL`
- `defer` (optional): Whether to defer loading the script. Defaults to `true`
- `allowLocalhost` (optional): If `true`, the script will load regardless of the environment (including localhost/development). Defaults to `false`

#### Using Environment Variables

Set in your `.env.local` file:

```env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL=https://plausible.io/js/script.js
```

Then simply use the component:

```tsx
import { Plausible } from 'analytics-script';

<Plausible />
```

#### Testing in Development

To test analytics in your local development environment:

```tsx
<Plausible 
  domain="yourdomain.com" 
  scriptUrl="https://plausible.io/js/script.js"
  allowLocalhost={true}
/>
```

#### Notes

- By default, the component only renders in production environment (`NODE_ENV === "production"`)
- Set `allowLocalhost={true}` to enable analytics tracking in development/localhost
- If required `domain` and `scriptUrl` are not provided, the component will not render anything

## License

MIT