import { access, readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const distDir = join(repoRoot, ".vitepress", "dist");
const attributePattern = /\b(?:href|src)=(["'])(.*?)\1/g;
const idPattern = /\bid=(["'])(.*?)\1/g;
const skippedProtocols = ["http:", "https:", "mailto:", "tel:", "data:", "javascript:"];
// The language switcher fabricates /cs/ URLs for every page, but the synced
// platform documentation is English-only by policy (see the platform's
// documentation-system design record) - those alternates 404 by design.
const skippedPathPrefixes = ["/cs/docs/platform/"];
// The platform documentation and the API reference exist only when
// scripts/sync-platform-docs.mjs ran before the build (deploys always sync;
// pull request builds cannot, because the platform checkout needs
// credentials that fork PRs do not get). An unsynced build intentionally
// lacks those trees, so links into them are skipped rather than failed.
const syncOnlyPathPrefixes = ["/docs/platform/", "/api/"];

async function walkHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        return walkHtmlFiles(entryPath);
      }

      return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
    }),
  );

  return files.flat();
}

function isExternalReference(reference) {
  return (
    skippedProtocols.some((protocol) => reference.startsWith(protocol)) ||
    skippedPathPrefixes.some((prefix) => reference.startsWith(prefix)) ||
    reference.startsWith("//")
  );
}

function splitReference(reference) {
  const [pathAndQuery, fragment = ""] = reference.split("#");
  const [pathname] = pathAndQuery.split("?");
  return { pathname, fragment };
}

function insideDist(candidate) {
  const rel = relative(distDir, candidate);
  return rel === "" || (!rel.startsWith("..") && !rel.startsWith("../") && rel !== "..");
}

async function isFile(filePath) {
  try {
    const fileStat = await stat(filePath);
    return fileStat.isFile();
  } catch {
    return false;
  }
}

async function resolveBuiltTarget(sourceFile, pathname) {
  const baseTarget =
    pathname === ""
      ? sourceFile
      : pathname.startsWith("/")
        ? resolve(distDir, `.${pathname}`)
        : resolve(dirname(sourceFile), pathname);

  if (!insideDist(baseTarget)) {
    throw new Error(`resolves outside of build output: ${pathname}`);
  }

  if (pathname === "") {
    return sourceFile;
  }

  const candidates = [baseTarget];
  if (!extname(baseTarget)) {
    candidates.push(`${baseTarget}.html`, join(baseTarget, "index.html"));
  }

  const existingCandidates = await Promise.all(
    candidates.map(async (candidate) => ((await isFile(candidate)) ? candidate : null)),
  );

  return existingCandidates.find((candidate) => candidate !== null) ?? null;
}

function extractIds(html) {
  const ids = new Set();

  for (const match of html.matchAll(idPattern)) {
    ids.add(match[2]);
  }

  return ids;
}

function normalizeFragment(fragment) {
  if (!fragment) return "";

  try {
    return decodeURIComponent(fragment);
  } catch {
    return fragment;
  }
}

async function main() {
  try {
    await access(join(distDir, "index.html"));
  } catch {
    throw new Error("Build output not found. Run `npm run docs:build` before link checking.");
  }

  try {
    await access(join(distDir, "docs", "platform", "index.html"));
  } catch {
    skippedPathPrefixes.push(...syncOnlyPathPrefixes);
    console.log(
      "Platform documentation not synced into this build - skipping references into " +
        `${syncOnlyPathPrefixes.join(", ")} (deploys sync and check them).`,
    );
  }

  const htmlFiles = await walkHtmlFiles(distDir);
  const htmlEntries = await Promise.all(
    htmlFiles.map(async (htmlFile) => [htmlFile, await readFile(htmlFile, "utf8")]),
  );
  const htmlCache = new Map(htmlEntries);
  const results = await Promise.all(
    htmlEntries.flatMap(([htmlFile, html]) =>
      [...html.matchAll(attributePattern)].map(async (match) => {
        const reference = match[2];

        if (!reference || isExternalReference(reference)) {
          return null;
        }

        const { pathname, fragment } = splitReference(reference);
        const normalizedFragment = normalizeFragment(fragment);

        let targetFile;
        try {
          targetFile = await resolveBuiltTarget(htmlFile, pathname);
        } catch (error) {
          return `${relative(distDir, htmlFile)} -> ${reference} (${error.message})`;
        }

        if (!targetFile) {
          return `${relative(distDir, htmlFile)} -> ${reference} (missing target)`;
        }

        if (normalizedFragment) {
          const targetHtml =
            htmlCache.get(targetFile) ?? (await readFile(targetFile, "utf8").catch(() => null));

          if (!targetHtml) {
            return `${relative(distDir, htmlFile)} -> ${reference} (anchor target is not an HTML file)`;
          }

          htmlCache.set(targetFile, targetHtml);

          if (!extractIds(targetHtml).has(normalizedFragment)) {
            return `${relative(distDir, htmlFile)} -> ${reference} (missing anchor #${normalizedFragment})`;
          }
        }

        return null;
      }),
    ),
  );
  const errors = results.filter((result) => result !== null);
  const checkedReferences = results.length;

  if (errors.length > 0) {
    console.error("Internal link check failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `Checked ${checkedReferences} internal references across ${htmlFiles.length} built HTML files with no broken links.`,
  );
}

await main();
