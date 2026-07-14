const BREAKABLE_SPACE_AFTER_SINGLE_LETTER_WORD =
  /(^|[\s([{„«])([aiouwzAIUOWZ])[ \t]+(?=\S)/gu;

const NON_BREAKING_SPACE = "\u00A0";

export function protectPolishSingleLetterWords(text: string): string {
  let result = text;

  while (true) {
    const protectedResult = result.replace(
      BREAKABLE_SPACE_AFTER_SINGLE_LETTER_WORD,
      `$1$2${NON_BREAKING_SPACE}`,
    );

    if (protectedResult === result) {
      return result;
    }

    result = protectedResult;
  }
}

function protectStringsDeep<T>(value: T, excludedKeys: ReadonlySet<string>, key?: string): T {
  if (key && excludedKeys.has(key)) {
    return value;
  }

  if (typeof value === "string") {
    return protectPolishSingleLetterWords(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => protectStringsDeep(item, excludedKeys)) as T;
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        protectStringsDeep(entryValue, excludedKeys, entryKey),
      ]),
    ) as T;
  }

  return value;
}

export function applyPolishTypography<T>(value: T, excludedKeys: ReadonlySet<string> = new Set()): T {
  return protectStringsDeep(value, excludedKeys);
}
