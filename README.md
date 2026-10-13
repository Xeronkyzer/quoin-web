# Quoin — Operational Intelligence

A modern, high-performance web application showcasing Quoin's managed services, transparent pricing, and structured operational workflows.

## Tech Stack

- **Runtime & UI**: [React 19](https://react.dev/) + TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with dedicated design system tokens
- **Build Tooling**: [Vite 8](https://vitejs.dev/) with `@vitejs/plugin-react` and Rollup code-splitting
- **Formatting & Linting**: [oxfmt](https://oxc.rs/)

## Getting Started

### Prerequisites

- Node.js 20+ (recommended v22+)
- [pnpm](https://pnpm.io/) 9+

### Installation

```bash
pnpm install
```

### Development Server

Start the local development server:

```bash
pnpm dev
```

The application will be accessible at `http://localhost:8443/`.

### Production Build

Create an optimized production bundle:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Production security configuration

Before deploying the API routes to Vercel, configure these encrypted environment
variables for the Production environment:

- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` — shared rate-limit
  and deduplication storage. The API deliberately returns `503` in production
  if this shared store is unavailable.
- `INTERNAL_SALT` — a dedicated, randomly generated secret used only for
  deduplication fingerprints. Do not reuse the Gemini key. Generate at least
  32 random bytes, for example with `openssl rand -hex 32`.
- `WEBHOOK_SECRET` — a distinct, high-entropy secret shared with the Google
  Apps Script endpoints. Those scripts must reject requests unless both the
  `x-webhook-secret` header and the JSON `secret` field match this value.
- `GEMINI_API_KEY`, `GOOGLE_SHEET_URL`, and `GOOGLE_SHEET_SUBSCRIBE_URL` — the
  existing service configuration.

Keep all secrets out of the repository. After setting or rotating these values,
redeploy and submit one test consultation and newsletter signup to confirm that
the Google Apps Script validation accepts the secret.

## Project Structure

```text
├── public/              # Static assets and SVG icons
│   └── favicon.svg      # Quoin brand monogram
├── src/
│   ├── App.tsx          # Core application & page components
│   ├── index.css        # Design system tokens and global styles
│   ├── main.tsx         # Application entrypoint & DOM mount
│   └── vite-env.d.ts    # TypeScript environment declarations
├── index.html           # HTML5 shell with font preloads & SEO metadata
├── package.json         # Dependencies and lifecycle scripts
├── tsconfig.json        # TypeScript compiler configuration
└── vite.config.ts       # Optimized Vite build and dev server config
```

## Performance & Engineering Highlights

- **Frame Budget Optimization**: Cursor parallax calculations in the hero section are batched into `requestAnimationFrame` with cached bounding rects, eliminating layout thrashing and maintaining smooth 120fps.
- **Code Splitting**: Rollup chunk partitioning isolates `react` and `react-dom` into a standalone vendor bundle for long-term browser cacheability.
- **CSS Grid Animations**: Smooth accordion expansion using CSS grid row transitions without layout jitter.
- **Font Delivery**: Self-hosted and preconnected `Inter` typography with `font-display: swap` to prevent Cumulative Layout Shift (CLS).
