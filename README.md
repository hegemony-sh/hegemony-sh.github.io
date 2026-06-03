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
npm run verify     # format/lint/typecheck/build + internal link checks
npm run test:e2e:smoke # browser smoke tests for custom interactive behavior
```

## Quality tooling

The site now includes a lightweight quality gate for local development and CI, which includes:

- `oxfmt` for formatting (`npm run format`, `npm run format:check`)
- `oxlint` for VitePress, Playwright, and local utility scripts (`npm run lint`)
- `stylelint` for theme CSS (`npm run lint:css`)
- `markdownlint-cli2` for docs and landing pages (`npm run lint:md`)
- `vue-tsc` for VitePress theme and config type-checking (`npm run typecheck`)
- an internal built-site link checker (`npm run linkcheck:internal`)
- Playwright smoke tests for custom website behavior (`npm run test:e2e:smoke`)
- `npm audit --audit-level=moderate` as a CI dependency gate (`npm run audit`)
- `npm run verify` to run the full gate plus a production build and link checks

If you use [Task](https://taskfile.dev/), the same workflow is also available
via `task fmt`, `task lint`, `task audit`, `task test`, and `task check`.

The repo uses npm `overrides` to keep the current `vitepress@1.6.x` toolchain
on patched `vite` and `esbuild` releases while upstream still depends on the
older vulnerable range.

## Contributing

- Run `npm run verify` before opening a PR.
- Run `npm run test:e2e:smoke` for changes touching `.vitepress/`, localized
  routing, navigation, or static assets.
- Keep English and Czech pages aligned when updating shared content, or note a
  deliberate translation follow-up in the PR.
- Use the PR and issue templates in `.github/` to capture screenshots,
  affected URLs, and verification details.

## Structure

| Path                   | Purpose                                 |
| ---------------------- | --------------------------------------- |
| `.github/`             | CI workflow, templates, Dependabot      |
| `index.md`             | English landing page (default locale)   |
| `docs/`                | English documentation pages             |
| `cs/`                  | Czech landing page and docs             |
| `.vitepress/config.ts` | Site config, locales, nav, theme        |
| `.vitepress/theme/`    | Brand theme overrides                   |
| `e2e/`                 | Playwright smoke tests                  |
| `public/`              | Static assets (brand, favicon, `CNAME`) |
| `scripts/`             | Local utility checks                    |
| `Taskfile.yml`         | Local quality and verification tasks    |

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which audits
dependencies, runs quality checks, validates internal links, executes smoke E2E
tests, and then publishes the site to GitHub Pages. The custom domain is
configured via `public/CNAME`.

Brand assets in `public/brand/` are sourced from the Hegemony application
(`apps/ui/public/brand`).
