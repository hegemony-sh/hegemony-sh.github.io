// SPDX-FileCopyrightText: 2025-2026 Jakub Trávník <jakub.travnik@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Sync the step-plugin repository's handler documentation into this site.
//
// Plugin documentation is owned by the plugin repository: every wheel ships
// one Markdown page per handler it registers (the pages also install with
// the wheel and render inside the app). The site publishes the same pages
// straight from that repository, so nothing is duplicated into the platform
// repo and the site never carries prose of its own for plugins.
//
// Usage: node scripts/sync-plugin-docs.mjs <path-to-plugins-checkout> [--allow-missing]
//
// --allow-missing turns "no checkout / no plugins tree" into a clean skip
// (pull request builds get no checkout; deploys pass it while the plugins
// repository or its token is not configured yet).
//
// What it produces (build-time artifacts, none committed):
// - docs/plugins/<plugin>/<handler_id>.md   each page, copied verbatim
//   (the plugin repo's page contract already guarantees site-renderability:
//   links are absolute https or in-page anchors, no raw HTML outside the
//   SPDX comment, no images)
// - docs/plugins/index.md                   generated per-plugin index
// - .vitepress/generated/plugin-docs-sidebar.json
//
// If the platform documentation was synced first (deploys do), the platform
// step-handler reference page is cross-linked: every handler id it names
// that has a plugin page becomes a link to that page, and the index links
// back to the reference.
//
// Every run first deletes the trees it generates, so pages removed upstream
// cannot survive a re-sync in a persistent worktree.

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const args = process.argv.slice(2);
const allowMissing = args.includes("--allow-missing");
const pathArg = args.find((arg) => !arg.startsWith("--"));
const pluginsRoot = pathArg ? resolve(pathArg) : null;

const targetDocs = join(siteRoot, "docs", "plugins");
const sidebarPath = join(siteRoot, ".vitepress", "generated", "plugin-docs-sidebar.json");
rmSync(targetDocs, { recursive: true, force: true });
rmSync(sidebarPath, { force: true });

const pluginsDir = pluginsRoot ? join(pluginsRoot, "plugins") : null;
if (!pluginsDir || !existsSync(pluginsDir)) {
  if (allowMissing) {
    console.warn("no plugins checkout with a plugins/ tree - skipping the plugin docs sync");
    process.exit(0);
  }
  console.error(
    "usage: node scripts/sync-plugin-docs.mjs <path-to-plugins-checkout> [--allow-missing]",
  );
  process.exit(2);
}

function titleOf(markdown, fallback) {
  const match = markdown.match(/^# (.+)$/m);
  return match ? match[1].trim() : fallback;
}

// --- Discover and copy pages -------------------------------------------------

const plugins = [];
for (const pluginEntry of readdirSync(pluginsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .sort((a, b) => a.name.localeCompare(b.name))) {
  const pluginDir = join(pluginsDir, pluginEntry.name);
  const srcDir = join(pluginDir, "src");
  if (!existsSync(srcDir)) continue;

  const pages = [];
  for (const packageEntry of readdirSync(srcDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))) {
    const docsDir = join(srcDir, packageEntry.name, "docs");
    if (!existsSync(docsDir)) continue;
    for (const file of readdirSync(docsDir).sort()) {
      if (!file.endsWith(".md")) continue;
      const markdown = readFileSync(join(docsDir, file), "utf8");
      const handlerId = file.replace(/\.md$/, "");
      const outPath = join(targetDocs, pluginEntry.name, file);
      mkdirSync(join(targetDocs, pluginEntry.name), { recursive: true });
      writeFileSync(outPath, markdown);
      pages.push({ handlerId, file, title: titleOf(markdown, handlerId) });
    }
  }
  if (pages.length === 0) continue;

  const readmePath = join(pluginDir, "README.md");
  const distribution = existsSync(readmePath)
    ? titleOf(readFileSync(readmePath, "utf8"), pluginEntry.name)
    : pluginEntry.name;
  plugins.push({ dir: pluginEntry.name, distribution, pages });
}

if (plugins.length === 0) {
  if (allowMissing) {
    console.warn("plugins checkout carries no documentation pages - skipping the plugin docs sync");
    process.exit(0);
  }
  console.error(`${pluginsDir} contains no plugin documentation pages`);
  process.exit(2);
}

const pageCount = plugins.reduce((sum, plugin) => sum + plugin.pages.length, 0);
console.log(`synced ${pageCount} plugin pages across ${plugins.length} plugins into docs/plugins/`);

// --- Index page --------------------------------------------------------------

const platformSynced = existsSync(join(siteRoot, "docs", "platform"));
const indexLines = [
  "# Step Plugin Documentation",
  "",
  "Every step plugin documents its own handlers: these pages ship inside the",
  "plugin wheels, install and upgrade with the code they describe, and render",
  "inside the app (the flow editor's Handler tab and the Help drawer's",
  "Installed Handlers topic). This section publishes the same pages straight",
  "from the plugin repository.",
  "",
];
if (platformSynced) {
  indexLines.push(
    "The [step handler reference](/docs/platform/reference/step-handlers) in",
    "the platform documentation catalogs the handler set a platform release",
    "pins; the pages here are the full per-handler documentation.",
    "",
  );
}
for (const plugin of plugins) {
  indexLines.push(`## ${plugin.distribution}`, "");
  for (const page of plugin.pages) {
    indexLines.push(
      // Explicit .html for the same dotted-id reason as the sidebar links.
      `- [${page.title}](/docs/plugins/${plugin.dir}/${page.handlerId}.html) - \`${page.handlerId}\``,
    );
  }
  indexLines.push("");
}
writeFileSync(join(targetDocs, "index.md"), `${indexLines.join("\n")}\n`);

// --- Sidebar -----------------------------------------------------------------

const sections = [
  { text: "Step Plugins", items: [{ text: "Overview", link: "/docs/plugins/" }] },
  ...plugins.map((plugin) => ({
    text: plugin.distribution,
    collapsed: true,
    items: plugin.pages.map((page) => ({
      // Handler ids contain dots, so an extensionless URL would read as
      // having a bogus extension; link the built .html file explicitly.
      text: page.title,
      link: `/docs/plugins/${plugin.dir}/${page.handlerId}.html`,
    })),
  })),
];
mkdirSync(join(siteRoot, ".vitepress", "generated"), { recursive: true });
writeFileSync(sidebarPath, `${JSON.stringify(sections, null, 2)}\n`);
console.log(`sidebar: ${sections.length} sections`);

// --- Cross-link the platform reference page ----------------------------------

const referencePath = join(siteRoot, "docs", "platform", "reference", "step-handlers.md");
if (existsSync(referencePath)) {
  const linkFor = new Map();
  for (const plugin of plugins) {
    for (const page of plugin.pages) {
      linkFor.set(page.handlerId, `/docs/plugins/${plugin.dir}/${page.handlerId}.html`);
    }
  }
  let reference = readFileSync(referencePath, "utf8");
  let linked = 0;
    const escapedHandlerId = handlerId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(?<!\\[)\`${escapedHandlerId}\``, "g");
      linked += 1;
      return `[\`${handlerId}\`](${link})`;
    });
  }
  writeFileSync(referencePath, reference);
  console.log(`cross-linked ${linked} handler id mentions in the platform reference`);
}
