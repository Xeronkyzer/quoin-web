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
