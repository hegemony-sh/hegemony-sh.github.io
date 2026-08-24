# Documentation

Hegemony is a proof-of-execution platform for deterministic, long-running
infrastructure workflows, built on [Temporal](https://temporal.io/) with a
declarative Flow Engine.

::: info Open source and sponsored development
Hegemony is open source under the `AGPL-3.0-or-later` license. Ongoing
development is sponsored by [Rexonix s.r.o.](https://rexonix.cz/).
:::

::: tip Where to go
The [platform documentation](/docs/platform/) - guides, features,
reference, and architecture - is published here straight from the
[Hegemony repository](https://github.com/hegemony-sh/Hegemony), and the
[API reference](/api/){target="_self"} renders the platform's OpenAPI
contract.
:::

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
