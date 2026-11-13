import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const STORAGE_KEY = "hegemony:preferred-language";

function mockCzechBrowser(page: Page) {
  return page.addInitScript(() => {
    Object.defineProperty(window.navigator, "languages", {
      configurable: true,
      get: () => ["cs-CZ", "en-US"],
    });
    Object.defineProperty(window.navigator, "language", {
      configurable: true,
      get: () => "cs-CZ",
    });
  });
}

test.describe("Website smoke @smoke", () => {
  test("homepage loads with main calls to action", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Docs" })).toBeVisible();
    await expect(page.getByRole("link", { name: "View on GitHub" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Run the full demo locally" })).toBeVisible();
    await expect(page.getByText("Open source project. Sponsored by Rexonix.")).toBeVisible();
  });

  test("preferred-language banner appears for Czech browsers on the English homepage", async ({
    page,
  }) => {
    await mockCzechBrowser(page);

    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Preferujete češtinu?" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Přejít do češtiny" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Zůstat v angličtině" })).toBeVisible();
  });

  test("staying in English stores the preference and suppresses the banner on reload", async ({
    page,
  }) => {
    await mockCzechBrowser(page);

    await page.goto("/");
    await page.getByRole("button", { name: "Zůstat v angličtině" }).click();

    await expect(page.getByRole("heading", { name: "Preferujete češtinu?" })).toHaveCount(0);
    expect(
      await page.evaluate((storageKey) => window.localStorage.getItem(storageKey), STORAGE_KEY),
    ).toBe("en");

    await page.reload();
    await expect(page.getByRole("heading", { name: "Preferujete češtinu?" })).toHaveCount(0);
  });

  test("Czech URLs into English-only docs explain themselves", async ({ page }) => {
    // The language switcher offers Czech on every page, but the platform
    // docs exist only in English - the not-found view must say so in Czech
    // and hand over the English link instead of a bare 404.
    await page.goto("/cs/docs/platform/");

    await expect(
      page.getByRole("heading", { name: "Tato stránka je k dispozici pouze v angličtině" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Otevřít anglickou verzi" })).toHaveAttribute(
      "href",
      "/docs/platform/",
    );
  });

  test("screenshots open in a popup and close again", async ({ page }) => {
    await page.goto("/");

    const shot = page.locator(".shot a").first();
    await shot.scrollIntoViewIfNeeded();
    await shot.click();

    const dialog = page.locator("dialog.image-lightbox");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("img")).toHaveAttribute("src", /\/screenshots\/.+\.webp$/);
    // The page did not navigate to the image.
    await expect(page).toHaveURL(/\/$/);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await shot.click();
    await expect(dialog).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
    await expect(dialog).toBeHidden();
  });

  test("stored Czech preference redirects the visitor to the Czech locale", async ({ page }) => {
    await page.addInitScript((storageKey) => {
      window.localStorage.setItem(storageKey, "cs");
    }, STORAGE_KEY);

    await page.goto("/");

    await page.waitForURL("**/cs/");
    await expect(page.getByRole("link", { name: "Dokumentace" })).toBeVisible();
    await expect(page.getByText("Deterministické workflow pro infrastrukturu")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Spusťte si celé demo lokálně" })).toBeVisible();
  });
});
