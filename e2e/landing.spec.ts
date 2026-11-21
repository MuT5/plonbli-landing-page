import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { launchCategory } from "../src/content/launchCategory";

async function positionCard(page: Page, step: number, fraction: number, desktop = false) {
  return page.locator(`[data-story-card="${step}"]`).evaluate((card, settings) => {
    const rect = card.getBoundingClientRect();
    const line = window.innerHeight * (settings.desktop ? 0.65 : 1);
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: window.scrollY + rect.top - line + rect.height * settings.fraction, behavior: "instant" });
    return Math.abs(card.getBoundingClientRect().bottom - line);
  }, { fraction, desktop });
}

async function sceneOpacity(page: Page, id: string) {
  return page.locator(`[data-storyboard-scene="${id}"]`).evaluate(el => Number(getComputedStyle(el).opacity));
}

test("renders the pre-launch story without inviting users to subscribe", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "Dobre rzeczy mają swój adres." })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Można mieszkać tu od lat i nie znać tego miejsca." })).toBeVisible();
  await expect(page.locator('[data-cta-id="hero-how-it-works"]')).toBeVisible();
  await expect(page.locator('a[href*="plonbliapp.vercel.app"]')).toHaveCount(0);
  await expect(page.locator("html")).toHaveAttribute("lang", "pl-PL");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://odswoich.pl/");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://odswoich.pl/");
  const sharingImage = "https://odswoich.pl/landing/og-od-swoich.jpg";
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", sharingImage);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", sharingImage);
  expect(consoleErrors).toEqual([]);
});

test("keeps mobile navigation, the story and FAQ usable without JavaScript", async ({ browser, baseURL }) => {
  if (!baseURL) throw new Error("Missing Playwright baseURL");

  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();

  try {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('form, input[type="email"], .waitlist-noscript-fallback')).toHaveCount(0);
    await expect(page.locator('[data-cta-id="hero-how-it-works"]')).toHaveAttribute("href", "#jak-to-dziala");
    await page.locator("header summary").click();
    const mobileNav = page.getByRole("navigation", { name: "Nawigacja mobilna" });
    await expect(mobileNav).toBeVisible();
    await mobileNav.getByRole("link", { name: "FAQ" }).click();
    await expect(page).toHaveURL(/#faq$/);

    const firstFaq = page.locator(".faq-item").first();
    const firstAnswer = firstFaq.locator(".faq-item-panel");
    await expect(firstFaq).toHaveAttribute("data-open", "true");
    await expect(firstFaq.getByRole("button")).toBeDisabled();
    await expect(firstAnswer).toHaveAttribute("aria-hidden", "false");
    await expect(firstAnswer).toBeVisible();
  } finally {
    await context.close();
  }
});

test("shows the whole farm watercolor and serves a phone-sized source in portrait", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const frame = page.locator(".atlas-cover-image");
  const image = page.locator(".hero-image");
  const portraitLayout = await frame.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      clientWidth: document.documentElement.clientWidth,
      left: rect.left,
      right: rect.right,
      width: rect.width,
    };
  });

  expect(portraitLayout.left).toBeGreaterThanOrEqual(0);
  expect(portraitLayout.right).toBeLessThanOrEqual(portraitLayout.clientWidth);
  expect(portraitLayout.width).toBeLessThanOrEqual(portraitLayout.clientWidth);
  await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.currentSrc)).toContain("-portrait-");
  await expect(image).toHaveCSS("object-fit", "contain");
  await image.evaluate((el: HTMLImageElement) => el.decode());
  expect(await image.evaluate((el: HTMLImageElement) => el.naturalWidth / el.naturalHeight)).toBeCloseTo(1.5, 2);

  await page.setViewportSize({ width: 640, height: 360 });
  await page.goto("/");

  const landscapeLayout = await frame.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { clientWidth: document.documentElement.clientWidth, left: rect.left, right: rect.right };
  });

  expect(landscapeLayout.left).toBeGreaterThanOrEqual(0);
  expect(landscapeLayout.right).toBeLessThanOrEqual(landscapeLayout.clientWidth);
  await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.currentSrc)).toMatch(/atlas-garden-morning-\d+-[\w-]{8,}\.(avif|webp)$/);
});

test("keeps the route inside the photo and spaces mobile cards by the photo height", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const width of [320, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await expect(page.locator('[data-client-ready="true"]')).toBeAttached();
    await positionCard(page, 1, 1);
    const stage = page.getByTestId("storyboard-visual");
    const rect = (await stage.boundingBox())!;
    const route = (await page.getByTestId("atlas-route").boundingBox())!;
    expect(rect.x).toBeGreaterThanOrEqual(0);
    expect(rect.x + rect.width).toBeLessThanOrEqual(width);
    expect(route.x).toBeGreaterThanOrEqual(rect.x);
    expect(route.x + route.width).toBeLessThanOrEqual(rect.x + rect.width);
    expect(route.y + route.height).toBeLessThanOrEqual(rect.y + rect.height);
    const cards = await page.locator("[data-story-card]").evaluateAll(nodes =>
      nodes.map(node => ({ top: node.getBoundingClientRect().top, bottom: node.getBoundingClientRect().bottom })));
    expect(Math.abs(cards[1].top - cards[0].bottom - rect.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(cards[2].top - cards[1].bottom - rect.height)).toBeLessThanOrEqual(1);
    await expect(page.locator("[data-story-step]").nth(1)).toHaveCSS("border-top-width", "0px");
    const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflowing).toBe(false);
  }
});

test("keeps mobile step text readable throughout both photo overlaps in either direction", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 919 });
  await page.goto("/");
  await expect(page.locator('[data-client-ready="true"]')).toBeAttached();
  await page.evaluate(() => document.fonts.ready);
  for (const reverse of [false, true]) {
    for (const step of reverse ? [2, 1] : [1, 2]) {
      const card = page.locator(`[data-story-card="${step}"]`);
      for (const overlap of reverse ? [1, 0.5, 0] : [0, 0.5, 1]) {
        const sample = await card.evaluate(async (el, fraction) => {
          const stage = document.querySelector(".atlas-story-stage")!;
          const bounds = el.getBoundingClientRect();
          const photoBottom = parseFloat(getComputedStyle(stage).top) + stage.getBoundingClientRect().height;
          window.scrollTo({ top: window.scrollY + bounds.top - photoBottom + bounds.height * fraction, behavior: "instant" });
          await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
          const cardBox = el.getBoundingClientRect();
          const background = getComputedStyle(el).backgroundColor;
          const description = el.querySelector(".atlas-step-description")!;
          const luminance = (color: string) => {
            const [r, g, b] = (color.match(/[\d.]+/g) ?? []).map(channel => {
              const s = Number(channel) / 255;
              return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
            });
            return r * 0.2126 + g * 0.7152 + b * 0.0722;
          };
          return {
            offsetError: Math.abs(stage.getBoundingClientRect().bottom - cardBox.top - fraction * cardBox.height),
            opacity: getComputedStyle(el).opacity,
            background,
            contrast: (luminance(background) + 0.05) / (luminance(getComputedStyle(description).color) + 0.05),
          };
        }, overlap);
        expect(sample.offsetError).toBeLessThanOrEqual(1);
        expect(sample.opacity).toBe("1");
        expect(sample.background).toMatch(/^rgb\(/); // An opaque, not alpha-blended, surface.
        expect(sample.contrast).toBeGreaterThanOrEqual(4.5);
      }
    }
  }
});

test("syncs mobile photos to the entering card all the way forward and back", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator('[data-client-ready="true"]')).toBeAttached();
  await positionCard(page, 2, 0);
  await expect.poll(() => sceneOpacity(page, "discovery")).toBeGreaterThan(0.98);
  await positionCard(page, 2, 0.5);
  for (const id of ["discovery", "offer"]) {
    await expect.poll(async () => Math.abs(await sceneOpacity(page, id) - 0.5)).toBeLessThan(0.02);
  }
  expect(await positionCard(page, 2, 1)).toBeLessThanOrEqual(1);
  await expect.poll(() => sceneOpacity(page, "offer")).toBeGreaterThan(0.98);
  expect(await positionCard(page, 3, 1)).toBeLessThanOrEqual(1);
  await expect.poll(() => sceneOpacity(page, "contact")).toBeGreaterThan(0.98);
  await positionCard(page, 2, 0);
  await expect.poll(() => sceneOpacity(page, "discovery")).toBeGreaterThan(0.98);
});

test("reveals the route along with the desktop story", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator('[data-client-ready="true"]')).toBeAttached();
  const routeOffset = () => page.locator(".atlas-route-ink").evaluate(el => parseFloat(getComputedStyle(el).strokeDashoffset));
  await expect.poll(routeOffset).toBeGreaterThan(0.8);
  await positionCard(page, 2, 1, true);
  await expect.poll(() => sceneOpacity(page, "offer")).toBeGreaterThan(0.98);
  await positionCard(page, 3, 1, true);
  await expect.poll(() => sceneOpacity(page, "contact")).toBeGreaterThan(0.98);
  await expect.poll(routeOffset).toBeLessThan(0.02);
});

test("gives every step its own photo on short landscape screens and with reduced motion", async ({ page }) => {
  for (const reduced of [true, false]) {
    await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" });
    await page.setViewportSize(reduced ? { width: 1440, height: 900 } : { width: 640, height: 360 });
    await page.goto("/");
    await expect(page.getByTestId("storyboard-visual")).toBeHidden();
    for (const step of [1, 2, 3]) {
      const article = page.locator(`[data-story-step="${step}"]`);
      const image = article.locator("[data-static-scene] img");
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      await expect(article.locator("[data-story-card]")).toHaveCSS("opacity", "1");
    }
  }
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

test("uses smooth section navigation unless reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const storyLink = page.getByRole("link", { name: "Poznaj trzy kroki", exact: true });
  const storySection = page.locator("#jak-to-dziala");

  await expect(storyLink).toHaveAttribute("href", "#jak-to-dziala");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "smooth");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await storyLink.click();
  await expect(page).toHaveURL(/#jak-to-dziala$/);
  await expect
    .poll(() => storySection.evaluate((element) => Math.abs(element.getBoundingClientRect().top)))
    .toBeLessThan(220);

  await page.goto("/");

  const faqLink = page.locator('[data-cta-id="for-local-places-faq"]');
  const faq = page.locator("#faq");
  await faqLink.click();
  await expect(page).toHaveURL(/#faq$/);
  await expect(faq.getByRole("heading", { level: 2 })).toBeInViewport();
});

test("has no signup form, signup links or duplicate fragment targets", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('form, input[type="email"], a[href="#lista-oczekujacych"]')).toHaveCount(0);
  const invalid = await page.locator('a[href^="#"]').evaluateAll(links =>
    links.map(link => link.getAttribute("href")!).filter(hash =>
      hash === "#" || document.querySelectorAll("#" + CSS.escape(decodeURIComponent(hash.slice(1)))).length !== 1));
  expect(invalid).toEqual([]);
});

test("keeps discovery controls, footer and step numbers above their contrast targets", async ({ page }) => {
  await page.goto("/");

  const contrast = await page.evaluate(() => {
    type Rgba = { red: number; green: number; blue: number; alpha: number };

    const parseColor = (value: string): Rgba => {
      const channels = value.match(/[\d.]+/g)?.map(Number);
      if (!channels || channels.length < 3) throw new Error(`Unsupported CSS color: ${value}`);

      return {
        red: channels[0],
        green: channels[1],
        blue: channels[2],
        alpha: channels[3] ?? 1,
      };
    };
    const composite = (foreground: Rgba, background: Rgba): Rgba => ({
      red: foreground.red * foreground.alpha + background.red * (1 - foreground.alpha),
      green: foreground.green * foreground.alpha + background.green * (1 - foreground.alpha),
      blue: foreground.blue * foreground.alpha + background.blue * (1 - foreground.alpha),
      alpha: 1,
    });
    const luminance = ({ red, green, blue }: Rgba) => {
      const linearize = (channel: number) => {
        const normalized = channel / 255;
        return normalized <= 0.04045
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      };

      return 0.2126 * linearize(red) + 0.7152 * linearize(green) + 0.0722 * linearize(blue);
    };
    const ratio = (foreground: Rgba, background: Rgba) => {
      const foregroundLuminance = luminance(foreground);
      const backgroundLuminance = luminance(background);
      const lighter = Math.max(foregroundLuminance, backgroundLuminance);
      const darker = Math.min(foregroundLuminance, backgroundLuminance);

      return (lighter + 0.05) / (darker + 0.05);
    };

    const stepNumber = document.querySelector<HTMLElement>(".atlas-step-number")!;
    const stepCard = stepNumber.closest<HTMLElement>(".atlas-story-copy")!;
    const stepColor = parseColor(getComputedStyle(stepNumber).color);
    const pageBackground = parseColor(getComputedStyle(document.body).backgroundColor);
    const stepBackground = composite(parseColor(getComputedStyle(stepCard).backgroundColor), pageBackground);
    const contrastOnSolidSurface = (text: Element, surface: Element) => {
      const background = parseColor(getComputedStyle(surface).backgroundColor);
      if (background.alpha !== 1) throw new Error("Text must have an opaque reading surface");
      return ratio(composite(parseColor(getComputedStyle(text).color), background), background);
    };
    const primary = document.querySelector('[data-cta-id="hero-how-it-works"]')!;
    const footer = document.querySelector("footer")!;

    return {
      primary: contrastOnSolidSurface(primary, primary),
      footer: contrastOnSolidSurface(footer.querySelector(".footer-link")!, footer),
      stepNumber: ratio(composite(stepColor, stepBackground), stepBackground),
    };
  });

  expect(contrast.primary).toBeGreaterThanOrEqual(4.5);
  expect(contrast.footer).toBeGreaterThanOrEqual(4.5);
  expect(contrast.stepNumber).toBeGreaterThanOrEqual(3);
});

test("has no automatically detectable WCAG A or AA violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("animates FAQ answers while opening and closing", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const question = page.getByRole("button", {
    name: "Czy korzystanie z aplikacji Od Swoich będzie bezpłatne?",
  });
  const answer = page.locator('[data-faq-answer="free-access"]');

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
  });
  await question.scrollIntoViewIfNeeded();
  await page.waitForTimeout(650);
  await expect(answer).toHaveAttribute("aria-hidden", "true");
  const closedHeight = await answer.evaluate((element) => element.getBoundingClientRect().height);
  const transition = await answer.evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      durations: styles.transitionDuration.split(",").map((value) => Number.parseFloat(value) || 0),
      properties: styles.transitionProperty.split(",").map((value) => value.trim()),
    };
  });

  expect(closedHeight).toBeLessThanOrEqual(0.5);
  expect(transition.properties).toContain("grid-template-rows");
  expect(Math.max(...transition.durations)).toBeGreaterThanOrEqual(0.3);

  await question.click();
  await expect(answer).toHaveAttribute("aria-hidden", "false");
  await expect.poll(() => answer.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(20);

  await question.click();
  await expect(answer).toHaveAttribute("aria-hidden", "true");
  await expect.poll(() => answer.evaluate((element) => element.getBoundingClientRect().height)).toBeLessThanOrEqual(0.5);

  await page.emulateMedia({ reducedMotion: "reduce" });
  const reducedTransition = await answer.evaluate((element) =>
    getComputedStyle(element)
      .transitionDuration.split(",")
      .map((value) => Number.parseFloat(value) || 0),
  );

  expect(Math.max(...reducedTransition)).toBeGreaterThanOrEqual(0.15);
  expect(Math.max(...reducedTransition)).toBeLessThanOrEqual(0.25);

  await question.click();
  await expect(answer).toHaveAttribute("aria-hidden", "false");
});

test("switches the ambient field story between audience sections", async ({ page }) => {
  await page.goto("/");

  const sequence = page.getByTestId("ambient-story-sequence");
  await expect(sequence).toHaveAttribute("data-ambient-story-active", "discovery");
  for (const scene of ["discovery", "offer", "contact"] as const) {
    const chapter = page.locator(`[data-ambient-story-chapter="${scene}"]`);
    await chapter.evaluate(element => element.scrollIntoView({ block: "center", behavior: "instant" }));
    await expect(sequence).toHaveAttribute("data-ambient-story-active", scene);
    await expect(page.locator(`[data-ambient-story-scene="${scene}"] img`)).toHaveAttribute(
      "src", `/${launchCategory.storyImages[scene].mobileSrc}`,
    );
  }
});

test("uses three steps, a cohesive type system and a route inside the image", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#jak-to-dziala");
  await expect(section.locator("[data-story-step]")).toHaveCount(3);
  const firstStep = section.locator('[data-story-step="1"]');
  await expect(firstStep.getByRole("heading", { name: "Odkryjesz miejsce na mapie" })).toHaveCount(1);
  await expect(firstStep.locator(".atlas-step-description")).toHaveText(/^Po starcie aplikacji\s+Od\s+Swoich\b/);
  await expect(section.getByText("04", { exact: true })).toHaveCount(0);
  await expect(section.locator(".atlas-story-stage [data-testid='atlas-route']")).toHaveCount(1);

  await page.evaluate(() => document.fonts.ready);
  const fonts = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    heading: getComputedStyle(document.querySelector("h1")!).fontFamily,
    section: getComputedStyle(document.querySelector(".section-title")!).fontFamily,
    step: getComputedStyle(document.querySelector("[data-story-card] h3")!).fontFamily,
    loadedFaces: Array.from(document.fonts, face => face.status === "loaded" ? face.family : ""),
  }));
  expect(fonts.body).toContain("Source Sans 3");
  for (const family of [fonts.heading, fonts.section, fonts.step]) expect(family).toContain("Alegreya");
  expect(fonts.loadedFaces.some(family => family.includes("Alegreya"))).toBe(true);
  expect(fonts.loadedFaces.some(family => family.includes("Source Sans 3"))).toBe(true);
});

test("removes defensive disclaimers and the public contact email", async ({ page }) => {
  await page.goto("/");

  for (const phrase of ["Od Swoich nie jest sklepem", "nie obsługuje płatności", "nie przejmuje płatności"]) {
    await expect(page.getByText(phrase, { exact: false })).toHaveCount(0);
  }

  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.getByText("plonbli@gmail.com", { exact: false })).toHaveCount(0);
  expect(await page.locator("body").innerText()).not.toMatch(/[—–]/);
  expect(await page.title()).not.toMatch(/[—–]/);
  const profiles = page.locator("footer .site-footer-social");
  await expect(profiles).toHaveCount(2);
  await expect(profiles.nth(0)).toHaveAttribute("href", "https://x.com/odswoich");
  const telegram = page.locator("footer").getByRole("link", { name: "Grupa na Telegramie (Od Swoich)", exact: true });
  await expect(telegram).toBeVisible();
  await expect(telegram).toHaveAttribute("href", "https://t.me/Plonbligrupa");
  const legacyLinks = page.locator('a[href*="plonbli" i], a[href*="1YkUnnggkF"]');
  await expect(legacyLinks).toHaveCount(1);
  await expect(legacyLinks).toHaveAttribute("href", "https://t.me/Plonbligrupa");
});
