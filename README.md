# hegemony-sh.github.io

Project website for **[Hegemony](https://github.com/hegemony-sh/Hegemony)** — a
proof-of-execution platform for deterministic, long-running infrastructure
workflows on Temporal.

Built with [VitePress](https://vitepress.dev/) and deployed to GitHub Pages at
**[hegemony.sh](https://hegemony.sh)**.

The site is localized in English (default, `/`) and Czech (`/cs/`).

## Local development

Requires Node.js 20+.

```bash
npm install        # install dependencies
npm run docs:dev   # start the dev server (http://localhost:5173)
npm run docs:build # production build into .vitepress/dist
npm run docs:preview
```

## Structure

| Path                   | Purpose                                 |
| ---------------------- | --------------------------------------- |
| `index.md`             | English landing page (default locale)   |
| `docs/`                | English documentation pages             |
| `cs/`                  | Czech landing page and docs             |
| `.vitepress/config.ts` | Site config, locales, nav, theme        |
| `.vitepress/theme/`    | Brand theme overrides                   |
| `public/`              | Static assets (brand, favicon, `CNAME`) |

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes it to GitHub Pages. The custom domain is configured via
`public/CNAME`.

Brand assets in `public/brand/` are sourced from the Hegemony application
(`apps/ui/public/brand`).
