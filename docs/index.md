<script setup>
// Build-time flags injected by .vitepress/config.ts (vite define): the
// platform documentation and the API reference exist only in builds where
// scripts/sync-platform-docs.mjs ran first, so the links below render only
// when their targets do.
const platformDocsSynced = __PLATFORM_DOCS_SYNCED__;
const apiReferenceSynced = __API_REFERENCE_SYNCED__;
</script>

# Documentation

Hegemony is a proof-of-execution platform for deterministic, long-running
infrastructure workflows, built on [Temporal](https://temporal.io/) with a
declarative Flow Engine.

::: info Open source and sponsored development
Hegemony is open source under the `AGPL-3.0-or-later` license. Ongoing
development is sponsored by [Rexonix s.r.o.](https://rexonix.cz/).
:::

<div v-if="platformDocsSynced || apiReferenceSynced">

::: tip Where to go
<span v-if="platformDocsSynced">The [platform documentation](/docs/platform/) - guides, features,
reference, and architecture - is published here straight from the
[Hegemony repository](https://github.com/hegemony-sh/Hegemony).</span>
<span v-if="apiReferenceSynced">The [API reference](/api/){target="_self"} renders the platform's
OpenAPI contract.</span>
:::

</div>

## Quick Start

The fastest way to try Hegemony pulls pre-built images, brings up the full
stack, and seeds a small demo dataset:

```bash
task compose:demo:up
```

The UI is then available at `http://localhost:8080` — log in with
`admin` / `hegemony`.

## Learn more

- [Architecture & System Design](https://github.com/hegemony-sh/Hegemony/blob/main/docs/architecture/overview.md)
- [Feature Guides](https://github.com/hegemony-sh/Hegemony/tree/main/docs/features)
- [Contributing Guide](https://github.com/hegemony-sh/Hegemony/blob/main/CONTRIBUTING.md)
