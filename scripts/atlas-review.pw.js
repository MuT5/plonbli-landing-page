// playwright-cli run-code --filename=scripts/atlas-review.pw.js
async (page) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  for (const [width, height, label] of [[390, 844, "mobile"], [1440, 900, "desktop"]]) {
    await page.setViewportSize({ width, height });
    await page.goto("http://127.0.0.1:8081/");
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".hero-image").evaluate(image => image.decode());
    await page.screenshot({ path: "output/playwright/atlas-" + label + ".png" });
    await page.locator(".atlas-story-layout").evaluate(el =>
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "instant" }));
    await page.locator(".atlas-story-stage img").first().evaluate(image => image.decode());
    await page.screenshot({ path: "output/playwright/atlas-step-" + label + ".png" });
    for (const [step, scene] of [[2, "offer"], [3, "contact"], [1, "discovery"]]) {
      await page.locator('[data-story-card="' + step + '"]').evaluate((el, mobile) => {
        const line = window.innerHeight * (mobile ? 1 : 0.65);
        window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().bottom - line, behavior: "instant" });
      }, label === "mobile");
      const selector = '[data-storyboard-scene="' + scene + '"]';
      await page.locator(selector + ' img').evaluate(image => image.decode());
      await page.waitForFunction(sel => Number(getComputedStyle(document.querySelector(sel)).opacity) > 0.98, selector);
      if (step !== 1) await page.screenshot({ path: "output/playwright/atlas-" + scene + "-" + label + ".png" });
    }
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.emulateMedia({ reducedMotion: null });
}
