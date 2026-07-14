import { describe, expect, it } from "vitest";

import { landingContent } from "@/content/landing.pl";
import { protectPolishSingleLetterWords } from "@/lib/polishTypography";

const nonVisualContentKeys = new Set([
  "seo",
  "id",
  "ariaLabel",
  "imageAlt",
  "emailPlaceholder",
  "target",
  "variant",
  "icon",
]);

function collectVisibleStrings(value: unknown, key?: string): string[] {
  if (key && nonVisualContentKeys.has(key)) {
    return [];
  }

  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectVisibleStrings(item));
  }

  if (value !== null && typeof value === "object") {
    return Object.entries(value).flatMap(([entryKey, entryValue]) =>
      collectVisibleStrings(entryValue, entryKey),
    );
  }

  return [];
}

describe("Polish typography", () => {
  it("keeps every consecutive one-letter word with the word that follows", () => {
    expect(protectPolishSingleLetterWords("A i w domu")).toBe("A\u00A0i\u00A0w\u00A0domu");
    expect(protectPolishSingleLetterWords("Ala i Ola w domu")).toBe(
      "Ala i\u00A0Ola w\u00A0domu",
    );
  });

  it("does not join a one-letter word across a paragraph break", () => {
    expect(protectPolishSingleLetterWords("Z\nnowego miejsca")).toBe("Z\nnowego miejsca");
  });

  it("protects every visible one-letter word in the landing copy", () => {
    const visibleCopy = collectVisibleStrings(landingContent);

    expect(landingContent.hero.description).toContain("z\u00A0pobliskiego gospodarstwa");

    for (const text of visibleCopy) {
      expect(text).not.toMatch(/(^|[\s([{„«])[aiouwzAIUOWZ] (?=\S)/u);
    }
  });
});
