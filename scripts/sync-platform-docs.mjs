// SPDX-FileCopyrightText: 2025-2026 Jakub Trávník <jakub.travnik@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Sync the platform repository's documentation into this site (Pillar 4 of
// the platform's documentation-system design record: the docs' source of
// truth stays in the platform repo, changed atomically with code; the site
// pulls them at build time).
//
// Usage: node scripts/sync-platform-docs.mjs <path-to-platform-checkout>
//
// What it produces (all build-time artifacts, none committed):
// - docs/platform/**            every docs/**/*.md page, links adjusted
// - .vitepress/generated/platform-sidebar.json   the sidebar tree
// - public/api/openapi.json     the committed OpenAPI spec
// - public/api/index.html + redoc.standalone.js  the API reference (ReDoc)
//
// Link handling: a relative link that resolves to another page inside the
// platform's docs/ tree is kept relative (VitePress resolves .md links and
// the internal link check verifies them in the built HTML). Anything else -
// repo files outside docs/, non-Markdown targets - becomes an absolute
// GitHub URL (raw for images, blob for the rest), because the site has
// nothing local to serve for it.

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const platformRoot = process.argv[2] ? resolve(process.argv[2]) : null;
const repoUrl = "https://github.com/hegemony-sh/Hegemony";
const rawUrl = "https://raw.githubusercontent.com/hegemony-sh/Hegemony/main";

if (!platformRoot || !existsSync(join(platformRoot, "docs"))) {
  console.error("usage: node scripts/sync-platform-docs.mjs <path-to-platform-checkout>");
  console.error("(the checkout must contain a docs/ directory)");
  process.exit(2);
}

const sectionOrder = [
  ["", "Overview"],
  ["guides", "Guides"],
  ["features", "Features"],
  ["reference", "Reference"],
  ["architecture", "Architecture"],
  ["operations", "Operations"],
  ["development", "Development"],
];

const linkPattern = /(!?)\[([^\]]*)\]\(([^)\s]+)([^)]*)\)/g;
const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"]);

function* walkMarkdown(directory, prefix = "") {
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      yield* walkMarkdown(join(directory, entry.name), rel);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      yield rel;
    }
  }
}

function titleOf(markdown, fallback) {
  const match = markdown.match(/^# (.+)$/m);
  return match ? match[1].trim() : fallback;
}

/** Rewrite one link target from a page at docs/<pageRel>; null keeps it. */
function rewriteTarget(pageRel, target, isImage) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("#") || target.startsWith("//")) {
    return null; // absolute, mailto, in-page - leave alone
  }
  const [pathPart, fragment = ""] = target.split("#");
  const resolved = posix.normalize(posix.join("docs", posix.dirname(pageRel), pathPart));
  const inDocs = resolved.startsWith("docs/") && !resolved.includes("..");
  if (inDocs && resolved.endsWith(".md")) {
    return null; // page-to-page link, still valid after the copy
  }
  const extension = posix.extname(resolved).toLowerCase();
  if (isImage || imageExtensions.has(extension)) {
    return `${rawUrl}/${resolved}`;
  }
  const suffix = fragment ? `#${fragment}` : "";
  return `${repoUrl}/blob/main/${resolved}${suffix}`;
}

function transformPage(pageRel, markdown) {
  return markdown.replace(linkPattern, (whole, bang, text, target, title) => {
    const rewritten = rewriteTarget(pageRel, target, bang === "!");
    return rewritten === null ? whole : `${bang}[${text}](${rewritten}${title})`;
  });
}

// --- Pages -------------------------------------------------------------------

const sourceDocs = join(platformRoot, "docs");
const targetDocs = join(siteRoot, "docs", "platform");
const pages = [];
for (const pageRel of walkMarkdown(sourceDocs)) {
  const markdown = readFileSync(join(sourceDocs, pageRel), "utf8");
  const outPath = join(targetDocs, pageRel);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, transformPage(pageRel, markdown));
  pages.push({ rel: pageRel, title: titleOf(markdown, pageRel) });
}
console.log(`synced ${pages.length} pages into docs/platform/`);

// --- Sidebar -----------------------------------------------------------------

const sections = [];
for (const [dir, label] of sectionOrder) {
  const items = pages
    .filter((page) => {
      const top = page.rel.includes("/") ? page.rel.split("/")[0] : "";
      return top === dir;
    })
    .map((page) => ({
      text: page.title,
      link: `/docs/platform/${page.rel.replace(/\.md$/, "").replace(/\/index$/, "/")}`,
    }))
    .toSorted((a, b) => a.text.localeCompare(b.text));
  if (items.length > 0) {
    sections.push({ text: label, collapsed: dir !== "", items });
  }
}
const extras = pages.filter((page) => {
  const top = page.rel.includes("/") ? page.rel.split("/")[0] : "";
  return !sectionOrder.some(([dir]) => dir === top);
});
if (extras.length > 0) {
  sections.push({
    text: "More",
    collapsed: true,
    items: extras
      .map((page) => ({
        text: page.title,
        link: `/docs/platform/${page.rel.replace(/\.md$/, "")}`,
      }))
      .toSorted((a, b) => a.text.localeCompare(b.text)),
  });
}
const generatedDir = join(siteRoot, ".vitepress", "generated");
mkdirSync(generatedDir, { recursive: true });
writeFileSync(
  join(generatedDir, "platform-sidebar.json"),
  `${JSON.stringify(sections, null, 2)}\n`,
);
console.log(`sidebar: ${sections.length} sections`);

// --- API reference (ReDoc over the committed spec) ---------------------------

const spec = join(platformRoot, "apps", "api", "openapi.json");
const apiDir = join(siteRoot, "public", "api");
if (existsSync(spec)) {
  mkdirSync(apiDir, { recursive: true });
  cpSync(spec, join(apiDir, "openapi.json"));
  const redocBundle = join(siteRoot, "node_modules", "redoc", "bundles", "redoc.standalone.js");
  if (existsSync(redocBundle)) {
    cpSync(redocBundle, join(apiDir, "redoc.standalone.js"));
    writeFileSync(
      join(apiDir, "index.html"),
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>API Reference - Hegemony.sh</title>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <style>body { margin: 0; padding: 0; }</style>
  </head>
  <body>
    <redoc spec-url="/api/openapi.json"></redoc>
    <script src="/api/redoc.standalone.js"></script>
  </body>
</html>
`,
    );
    console.log("api reference: openapi.json + ReDoc page");
  } else {
    console.warn("redoc bundle not found (npm ci first?) - skipping the API page");
  }
} else {
  console.warn("platform checkout has no apps/api/openapi.json - skipping the API page");
}
