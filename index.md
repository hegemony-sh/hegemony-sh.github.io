---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: Home

hero:
  name: Hegemony
  text: Deterministic infrastructure workflows
  tagline: A proof-of-execution platform for deterministic, long-running infrastructure automation — built on Temporal with a declarative Flow Engine.
  image:
    src: /brand/logo-stacked.png
    alt: Hegemony
  actions:
    - theme: brand
      text: Get Started
      link: /docs/
    - theme: alt
      text: View on GitHub
      link: https://github.com/hegemony-sh/hegemony
    - theme: alt
      text: Try the demo
      link: "#try-the-demo"

features:
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>'
    title: Declarative Flow Engine
    details: Define workflows in YAML or JSON and compose fork/join graphs with pluggable handlers — no orchestration glue to write.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>'
    title: Deterministic Execution
    details: Reliable, resumable, fault-tolerant runs powered by Temporal. Long-running operations survive restarts and resume exactly where they left off.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
    title: Real-time Observability
    details: Server-Sent Events stream live, step-by-step progress to the UI, backed by a persistent audit trail for compliance and debugging.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>'
    title: Run Anything in Containers
    details: Execute arbitrary tooling in isolated containers via run_container steps — mount workflow attachments and render configs without bespoke handlers.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>'
    title: Pluggable Inventory
    details: Target devices from the built-in inventory or external sources such as NetBox via pluggable inventory providers.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>'
    title: Git-backed Workflow Definitions
    details: Version workflow definitions per repository — push, pull, or continuously sync individual workflows and their attachments with Git.

  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>'
    title: Configuration Exchange
    details: Import and export the whole platform configuration as YAML, and sync or back up your entire platform state to Git.

  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/></svg>'
    title: Connectivity Monitors
    details: Run background health and connectivity probes against device roles or addresses, collected as time-series with live tables and graphs.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>'
    title: Keycloak SSO &amp; RBAC
    details: Enterprise authentication via Keycloak OIDC with centralized, role-based access control (admin, operator, auditor, viewer, approver).
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>'
    title: Secrets Management
    details: Pluggable secret backends, including HashiCorp Vault. Only references are stored — secret values never touch the database.
  - icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>'
    title: Notifications &amp; Webhooks
    details: Event-driven notifications and webhooks integrate Hegemony with your existing alerting and automation pipelines.
---

<div class="demo-section" id="try-the-demo">
  <p class="demo-eyebrow">Try the demo</p>
  <div class="demo-card">

## Run the full demo locally

One command brings up the whole Hegemony stack with a pre-loaded demo
scenario — inventory, secrets, schedules, webhooks, and flows for the
fictional operator “Meridian Networks”, including a self-contained virtual
lab flow that provisions and tears down a multi-router OSPF datacenter:

```sh
curl -fsSL https://hegemony.sh/install.sh | sh
```

The installer clones the platform and demo-data repositories and starts
everything (API, worker, scheduler, UI, Temporal, Keycloak, Vault, MinIO) at
`http://localhost:8080`. You need `curl`, `git` (with access to the platform
repository), `docker` with the Compose v2 plugin,
[go-task](https://taskfile.dev/), and a `docker login ghcr.io` session.
Lifecycle commands and demo details are in
[hegemony-sh/hegemony-demo-data](https://github.com/hegemony-sh/hegemony-demo-data).

<p class="demo-note">Demo credentials are hard-coded defaults for local
evaluation only — never expose the stack to a network.</p>

  </div>
</div>

<div class="sponsor-section">
  <p class="sponsor-eyebrow">Open source, backed by Rexonix</p>
  <div class="sponsor-card">
    <div>
      <h2>Open source project. Sponsored by Rexonix.</h2>
      <p>
        Hegemony is released as open source software under the AGPL-3.0-or-later
        license. Ongoing development is sponsored by
        <a href="https://rexonix.cz/" target="_blank" rel="noreferrer">Rexonix s.r.o.</a>.
      </p>
    </div>
    <a
      class="sponsor-logo"
      href="https://rexonix.cz/"
      target="_blank"
      rel="noreferrer"
      aria-label="Rexonix s.r.o."
    >
      <img src="/sponsors/rexonix-logo.png" alt="Rexonix s.r.o. logo" />
    </a>
  </div>
</div>
