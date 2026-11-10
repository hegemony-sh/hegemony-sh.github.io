---
description: What Hegemony can do today, and what is planned but not built yet.
aside: true
---

# Features and roadmap

Hegemony runs long, risky infrastructure changes as workflows. This page lists
what it can do today and what is planned but not built yet.

::: info Project status
Hegemony is lab-proven, not yet proven in production. Try it in a lab first.
:::

## What Hegemony does today

### Build workflows

- **Visual flow editor.** Draw a workflow as a graph of steps. Changes stay in
  a draft until you commit them, and every commit is a version you can compare.
- **Control flow.** Branches, loops (sequential or parallel) and fork/join.
- **Reusable flows.** One flow can run another flow as a step.
- **Run forms.** Design the form an operator fills in when starting a run.
- **Triggers.** Start a run by hand, on a schedule, or from an incoming
  webhook (an HTTP call from another system).
- **Run limits.** Cap how many runs of a flow may run at once, and how often.

### Run them reliably

- **Runs that survive restarts.** Runs execute on
  [Temporal](https://temporal.io/), so they continue after a restart and can
  wait for days — for a maintenance window, an approval or a device reload.
- **Approvals.** A run can pause until a person approves or rejects it.
  Pending requests wait in an approvals inbox.
- **Container steps.** Run any tool in an isolated container. You can limit
  which network addresses and ports it may reach.
- **Ready-made steps.** Shell commands over SSH, network device commands,
  Ansible playbooks, Terraform and OpenTofu plan and apply, HTTP requests,
  NetBox operations, and DNS, HTTP, TLS and reachability checks.
- **Managed Terraform and OpenTofu state.** State is stored, locked, versioned
  and encrypted by the platform.

### See and prove what happened

- **Live progress.** Watch each step's output while the run is in progress.
- **Evidence.** Each step keeps what actually ran on each device, including
  files it produced.
- **Audit log.** A record of who did what, with filters.
- **Connectivity monitors.** Background checks against devices during a run,
  shown as live tables and graphs.

### Inventory

- **Built-in inventory.** Devices and sites managed in Hegemony.
- **External sources.** Bring devices and sites in from NetBox or from a Git
  repository through inventory plugins.

### Security and access

- **Single sign-on.** Login through Keycloak using OpenID Connect (OIDC), a
  standard login protocol.
- **Roles.** Admin, editor, operator, approver, auditor and viewer.
  Administrators can change which role each action requires.
- **Organizations.** Keep several teams or customers apart on one
  installation. Each has its own flows, devices, secrets and members.
- **Secrets.** Secret values stay in a secret store; the database keeps only
  references. OpenBao comes as an optional bundled service, and plugins
  connect HashiCorp Vault and 1Password. Secrets that the platform looks up
  for a step are hidden in its output.
- **Trusted hosts and certificates.** Each organization manages the SSH
  host keys it trusts, and the private certificate authorities it trusts for
  TLS connections.
- **API tokens.** Administrators issue tokens that scripts and other tools
  use to call the API.

### Integrations

- **Git.** Keep flows and their attached files in Git repositories, with push
  and pull.
- **Configuration Exchange.** Export and import the platform configuration
  as YAML, and export it to Git on a schedule as a backup. Secret values, run
  history and stored files are not included.
- **Notifications.** Email, Slack, Microsoft Teams, Webex, Discord, Telegram,
  Pushover and outgoing webhooks, sent on run and approval events.
- **File repositories.** Store files for your flows on S3-compatible storage.
- **Plugins.** Steps, inventory sources, notification channels and secret
  stores are plugins, so you can add your own.

## Roadmap

These items are planned but not built yet. The list is not a schedule or a
commitment. The full backlog is
[TODO.md](https://github.com/hegemony-sh/hegemony/blob/develop/TODO.md) in the
Hegemony repository.

### Devices

- Steps that upgrade device software: stage an image, install it, verify the
  running version, and roll back on failure.
- Tested support for more network device platforms. Today the network device
  steps are built and tested for Cisco IOS XE.
- WinRM (Windows Remote Management), for running commands on Windows hosts.
- Short-lived SSH certificates for jump hosts and Linux hosts.

### Workflows

- Very long runs that roll over their history automatically.
- A choice of what a loop does when one pass fails: stop the loop or continue
  with the next pass.
- Fewer restrictions on what can run inside parallel loops.

### Checks and monitoring

- An SNMP (Simple Network Management Protocol) check step.
- More checks for connectivity monitors, such as TLS handshake, SSH banner,
  NTP offset and NETCONF. Monitors check TCP, ping, HTTP and DNS today.

### Secrets and access

- Dynamic secrets: credentials issued for one run, such as one-time SSH
  passwords for Linux hosts and temporary database users.
- A separate secret store for each organization.
- Access rules based on resource attributes, not only on roles.

### Connections to other systems

- Approve or reject a waiting run through an incoming webhook from another
  system, such as ServiceNow, Jira or a chat tool.
- Rules that turn incoming webhook data into run inputs, and validation of
  that data.
- More ways to customize notification text.
- Configuration Exchange for a single organization.

### Operations

- Webhook rate limits that hold across several API instances.
- Quotas and rate limits for each organization.
- A downloadable copy of the documentation for sites without internet access.
