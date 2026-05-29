---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

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
      link: https://github.com/hegemony-sh/Hegemony

features:
  - icon: 🧩
    title: Declarative Workflows
    details: Define flows in YAML/JSON with pluggable handlers. Compose fork/join graphs without writing orchestration glue.
  - icon: 🔁
    title: Deterministic Execution
    details: Reliable, resumable workflow execution powered by Temporal — fault tolerant and reproducible by design.
  - icon: 📡
    title: Real-time Updates
    details: Server-Sent Events stream live step-by-step progress straight to the UI as runs execute.
  - icon: ↩️
    title: Saga Compensation
    details: Automatic, ordered compensation (undo) on step failure keeps long-running operations safe.
  - icon: 📜
    title: Audit Trail
    details: Persistent event logging captures every step for compliance, debugging, and evidence collection.
  - icon: 🔌
    title: Pluggable Handlers
    details: Extend the platform with a clean handler registry — orchestration stays decoupled from execution logic.
---
