import { act } from "@testing-library/react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import App from "@/App";

describe("prerender hydration", () => {
  it("hydrates without warnings or replacing the server-rendered content", async () => {
    const container = document.createElement("div");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    container.innerHTML = renderToString(<App initialClientReady={false} />);
    const serverHeading = container.querySelector("h1");
    const signupSelector = 'form, input[type="email"], .waitlist-noscript-fallback, a[href="#lista-oczekujacych"]';
    const serverFaq = container.querySelector<HTMLElement>(".faq-item");
    const serverFaqAnswer = container.querySelector<HTMLElement>(".faq-item-panel");

    expect(serverHeading).not.toBeNull();
    expect(container.querySelector(signupSelector)).toBeNull();
    expect(container.querySelector('[data-cta-id="hero-how-it-works"]')).toHaveAttribute("href", "#jak-to-dziala");
    expect(serverFaq).toHaveAttribute("data-open", "true");
    expect(serverFaqAnswer).toHaveAttribute("aria-hidden", "false");

    consoleError.mockClear();
    document.body.append(container);
    let root: Root | undefined;

    await act(async () => {
      root = hydrateRoot(container, <App initialClientReady={false} />);
      await Promise.resolve();
    });

    const hydrationMessages = consoleError.mock.calls
      .flat()
      .map(String)
      .filter((message) => /hydration|did not match|server html/i.test(message));

    expect(hydrationMessages).toEqual([]);
    expect(container.querySelector("h1")).toBe(serverHeading);
    expect(container.querySelector(".faq-item")).toBe(serverFaq);
    expect(container.querySelector(signupSelector)).toBeNull();
    expect(container.querySelector(".faq-item")).toHaveAttribute("data-open", "false");
    expect(container.querySelector(".faq-item-panel")).toHaveAttribute("aria-hidden", "true");

    await act(async () => root?.unmount());
    container.remove();
    consoleError.mockRestore();
  });
});
