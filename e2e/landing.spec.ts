import { expect, test, type Locator } from "@playwright/test";

async function clipTop(locator: Locator) {
  return locator.evaluate((element) => {
    const clipPath = getComputedStyle(element).clipPath;
    if (clipPath === "none") return 0;

    const match = clipPath.match(/inset\(\s*([-\d.]+)/);
    return match ? Number(match[1]) : Number.NaN;
  });
}

test("renders the pre-launch story and waitlist", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Dobre rzeczy rosną blisko" })).toBeVisible();
  await expect(page.locator('[data-cta-id="hero-waitlist"]')).toBeVisible();
  await expect(page.locator('a[href*="plonbliapp.vercel.app"]')).toHaveCount(0);
  await expect(page.locator("html")).toHaveAttribute("lang", "pl-PL");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://plonbli.pl/");
  expect(consoleErrors).toEqual([]);
});

test("keeps the mobile harvest contained without horizontal overflow", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });

  for (const width of [320, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");

    const scene = page.getByTestId("mobile-harvest-scene");
    const reveal = page.getByTestId("harvest-reveal-mobile");
    const raster = page.getByTestId("harvest-raster-mobile");

    await page.locator("#jak-to-dziala").scrollIntoViewIfNeeded();
    await expect(scene).toBeVisible();
    await expect(raster).toBeVisible();

    await page.evaluate(() => {
      const steps = document.querySelector<HTMLElement>("[data-testid='harvest-steps']")!;
      const top = steps.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + steps.offsetHeight - window.innerHeight * 0.3, behavior: "auto" });
    });

    await expect.poll(() => clipTop(reveal), { timeout: 4_000 }).toBeLessThanOrEqual(1);

    const layout = await page.evaluate(() => {
      const sceneElement = document.querySelector<HTMLElement>("[data-testid='mobile-harvest-scene']")!;
      const imageElement = document.querySelector<HTMLImageElement>("[data-testid='harvest-raster-mobile']")!;
      const sceneRect = sceneElement.getBoundingClientRect();
      const imageRect = imageElement.getBoundingClientRect();

      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        scene: { left: sceneRect.left, right: sceneRect.right, top: sceneRect.top, bottom: sceneRect.bottom },
        image: { left: imageRect.left, right: imageRect.right, top: imageRect.top, bottom: imageRect.bottom },
      };
    });

    expect.soft(layout.scrollWidth, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(layout.clientWidth);
    expect.soft(layout.scene.left).toBeGreaterThanOrEqual(0);
    expect.soft(layout.scene.right).toBeLessThanOrEqual(layout.clientWidth);
    expect.soft(layout.image.left).toBeGreaterThanOrEqual(layout.scene.left);
    expect.soft(layout.image.right).toBeLessThanOrEqual(layout.scene.right);
    expect.soft(layout.image.top).toBeGreaterThanOrEqual(layout.scene.top);
    expect.soft(layout.image.bottom).toBeLessThanOrEqual(layout.scene.bottom);
  }
});

test("crossfades a three-scene storyboard behind the journey", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const scenes = page.locator("[data-storyboard-scene]");
  await expect(scenes).toHaveCount(3);

  if (testInfo.project.name === "mobile") return;

  const opacity = async (id: string) =>
    Number(await page.locator(`[data-storyboard-scene="${id}"]`).evaluate((element) => getComputedStyle(element).opacity));

  expect(await opacity("discovery")).toBeGreaterThan(0.2);

  await page.evaluate(() => {
    const steps = document.querySelector<HTMLElement>("[data-testid='harvest-steps']")!;
    const top = steps.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + steps.offsetHeight * 0.5 - window.innerHeight * 0.58, behavior: "auto" });
  });
  await expect.poll(() => opacity("offer"), { timeout: 4_000 }).toBeGreaterThan(0.15);

  await page.evaluate(() => {
    const steps = document.querySelector<HTMLElement>("[data-testid='harvest-steps']")!;
    const top = steps.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + steps.offsetHeight - window.innerHeight * 0.3, behavior: "auto" });
  });
  await expect.poll(() => opacity("contact"), { timeout: 4_000 }).toBeGreaterThan(0.15);
});

test("keeps the story visible on short landscape screens", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });

  if (testInfo.project.name === "mobile") {
    await page.setViewportSize({ width: 640, height: 360 });
    await page.goto("/");

    for (const heading of ["Odkryj blisko", "Poznaj ofertę", "Porozmawiaj u źródła"]) {
      const article = page.getByRole("heading", { level: 3, name: heading }).locator("..").locator("..");
      await article.scrollIntoViewIfNeeded();
      await expect.poll(async () => Number(await article.evaluate((element) => getComputedStyle(element).opacity))).toBeGreaterThan(0.9);
    }

    await page.setViewportSize({ width: 1023, height: 768 });
    await page.goto("/");

    const tabletScene = page.getByTestId("storyboard-visual");
    await tabletScene.scrollIntoViewIfNeeded();
    const tabletSceneRect = await tabletScene.boundingBox();
    const tabletImage = await tabletScene
      .locator('[data-storyboard-scene="discovery"] img')
      .evaluate((image: HTMLImageElement) => ({ complete: image.complete, naturalWidth: image.naturalWidth }));
    const tabletLayout = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(tabletSceneRect).not.toBeNull();
    expect(tabletSceneRect!.x).toBeGreaterThanOrEqual(0);
    expect(tabletSceneRect!.x + tabletSceneRect!.width).toBeLessThanOrEqual(tabletLayout.clientWidth);
    expect(tabletImage.complete).toBe(true);
    expect(tabletImage.naturalWidth).toBeGreaterThan(0);
    expect(tabletLayout.scrollWidth).toBeLessThanOrEqual(tabletLayout.clientWidth);

    return;
  }

  await page.setViewportSize({ width: 1280, height: 600 });
  await page.goto("/");

  await page.getByRole("heading", { level: 3, name: "Porozmawiaj u źródła" }).scrollIntoViewIfNeeded();
  const panel = page.locator(".story-visual-sticky");
  const panelRect = await panel.boundingBox();

  expect(panelRect).not.toBeNull();
  expect(panelRect!.y + panelRect!.height).toBeGreaterThan(0);
  expect(panelRect!.y).toBeLessThan(600);
  await expect
    .poll(() =>
      page
        .locator('[data-storyboard-scene="contact"]')
        .evaluate((element) => Number(getComputedStyle(element).opacity)),
    )
    .toBeGreaterThan(0.15);
});

test("opens and closes the mobile navigation", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Otwórz menu" });
  await menuButton.click();
  await expect(page.getByRole("navigation", { name: "Nawigacja mobilna" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Nawigacja mobilna" })).toHaveCount(0);
  await expect(menuButton).toBeFocused();
});

test("keeps the conversion section readable and the honeypot hidden", async ({ page }) => {
  await page.goto("/");

  const color = await page.locator("#lista-oczekujacych h2 + p").evaluate((element) => getComputedStyle(element).color);

  expect(color).toBe("rgba(255, 248, 231, 0.8)");
  await expect(page.locator('input[name="company"]')).toBeHidden();
});

test("uses three steps, a cohesive type system and a raster harvest accent", async ({ page }) => {
  await page.goto("/");

  const section = page.locator("#jak-to-dziala");
  await expect(section.locator(".harvest-chapter")).toHaveCount(3);
  await expect(section.getByText("04", { exact: true })).toHaveCount(0);
  await expect(section.locator(".harvest-growth svg")).toHaveCount(0);

  const raster = page.getByTestId("harvest-raster-desktop");
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
  expect(fonts.body).toContain("Alegreya Sans");
  expect(fonts.heading).toContain("Alegreya");
});

test("removes defensive disclaimers and the public contact email", async ({ page }) => {
  await page.goto("/");

  for (const phrase of ["Plonbli nie jest sklepem", "nie obsługuje płatności", "nie przejmuje płatności"]) {
    await expect(page.getByText(phrase, { exact: false })).toHaveCount(0);
  }

  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.getByText("plonbli@gmail.com", { exact: false })).toHaveCount(0);
  expect(await page.locator("body").innerText()).not.toMatch(/[—–]/);
  expect(await page.title()).not.toMatch(/[—–]/);
  await expect(page.getByRole("link", { name: "Otwórz kanał Plonbli na YouTube" })).toHaveAttribute(
    "href",
    "https://www.youtube.com/@Plonbli",
  );
});

test("reveals the desktop harvest while scrolling", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Desktop harvest is covered by the desktop project");

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const reveal = page.getByTestId("harvest-reveal-desktop");
  expect(await clipTop(reveal)).toBeGreaterThan(90);

  await page.locator("#lista-oczekujacych").scrollIntoViewIfNeeded();
  await expect.poll(() => clipTop(reveal), { timeout: 4_000 }).toBeLessThanOrEqual(1);
});

test("shows a complete static harvest with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const reveal = page.getByTestId("harvest-reveal-desktop");
  await page.locator("#jak-to-dziala").scrollIntoViewIfNeeded();

  expect(await clipTop(reveal)).toBeLessThanOrEqual(1);
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
});
