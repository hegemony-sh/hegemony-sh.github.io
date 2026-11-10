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
- **Container steps.** Run any tool in an isolated container, with control
  over which network destinations it may reach.
- **Ready-made steps.** Shell commands over SSH, network device commands,
  Ansible playbooks, Terraform and OpenTofu plan and apply, HTTP requests,
  NetBox operations, and DNS, HTTP, TLS and reachability checks.
- **Managed Terraform and OpenTofu state.** State is stored, locked, versioned
  and encrypted by the platform.

### See and prove what happened

- **Live progress.** Watch each step's output while the run is in progress.
- **Evidence.** Each step keeps what actually ran on each device, including
  files it produced.
- **Audit log.** A searchable record of who did what.
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
  Administrators can adjust what each role may do.
- **Organizations.** Keep several teams or customers apart on one
  installation. Each has its own flows, devices, secrets and roles.
- **Secrets.** Secret values stay in a secret store; the database keeps only
  references. OpenBao is bundled, and plugins connect HashiCorp Vault and
  1Password. Secret values are hidden in step output.
- **SSH host keys and certificate authorities.** Each organization manages
  the SSH host keys and the certificate authorities it trusts.
- **API tokens.** Personal access tokens for scripts and other tools.

### Integrations

- **Git.** Keep flows and their attached files in Git repositories, with push
  and pull.
- **Configuration Exchange.** Export and import the whole platform
  configuration as YAML, and export it to Git on a schedule as a backup.
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
- Support for more network device platforms. Today the network device steps
  support Cisco IOS XE.
- WinRM (Windows Remote Management), for running commands on Windows hosts.
- Short-lived SSH certificates in place of stored passwords and keys.

### Workflows

- Very long runs that roll over their history automatically.
- A choice of what a loop does when one pass fails: stop the loop or continue
  with the next pass.
- Fewer restrictions on what can run inside parallel loops.

### Checks and monitoring

- An SNMP (Simple Network Management Protocol) check step.
- More connectivity checks, such as TLS handshake, SSH banner, DNS query,
  NTP offset and NETCONF.

### Secrets and access

- Dynamic secrets: credentials issued for one run, such as one-time SSH
  passwords and temporary database users.
- A separate secret store for each organization.
- Access rules based on resource attributes, not only on roles.

### Connections to other systems

- Approve or reject a waiting run from another system, such as ServiceNow,
  Jira or a chat tool.
- Mapping and validation of incoming webhook data.
- Custom notification templates.
- Configuration Exchange for a single organization.

### Operations

- Full support for running several API instances side by side.
- Quotas and rate limits for each organization.
- A downloadable copy of the documentation for sites without internet access.
