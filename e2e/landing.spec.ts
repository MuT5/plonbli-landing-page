import { expect, test } from "@playwright/test";

test("renders the pre-launch story and waitlist", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Lokalne produkty bliżej Ciebie" })).toBeVisible();
  await expect(page.locator('[data-cta-id="hero-waitlist"]')).toBeVisible();
  await expect(page.locator('a[href*="plonbliapp.vercel.app"]')).toHaveCount(0);
  await expect(page.locator("html")).toHaveAttribute("lang", "pl-PL");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://plonbli.pl/");
  expect(consoleErrors).toEqual([]);
});

test("does not overflow horizontally on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});

test("opens and closes the mobile navigation", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  await page.getByRole("button", { name: "Otwórz menu" }).click();
  await expect(page.getByRole("navigation", { name: "Nawigacja mobilna" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Nawigacja mobilna" })).toHaveCount(0);
});

test("keeps dark sections readable and the honeypot hidden", async ({ page }) => {
  await page.goto("/");

  const colors = await page.locator("#lista-oczekujacych h2 + p, #dla-gospodarstw h2 + p").evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).color),
  );

  expect(colors).toEqual(["rgba(255, 248, 231, 0.8)", "rgba(255, 248, 231, 0.8)"]);
  await expect(page.locator('input[name="company"]')).toBeHidden();
});

test("uses three steps, one font family and a raster harvest accent", async ({ page }) => {
  await page.goto("/");

  const section = page.locator("#jak-to-dziala");
  await expect(section.locator(".harvest-chapter")).toHaveCount(3);
  await expect(section.getByText("04", { exact: true })).toHaveCount(0);
  await expect(section.locator(".harvest-growth svg")).toHaveCount(0);

  const raster = page.getByTestId("harvest-raster");
  await expect(raster).toHaveAttribute("alt", "");
  await expect(raster).toHaveAttribute("src", "/landing/growing-harvest.webp");

  const imageState = await raster.evaluate((element: HTMLImageElement) => ({
    complete: element.complete,
    naturalWidth: element.naturalWidth,
    naturalHeight: element.naturalHeight,
  }));
  expect(imageState).toEqual({ complete: true, naturalWidth: 740, naturalHeight: 1824 });

  const fonts = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    heading: getComputedStyle(document.querySelector("h1")!).fontFamily,
  }));
  expect(fonts.body).toContain("Lora");
  expect(fonts.heading).toContain("Lora");
});
