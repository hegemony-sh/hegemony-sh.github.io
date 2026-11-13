---
layout: page
title: Features
description: What Hegemony can do today, and where it is heading.
---

<div class="features-page">

<p class="features-eyebrow">Features</p>

<h1>Everything a risky change needs, in one platform</h1>

<p class="features-lead">Hegemony runs long infrastructure changes as workflows: with approvals, with a record of what ran on every device, and without losing its place when something restarts.</p>

<h2 class="features-group">Build workflows</h2>

<div class="features-grid">
<FeatureCard icon="workflow" title="Visual flow editor">Draw a workflow as a graph of steps, or edit it directly as YAML. Work in a draft, commit it as a new version, and compare versions.</FeatureCard>
<FeatureCard icon="git" title="Branches, loops and parallel paths">Decide, repeat and fan out inside one workflow. Loops can run one by one or in parallel.</FeatureCard>
<FeatureCard icon="copy" title="Reusable flows">Run one flow as a step of another, so common procedures are built once.</FeatureCard>
<FeatureCard icon="form" title="Run forms">Design the form an operator fills in to start a run, with checks on every field.</FeatureCard>
<FeatureCard icon="play" title="Three ways to start">Start a run by hand, on a schedule, or from another system with an incoming webhook.</FeatureCard>
<FeatureCard icon="filter" title="Run limits">Limit how many runs of a flow are active at once and how often they may start.</FeatureCard>
</div>

<h2 class="features-group">Run them reliably</h2>

<div class="features-grid">
<FeatureCard icon="repeat" title="Runs that survive restarts">Runs execute on Temporal. They continue after a restart and can wait for days for a maintenance window or a device reload.</FeatureCard>
<FeatureCard icon="clock" title="Maintenance windows">Start and approve a run ahead of time. It does its work only inside the maintenance window you set.</FeatureCard>
<FeatureCard icon="check" title="Approvals">Pause a run until a person approves or rejects it. Pending requests wait in one inbox.</FeatureCard>
<FeatureCard icon="terminal" title="Ready-made steps">SSH commands, network device commands, Ansible, Terraform and OpenTofu, HTTP requests, NetBox, and DNS, HTTP and TLS checks.</FeatureCard>
<FeatureCard icon="box" title="Any tool in a container">Run any tool in an isolated container, and limit which network addresses it may reach.</FeatureCard>
<FeatureCard icon="layers" title="Managed Terraform state">The platform stores, locks, versions and encrypts Terraform and OpenTofu state.</FeatureCard>
<FeatureCard icon="chart" title="Connectivity monitors">Watch devices in the background during a change, with live tables and graphs.</FeatureCard>
</div>

<h2 class="features-group">See and prove what happened</h2>

<div class="features-grid">
<FeatureCard icon="activity" title="Live progress">Follow the output of every step while the run is in progress.</FeatureCard>
<FeatureCard icon="file" title="Evidence">Keep a record of what actually ran on each device, together with the files a step produced.</FeatureCard>
<FeatureCard icon="search" title="Audit log">A record of who did what and when, with filters.</FeatureCard>
</div>

<h2 class="features-group">Security and access</h2>

<div class="features-grid">
<FeatureCard icon="shield" title="Single sign-on and roles">Log in through Keycloak. Six roles separate building, running, approving and auditing. Sensitive actions ask for a fresh sign-in.</FeatureCard>
<FeatureCard icon="users" title="Organizations">Keep several teams or customers apart on one installation, each with its own flows, devices and secrets. Copy flows from one to another.</FeatureCard>
<FeatureCard icon="key" title="Secrets stay in a secret store">The database keeps only references. Use the bundled OpenBao, HashiCorp Vault or 1Password. Secrets are hidden in step output.</FeatureCard>
<FeatureCard icon="lock" title="Trusted hosts and certificates">Each organization manages the SSH host keys and the private certificate authorities it trusts.</FeatureCard>
<FeatureCard icon="code" title="API tokens">Tokens let scripts and other tools call the API.</FeatureCard>
</div>

<h2 class="features-group">Inventory and integrations</h2>

<div class="features-grid">
<FeatureCard icon="server" title="Inventory">Manage devices and sites in Hegemony, or bring them in from NetBox or a Git repository. Target devices by hand or by a query.</FeatureCard>
<FeatureCard icon="download" title="Git">Keep flows and their attached files in Git repositories, and sync them with push and pull.</FeatureCard>
<FeatureCard icon="exchange" title="Configuration Exchange">Export and import the platform configuration as YAML, and back it up to Git on a schedule.</FeatureCard>
<FeatureCard icon="bell" title="Notifications">Email, Slack, Microsoft Teams, Webex, Discord, Telegram, Pushover and outgoing webhooks.</FeatureCard>
<FeatureCard icon="storage" title="File repositories">Keep large files on S3-compatible storage.</FeatureCard>
<FeatureCard icon="zap" title="Plugins">Steps, inventory sources, notification channels and secret stores are plugins, so you can add your own.</FeatureCard>
</div>

<h2 id="roadmap" class="features-heading">Roadmap</h2>

<p class="features-note">Where Hegemony is heading. These items are planned, not built yet, and the list is not a schedule or a commitment.</p>

<div class="features-grid">
<FeatureCard planned icon="upload" title="Device software upgrades">Steps that stage an image, install it, verify the running version, and roll back on failure.</FeatureCard>
<FeatureCard planned icon="server" title="More platforms">Support for more platforms: network devices, servers and other systems.</FeatureCard>
<FeatureCard planned icon="monitor" title="Windows hosts">Built-in WinRM (Windows Remote Management) support for running commands on Windows hosts.</FeatureCard>
<FeatureCard planned icon="key" title="Short-lived credentials">Credentials issued for one run, such as short-lived SSH certificates and one-time passwords.</FeatureCard>
<FeatureCard planned icon="message" title="Approvals from other tools">Approve or reject a waiting run from ServiceNow, Jira or a chat tool.</FeatureCard>
<FeatureCard planned icon="chart" title="More checks">An SNMP check, and more connectivity checks such as TLS handshake, SSH banner and NETCONF.</FeatureCard>
<FeatureCard planned icon="layers" title="Workers in separate network zones">Run steps on workers inside a separate network zone, such as a DMZ. The worker connects out to the platform; nothing connects into the zone.</FeatureCard>
<FeatureCard planned icon="storage" title="VM templates for vCenter">Build VMware VM templates in a flow, store them in Hegemony, and let vCenter subscribe to them as a Content Library.</FeatureCard>
</div>

</div>
