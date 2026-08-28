// SPDX-FileCopyrightText: 2025-2026 Jakub Trávník <jakub.travnik@gmail.com>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// Sync the platform repository's documentation into this site (Pillar 4 of
// the platform's documentation-system design record: the docs' source of
// truth stays in the platform repo, changed atomically with code; the site
// pulls them at build time).
//
// Usage: node scripts/sync-platform-docs.mjs <path-to-platform-checkout> [--allow-missing-docs]
//
// --allow-missing-docs turns "the checkout has no docs/ tree" from an error
// into a clean skip (used by the deploy workflow while the public platform
// repository does not carry the documentation yet, so the rest of the site
// still deploys - the pages that link into the synced trees render those
// links only when the artifacts exist).
//
// PLATFORM_REPO (owner/name) and PLATFORM_REPO_REF (branch) override where
// rewritten out-of-docs links point, for as long as the platform repository
// lives somewhere other than its public home. Links into a private
// repository 404 for site visitors regardless of what they point at.
//
// What it produces (all build-time artifacts, none committed):
// - docs/platform/**            every docs/**/*.md page, links adjusted,
//                               plus docs/assets/** copied verbatim so
//                               in-docs images (generated screenshots)
//                               serve from the site itself
// - .vitepress/generated/platform-sidebar.json   the sidebar tree
// - public/api/openapi.json     the committed OpenAPI spec
// - public/api/index.html + redoc.standalone.js  the API reference (ReDoc)
//
// Every run first deletes the trees it generates, so pages deleted or
// renamed upstream (or a spec that is no longer there) cannot survive from
// an earlier sync in a persistent worktree.
//
// Link handling: a relative link that resolves to another page inside the
// platform's docs/ tree is kept relative (VitePress resolves .md links and
// the internal link check verifies them in the built HTML). Anything else -
// repo files outside docs/, non-Markdown targets - becomes an absolute
// GitHub URL (raw for images, blob for the rest), because the site has
// nothing local to serve for it. Fenced code blocks and inline code spans
// are left untouched, and reference-style link definitions ([label]: target)
// are rewritten by the same rules as inline links.

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const args = process.argv.slice(2);
const allowMissingDocs = args.includes("--allow-missing-docs");
const pathArg = args.find((arg) => !arg.startsWith("--"));
const platformRoot = pathArg ? resolve(pathArg) : null;
const platformRepo = process.env.PLATFORM_REPO || "hegemony-sh/hegemony";
const platformRef = process.env.PLATFORM_REPO_REF || "develop";
const repoUrl = `https://github.com/${platformRepo}`;
const rawUrl = `https://raw.githubusercontent.com/${platformRepo}/${platformRef}`;

if (!platformRoot || !existsSync(platformRoot)) {
  console.error(
    "usage: node scripts/sync-platform-docs.mjs <path-to-platform-checkout> [--allow-missing-docs]",
  );
  process.exit(2);
}

const hasDocs = existsSync(join(platformRoot, "docs"));
if (!hasDocs && !allowMissingDocs) {
  console.error(`${platformRoot} has no docs/ directory`);
  console.error("(pass --allow-missing-docs to skip the sync instead of failing)");
  process.exit(2);
}

// From here on the run succeeds, so the generated trees must end up exactly
// mirroring the source: drop whatever a previous sync left behind.
const targetDocs = join(siteRoot, "docs", "platform");
const apiDir = join(siteRoot, "public", "api");
const generatedDir = join(siteRoot, ".vitepress", "generated");
const sidebarPath = join(generatedDir, "platform-sidebar.json");
rmSync(targetDocs, { recursive: true, force: true });
rmSync(apiDir, { recursive: true, force: true });
rmSync(sidebarPath, { force: true });

if (!hasDocs) {
  console.warn(`${platformRoot} has no docs/ directory - skipping the platform docs sync`);
  console.warn("(the site builds without the platform documentation and API reference)");
  process.exit(0);
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
// [label]: target - on its own line, optionally with the target in <>.
const definitionPattern = /(^|\n)([ \t]{0,3}\[[^\]\n]+\]:[ \t]*)(<[^<>\n]*>|\S+)/g;
// A CommonMark inline code span: a backtick run not part of a longer run,
// closed by the next run of the same length (can cross line breaks).
const codeSpanPattern = /(?<!`)(`+)(?!`)([\s\S]*?[^`])\1(?!`)/g;
const fenceOpenPattern = /^ {0,3}(`{3,}|~{3,})/;
const fenceClosePattern = /^ {0,3}(`{3,}|~{3,})[ \t]*$/;
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
    // In-docs images travel with the pages (docs/assets/** is copied below),
    // so their relative links keep working; only out-of-docs images fall
    // back to raw GitHub URLs.
    return inDocs ? null : `${rawUrl}/${resolved}`;
  }
  const suffix = fragment ? `#${fragment}` : "";
  return `${repoUrl}/blob/${platformRef}/${resolved}${suffix}`;
}

function codeSpanRanges(text) {
  return [...text.matchAll(codeSpanPattern)].map((match) => [
    match.index,
    match.index + match[0].length,
  ]);
}

function intersectsCode(ranges, start, end) {
  return ranges.some(([from, to]) => start < to && from < end);
}

/** Rewrite link targets in prose, leaving inline code spans untouched. */
function transformText(pageRel, text) {
  // Reference-style definitions first, inline links second; each pass finds
  // the code spans of its own input (a rewritten URL never adds backticks).
  let ranges = codeSpanRanges(text);
  const withDefinitions = text.replace(
    definitionPattern,
    (whole, lineBreak, prefix, target, offset) => {
      const targetStart = offset + lineBreak.length + prefix.length;
      if (intersectsCode(ranges, targetStart, targetStart + target.length)) {
        return whole;
      }
      const bare = target.startsWith("<") && target.endsWith(">") ? target.slice(1, -1) : target;
      const rewritten = rewriteTarget(pageRel, bare, false);
      return rewritten === null ? whole : `${lineBreak}${prefix}${rewritten}`;
    },
  );

  ranges = codeSpanRanges(withDefinitions);
  return withDefinitions.replace(linkPattern, (whole, bang, label, target, title, offset) => {
    const targetStart = offset + bang.length + label.length + 3; // past "![label]("
    if (
      intersectsCode(ranges, offset, offset + 1) ||
      intersectsCode(ranges, targetStart, targetStart + target.length)
    ) {
      return whole; // the "link" sits inside inline code
    }
    const rewritten = rewriteTarget(pageRel, target, bang === "!");
    return rewritten === null ? whole : `${bang}[${label}](${rewritten}${title})`;
  });
}

function transformPage(pageRel, markdown) {
  const out = [];
  let prose = [];
  let fence = null; // the opening fence while inside a fenced code block
  const flush = () => {
    if (prose.length > 0) {
      out.push(transformText(pageRel, prose.join("\n")));
      prose = [];
    }
  };
  for (const line of markdown.split("\n")) {
    if (fence) {
      out.push(line);
      const close = line.match(fenceClosePattern);
      if (close && close[1][0] === fence[0] && close[1].length >= fence.length) {
        fence = null;
      }
      continue;
    }
    const open = line.match(fenceOpenPattern);
    if (open) {
      flush();
      out.push(line);
      fence = open[1];
      continue;
    }
    prose.push(line);
  }
  flush();
  return out.join("\n");
}

// --- Pages -------------------------------------------------------------------

const sourceDocs = join(platformRoot, "docs");
const pages = [];
for (const pageRel of walkMarkdown(sourceDocs)) {
  const markdown = readFileSync(join(sourceDocs, pageRel), "utf8");
  const outPath = join(targetDocs, pageRel);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, transformPage(pageRel, markdown));
  pages.push({ rel: pageRel, title: titleOf(markdown, pageRel) });
}
const sourceAssets = join(sourceDocs, "assets");
if (existsSync(sourceAssets)) {
  cpSync(sourceAssets, join(targetDocs, "assets"), { recursive: true });
}
console.log(`synced ${pages.length} pages into docs/platform/`);

// --- Sidebar -----------------------------------------------------------------

/** /docs/platform/ URL for a page, with index pages folded into their directory. */
function pageLink(pageRel) {
  return `/docs/platform/${pageRel.replace(/\.md$/, "").replace(/(^|\/)index$/, "$1")}`;
}

function sidebarItems(sectionPages) {
  return sectionPages
    .map((page) => ({ text: page.title, link: pageLink(page.rel) }))
    .toSorted((a, b) => a.text.localeCompare(b.text));
}

const sections = [];
for (const [dir, label] of sectionOrder) {
  const items = sidebarItems(
    pages.filter((page) => {
      const top = page.rel.includes("/") ? page.rel.split("/")[0] : "";
      return top === dir;
    }),
  );
  if (items.length > 0) {
    sections.push({ text: label, collapsed: dir !== "", items });
  }
}
const extras = pages.filter((page) => {
  const top = page.rel.includes("/") ? page.rel.split("/")[0] : "";
  return !sectionOrder.some(([dir]) => dir === top);
});
if (extras.length > 0) {
  sections.push({ text: "More", collapsed: true, items: sidebarItems(extras) });
}
mkdirSync(generatedDir, { recursive: true });
writeFileSync(sidebarPath, `${JSON.stringify(sections, null, 2)}\n`);
console.log(`sidebar: ${sections.length} sections`);

// --- API reference (ReDoc over the committed spec) ---------------------------

const spec = join(platformRoot, "apps", "api", "openapi.json");
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
