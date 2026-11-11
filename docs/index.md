<script setup>
// Build-time flags injected by .vitepress/config.ts (vite define): the
// platform documentation, the API reference, and the plugin documentation
// exist only in builds where the sync scripts ran first, so the links below
// render only when their targets do.
const platformDocsSynced = __PLATFORM_DOCS_SYNCED__;
const apiReferenceSynced = __API_REFERENCE_SYNCED__;
const pluginDocsSynced = __PLUGIN_DOCS_SYNCED__;
</script>

# Documentation

Hegemony is a proof-of-execution platform for deterministic, long-running
infrastructure workflows, built on [Temporal](https://temporal.io/) with a
declarative Flow Engine.

::: info Open source and sponsored development
Hegemony is open source under the `AGPL-3.0-or-later` license. Ongoing
development is sponsored by [Rexonix s.r.o.](https://rexonix.cz/)
:::

<div v-if="platformDocsSynced || apiReferenceSynced || pluginDocsSynced">

::: tip Where to go
<span v-if="platformDocsSynced">The [platform documentation](/docs/platform/) - guides, features,
reference, and architecture - is published here straight from the
[Hegemony repository](https://github.com/hegemony-sh/hegemony).</span>
<span v-if="apiReferenceSynced">The [API reference](/api/){target="_self"} renders the platform's
OpenAPI contract.</span>
<span v-if="pluginDocsSynced">The [step plugin documentation](/docs/plugins/) publishes every
plugin's own handler pages straight from the plugin repository.</span>
:::

</div>

## Quick Start

The fastest way to try Hegemony is the local demo. One command starts the
platform on your machine next to a small lab of simulated routers and
servers. The command and the requirements are in
[Try the demo](/#try-the-demo) on the home page.

The UI then runs at `http://localhost:8080`. Log in as `noc` with the
password the installer prints.

## Learn more

- [Architecture & System Design](https://github.com/hegemony-sh/hegemony/blob/develop/docs/architecture/overview.md)
- [Feature Guides](https://github.com/hegemony-sh/hegemony/tree/develop/docs/features)
- [Contributing Guide](https://github.com/hegemony-sh/hegemony/blob/develop/CONTRIBUTING.md)
