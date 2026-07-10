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

    const input = screen.getByLabelText("Adres e-mail");
    fireEvent.change(input, { target: { value: " Hello@Example.com " } });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz mnie na listę" }));

    await waitFor(() => expect(join).toHaveBeenCalledWith("Hello@Example.com"));
    expect(await screen.findByText("Jesteś na liście!")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("shows the dedicated duplicate state", async () => {
    vi.spyOn(waitlist, "joinWaitlist").mockRejectedValue(new WaitlistError("duplicate", "duplicate"));
    render(<WaitlistForm content={landingContent.waitlist.form} />);

    fireEvent.change(screen.getByLabelText("Adres e-mail"), { target: { value: "hello@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz mnie na listę" }));

    expect(await screen.findByText("Ten adres jest już na liście")).toBeInTheDocument();
  });

  it("shows a controlled error for a rejected request", async () => {
    vi.spyOn(waitlist, "joinWaitlist").mockRejectedValue(new Error("network"));
    render(<WaitlistForm content={landingContent.waitlist.form} />);

    fireEvent.change(screen.getByLabelText("Adres e-mail"), { target: { value: "hello@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Zapisz mnie na listę" }));

    expect(await screen.findByText("Nie udało się zapisać adresu")).toBeInTheDocument();
  });

  it("locks repeated submissions while the request is pending", async () => {
    let resolveRequest: ((value: string) => void) | undefined;
    const pending = new Promise<string>((resolve) => {
      resolveRequest = resolve;
    });
    const join = vi.spyOn(waitlist, "joinWaitlist").mockReturnValue(pending);
    render(<WaitlistForm content={landingContent.waitlist.form} />);

    fireEvent.change(screen.getByLabelText("Adres e-mail"), { target: { value: "hello@example.com" } });
    const form = screen.getByRole("button", { name: "Zapisz mnie na listę" }).closest("form");
    fireEvent.submit(form!);
    fireEvent.submit(form!);

    expect(join).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Zapisujemy…" })).toBeDisabled();

    resolveRequest?.("hello@example.com");
    expect(await screen.findByText("Jesteś na liście!")).toBeInTheDocument();
  });

  it("silently accepts the honeypot without contacting the service", async () => {
    const join = vi.spyOn(waitlist, "joinWaitlist");
    render(<WaitlistForm content={landingContent.waitlist.form} />);

    fireEvent.change(screen.getByLabelText("Adres e-mail"), { target: { value: "bot@example.com" } });
    const honeypot = document.getElementById("company") as HTMLInputElement;
    fireEvent.change(honeypot, { target: { value: "Spam Ltd" } });
    fireEvent.submit(honeypot.closest("form")!);

    expect(join).not.toHaveBeenCalled();
    expect(await screen.findByText("Jesteś na liście!")).toBeInTheDocument();
  });
});

describe("waitlist utilities", () => {
  it("normalizes casing and surrounding whitespace", () => {
    expect(waitlist.normalizeEmail("  HELLO@Example.COM ")).toBe("hello@example.com");
  });
});
