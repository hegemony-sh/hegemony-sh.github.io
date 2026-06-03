import { access, readdir, readFile, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const distDir = join(repoRoot, ".vitepress", "dist");
const attributePattern = /\b(?:href|src)=(["'])(.*?)\1/g;
const idPattern = /\bid=(["'])(.*?)\1/g;
const skippedProtocols = ["http:", "https:", "mailto:", "tel:", "data:", "javascript:"];

async function walkHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkHtmlFiles(entryPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(entryPath);
    }
  }

  return files;
}

function isExternalReference(reference) {
  return (
    skippedProtocols.some((protocol) => reference.startsWith(protocol)) ||
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

  for (const candidate of candidates) {
    if (await isFile(candidate)) {
      return candidate;
    }
  }

  return null;
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

  const htmlFiles = await walkHtmlFiles(distDir);
  const htmlCache = new Map();
  const errors = [];
  let checkedReferences = 0;

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8");
    htmlCache.set(htmlFile, html);

    for (const match of html.matchAll(attributePattern)) {
      const reference = match[2];

      if (!reference || isExternalReference(reference)) {
        continue;
      }

      const { pathname, fragment } = splitReference(reference);
      const normalizedFragment = normalizeFragment(fragment);
      checkedReferences += 1;

      let targetFile;
      try {
        targetFile = await resolveBuiltTarget(htmlFile, pathname);
      } catch (error) {
        errors.push(`${relative(distDir, htmlFile)} -> ${reference} (${error.message})`);
        continue;
      }

      if (!targetFile) {
        errors.push(`${relative(distDir, htmlFile)} -> ${reference} (missing target)`);
        continue;
      }

      if (normalizedFragment) {
        const targetHtml =
          htmlCache.get(targetFile) ?? (await readFile(targetFile, "utf8").catch(() => null));

        if (!targetHtml) {
          errors.push(
            `${relative(distDir, htmlFile)} -> ${reference} (anchor target is not an HTML file)`,
          );
          continue;
        }

        htmlCache.set(targetFile, targetHtml);

        if (!extractIds(targetHtml).has(normalizedFragment)) {
          errors.push(
            `${relative(distDir, htmlFile)} -> ${reference} (missing anchor #${normalizedFragment})`,
          );
        }
      }
    }
  }

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
