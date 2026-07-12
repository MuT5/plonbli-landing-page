import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import WaitlistForm from "@/components/landing/WaitlistForm";
import { landingContent } from "@/content/landing.pl";
import * as waitlist from "@/lib/waitlist";
import { WaitlistError } from "@/lib/waitlist";

describe("waitlist form", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("submits the email and shows a success state", async () => {
    const join = vi.spyOn(waitlist, "joinWaitlist").mockResolvedValue("hello@example.com");
    render(<WaitlistForm content={landingContent.waitlist.form} />);

    const input = screen.getByLabelText("Twój e-mail");
    fireEvent.change(input, { target: { value: " Hello@Example.com " } });
    fireEvent.click(screen.getByRole("button", { name: "Powiadom mnie" }));

    await waitFor(() => expect(join).toHaveBeenCalledWith("Hello@Example.com"));
    expect(await screen.findByText("Jesteś blisko od początku")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("shows the dedicated duplicate state", async () => {
    vi.spyOn(waitlist, "joinWaitlist").mockRejectedValue(new WaitlistError("duplicate", "duplicate"));
    render(<WaitlistForm content={landingContent.waitlist.form} />);

    fireEvent.change(screen.getByLabelText("Twój e-mail"), { target: { value: "hello@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Powiadom mnie" }));

    expect(await screen.findByText("Ten adres już jest z nami")).toBeInTheDocument();
  });

  it("shows a controlled error for a rejected request", async () => {
    vi.spyOn(waitlist, "joinWaitlist").mockRejectedValue(new Error("network"));
    render(<WaitlistForm content={landingContent.waitlist.form} />);

    fireEvent.change(screen.getByLabelText("Twój e-mail"), { target: { value: "hello@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Powiadom mnie" }));

    expect(await screen.findByText("Nie udało się dołączyć")).toBeInTheDocument();
  });

  it("locks repeated submissions while the request is pending", async () => {
    let resolveRequest: ((value: string) => void) | undefined;
    const pending = new Promise<string>((resolve) => {
      resolveRequest = resolve;
    });
    const join = vi.spyOn(waitlist, "joinWaitlist").mockReturnValue(pending);
    render(<WaitlistForm content={landingContent.waitlist.form} />);

    fireEvent.change(screen.getByLabelText("Twój e-mail"), { target: { value: "hello@example.com" } });
    const form = screen.getByRole("button", { name: "Powiadom mnie" }).closest("form");
    fireEvent.submit(form!);
    fireEvent.submit(form!);

    expect(join).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Zapisujemy…" })).toBeDisabled();

    resolveRequest?.("hello@example.com");
    expect(await screen.findByText("Jesteś blisko od początku")).toBeInTheDocument();
  });

  it("silently accepts the honeypot without contacting the service", async () => {
    const join = vi.spyOn(waitlist, "joinWaitlist");
    render(<WaitlistForm content={landingContent.waitlist.form} />);

    fireEvent.change(screen.getByLabelText("Twój e-mail"), { target: { value: "bot@example.com" } });
    const honeypot = document.getElementById("waitlist-company") as HTMLInputElement;
    fireEvent.change(honeypot, { target: { value: "Spam Ltd" } });
    fireEvent.submit(honeypot.closest("form")!);

    expect(join).not.toHaveBeenCalled();
    expect(await screen.findByText("Jesteś blisko od początku")).toBeInTheDocument();
  });

  it("scopes form IDs and renders the compact variant without the card shell", () => {
    const { container } = render(
      <WaitlistForm content={landingContent.waitlist.form} idPrefix="final-waitlist" variant="compact" />,
    );

    const input = screen.getByLabelText("Twój e-mail");
    const wrapper = container.querySelector<HTMLElement>('[data-waitlist-form-variant="compact"]');

    expect(input).toHaveAttribute("id", "final-waitlist-email");
    expect(input).toHaveAttribute(
      "aria-describedby",
      "final-waitlist-privacy final-waitlist-feedback",
    );
    expect(container.querySelector("#final-waitlist-company")).toHaveAttribute("name", "company");
    expect(container.querySelector("#final-waitlist-privacy")).toBeInTheDocument();
    expect(container.querySelector("#final-waitlist-feedback")).toBeInTheDocument();
    expect(wrapper).not.toHaveClass("waitlist-form-shell");
  });
});

describe("waitlist utilities", () => {
  it("normalizes casing and surrounding whitespace", () => {
    expect(waitlist.normalizeEmail("  HELLO@Example.COM ")).toBe("hello@example.com");
  });
});
