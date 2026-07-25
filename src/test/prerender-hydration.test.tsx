import { act } from "@testing-library/react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import App from "@/App";

describe("prerender hydration", () => {
  it("hydrates the server markup without mismatch warnings", async () => {
    const container = document.createElement("div");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    container.innerHTML = renderToString(<App initialAnimations={false} />);
    const serverHeading = container.querySelector("h1");
    const serverForm = container.querySelector<HTMLFormElement>('form[data-js-required="waitlist"]');
    const serverFallback = container.querySelector<HTMLElement>(".waitlist-noscript-fallback");
    const serverFaq = container.querySelector<HTMLElement>(".faq-item");
    const serverFaqAnswer = container.querySelector<HTMLElement>(".faq-item-panel");

    expect(serverHeading).not.toBeNull();
    expect(serverForm).toHaveAttribute("hidden");
    expect(serverForm?.querySelector('input[type="email"]')).toBeDisabled();
    expect(serverForm?.querySelector('button[type="submit"]')).toBeDisabled();
    expect(serverFallback).not.toHaveAttribute("hidden");
    expect(serverFaq).toHaveAttribute("data-open", "true");
    expect(serverFaqAnswer).toHaveAttribute("aria-hidden", "false");

    consoleError.mockClear();
    document.body.append(container);
    let root: Root | undefined;

    await act(async () => {
      root = hydrateRoot(container, <App initialAnimations={false} />);
      await Promise.resolve();
    });

    const hydrationMessages = consoleError.mock.calls
      .flat()
      .map(String)
      .filter((message) => /hydration|did not match|server html/i.test(message));

    expect(hydrationMessages).toEqual([]);
    expect(container.querySelector("h1")).not.toBe(serverHeading);
    expect(container.querySelector('form[data-js-required="waitlist"]')).not.toHaveAttribute("hidden");
    expect(container.querySelector('form[data-js-required="waitlist"] input[type="email"]')).toBeEnabled();
    expect(container.querySelector(".waitlist-noscript-fallback")).toHaveAttribute("hidden");
    expect(container.querySelector(".faq-item")).toHaveAttribute("data-open", "false");
    expect(container.querySelector(".faq-item-panel")).toHaveAttribute("aria-hidden", "true");

    await act(async () => root?.unmount());
    container.remove();
    consoleError.mockRestore();
  });
});
