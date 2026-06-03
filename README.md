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

## Quality tooling

The site now includes a lightweight quality gate for local development and CI, which includes:

- `oxfmt` for formatting (`npm run format`, `npm run format:check`)
- `oxlint` for VitePress TypeScript and Vue script-block linting (`npm run lint`)
- `stylelint` for theme CSS (`npm run lint:css`)
- `markdownlint-cli2` for docs and landing pages (`npm run lint:md`)
- `vue-tsc` for VitePress theme and config type-checking (`npm run typecheck`)
- `npm audit --audit-level=high` as a CI dependency gate (`npm run audit`)
- `npm run verify` to run the full gate plus a production build

If you use [Task](https://taskfile.dev/), the same workflow is also available
via `task fmt`, `task lint`, `task audit`, and `task check`.

`npm run audit` intentionally fails only on `high` and `critical`
vulnerabilities. The current remaining `moderate` advisories come from the
VitePress/Vite/esbuild toolchain upstream, so this keeps CI actionable without
turning it into a permanent red light.

## Structure

| Path                   | Purpose                                 |
| ---------------------- | --------------------------------------- |
| `index.md`             | English landing page (default locale)   |
| `docs/`                | English documentation pages             |
| `cs/`                  | Czech landing page and docs             |
| `.vitepress/config.ts` | Site config, locales, nav, theme        |
| `.vitepress/theme/`    | Brand theme overrides                   |
| `public/`              | Static assets (brand, favicon, `CNAME`) |
| `Taskfile.yml`         | Local quality and verification tasks    |

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes it to GitHub Pages. The custom domain is configured via
`public/CNAME`.

Brand assets in `public/brand/` are sourced from the Hegemony application
(`apps/ui/public/brand`).
