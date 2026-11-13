import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { expect, test } from "@playwright/test";

const ok = { "200": { description: "OK" } };

// Shaped like the platform's contract: a placeholder version, a relative and an
// absolute server, grouped tags, and one operation for the platform's own use.
const contract = {
  openapi: "3.0.3",
  info: { title: "Hegemony API smoke contract", version: "0.0.0", description: "Intro text." },
  servers: [
    { url: "/api", description: "This instance." },
    { url: "https://{host}/api", variables: { host: { default: "hegemony.example.com" } } },
  ],
  tags: [
    { name: "health", "x-displayName": "Health probes" },
    { name: "worker", "x-displayName": "Worker callbacks" },
  ],
  "x-tagGroups": [
    { name: "Administration", tags: ["health"] },
    { name: "Internal", tags: ["worker"] },
  ],
  // Inherited by operations that declare no security of their own.
  security: [{ HTTPBearer: [] }],
  paths: {
    "/health": {
      get: {
        summary: "Check API health",
        operationId: "checkHealth",
        tags: ["health"],
        security: [{ OAuth2: [] }],
        responses: ok,
      },
      post: {
        summary: "Report worker health",
        operationId: "reportWorkerHealth",
        tags: ["worker"],
        security: [{ InternalToken: [] }],
        "x-internal": true,
        responses: ok,
      },
    },
    "/version": {
      get: {
        summary: "Read the version",
        operationId: "readVersion",
        tags: ["health"],
        responses: ok,
      },
    },
    "/internal/steps": {
      post: {
        summary: "Record a step result",
        operationId: "recordStep",
        tags: ["worker"],
        security: [{ InternalToken: [] }],
        "x-internal": true,
        responses: ok,
      },
    },
  },
  components: {
    securitySchemes: {
      HTTPBearer: { type: "http", scheme: "bearer" },
      OAuth2: { type: "http", scheme: "bearer", description: "Stand-in for the sign-in flow." },
      InternalToken: { type: "apiKey", in: "header", name: "X-Internal-Token" },
    },
  },
};

/** Run the deploy-time generator on a fixture checkout; returns the site root. */
function syncFixture(root: string, spec: unknown): string {
  mkdirSync(join(root, "scripts"));
  cpSync("scripts/sync-platform-docs.mjs", join(root, "scripts/sync-platform-docs.mjs"));
  mkdirSync(join(root, "node_modules"));
  symlinkSync(resolve("node_modules/redoc"), join(root, "node_modules/redoc"), "junction");
  const platform = join(root, "platform");
  mkdirSync(join(platform, "docs"), { recursive: true });
  writeFileSync(join(platform, "docs/index.md"), "# API smoke fixture\n");
  mkdirSync(join(platform, "apps/api"), { recursive: true });
  writeFileSync(join(platform, "apps/api/openapi.json"), JSON.stringify(spec));
  execFileSync(process.execPath, [join(root, "scripts/sync-platform-docs.mjs"), platform], {
    stdio: "pipe",
  });
  return root;
}

// Exercise the deploy-time generator without needing the private platform checkout
// or replacing the site's real synced documentation with fixture data.
test("generated API reference renders the public contract @smoke", async ({ page }) => {
  const root = mkdtempSync(join(tmpdir(), "hegemony-api-reference-"));
  try {
    syncFixture(root, contract);

    const published = JSON.parse(readFileSync(join(root, "public/api/openapi.json"), "utf8"));
    expect(Object.keys(published.paths)).toEqual(["/health", "/version"]);
    expect(Object.keys(published.paths["/health"])).toEqual(["get"]);
    expect(published.tags.map((tag: { name: string }) => tag.name)).toEqual(["health"]);
    expect(published["x-tagGroups"]).toEqual([{ name: "Administration", tags: ["health"] }]);
    // HTTPBearer is used only through the top-level requirement, OAuth2 by an operation.
    expect(Object.keys(published.components.securitySchemes)).toEqual(["HTTPBearer", "OAuth2"]);
    expect(published.servers.map((server: { url: string }) => server.url)).toEqual([
      "https://{host}/api",
    ]);
    expect(published.info.version).toBe("development build");
    expect(published.info.description).toContain("Intro text.");

    // Serve exactly the generated files at their public URLs. A classic-script
    // regression must fail in the browser, even though all three URLs return 200.
    for (const [url, file, contentType] of [
      ["/api/", "index.html", "text/html"],
      ["/api/openapi.json", "openapi.json", "application/json"],
      ["/api/redoc.standalone.js", "redoc.standalone.js", "text/javascript"],
    ]) {
      await page.route(`**${url}`, (route) =>
        route.fulfill({ path: join(root, "public/api", file), contentType }),
      );
    }
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/api/");
    await expect(
      page.getByRole("heading", { name: "Hegemony API smoke contract (development build)" }),
    ).toBeVisible();
    // The group and the tag's display name, then the operation inside the tag.
    await expect(page.getByText("Administration")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Health probes" })).toBeVisible();
    await page.getByRole("button", { name: "+ Show", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Check API health" })).toBeVisible();
    await expect(page.getByText("Report worker health")).toHaveCount(0);
    await expect(page.getByText("Worker callbacks")).toHaveCount(0);
    // The site is dark by default, and so is the reference.
    await expect(page.locator(".redoc.dark").first()).toBeVisible();
    expect(errors).toEqual([]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the sync refuses to publish an unmarked internal path @smoke", () => {
  const root = mkdtempSync(join(tmpdir(), "hegemony-api-reference-"));
  try {
    const leaky = structuredClone(contract) as typeof contract;
    delete (leaky.paths["/internal/steps"].post as { "x-internal"?: boolean })["x-internal"];
    expect(() => syncFixture(root, leaky)).toThrow(/internal/);
    expect(existsSync(join(root, "public/api/openapi.json"))).toBe(false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
