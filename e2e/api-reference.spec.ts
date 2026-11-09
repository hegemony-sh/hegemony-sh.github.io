import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { expect, test } from "@playwright/test";

// Exercise the deploy-time generator without needing the private platform checkout
// or replacing the site's real synced documentation with fixture data.
test("generated API reference renders its contract @smoke", async ({ page }) => {
  const root = mkdtempSync(join(tmpdir(), "hegemony-api-reference-"));
  try {
    mkdirSync(join(root, "scripts"));
    cpSync("scripts/sync-platform-docs.mjs", join(root, "scripts/sync-platform-docs.mjs"));
    mkdirSync(join(root, "node_modules"));
    symlinkSync(resolve("node_modules/redoc"), join(root, "node_modules/redoc"), "junction");
    const platform = join(root, "platform");
    mkdirSync(join(platform, "docs"), { recursive: true });
    writeFileSync(join(platform, "docs/index.md"), "# API smoke fixture\n");
    mkdirSync(join(platform, "apps/api"), { recursive: true });
    writeFileSync(
      join(platform, "apps/api/openapi.json"),
      JSON.stringify({
        openapi: "3.0.3",
        info: { title: "Hegemony API smoke contract", version: "1.0.0" },
        paths: {
          "/health": {
            get: {
              summary: "Check API health",
              operationId: "checkHealth",
              responses: { "200": { description: "Healthy" } },
            },
          },
        },
      }),
    );
    execFileSync(process.execPath, [join(root, "scripts/sync-platform-docs.mjs"), platform]);

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
    await expect(page.getByRole("heading", { name: "Hegemony API smoke contract" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Check API health" })).toBeVisible();
    expect(errors).toEqual([]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
