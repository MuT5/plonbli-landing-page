import { afterEach, describe, expect, it, vi } from "vitest";

import { joinWaitlist, resetWaitlistClientForTests } from "@/lib/waitlist";

const { createClient, from, insert } = vi.hoisted(() => {
  const insert = vi.fn().mockResolvedValue({ error: null });
  const from = vi.fn(() => ({ insert }));
  return { createClient: vi.fn(() => ({ from })), from, insert };
});

vi.mock("@supabase/supabase-js", () => ({ createClient }));

describe("signup service switch", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
    resetWaitlistClientForTests();
  });

  it.each([undefined, "false", "1"])("does not initialize the client when the flag is %s", async (flag) => {
    vi.stubEnv("VITE_WAITLIST_SIGNUPS_ENABLED", flag);
    vi.stubEnv("VITE_SUPABASE_URL", "https://example.invalid");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "test-only");
    await expect(joinWaitlist("visitor@example.com")).rejects.toMatchObject({ code: "paused" });
    expect(createClient).not.toHaveBeenCalled();
    expect(insert).not.toHaveBeenCalled();
  });

  it("requires explicit opt-in even when client credentials are configured", async () => {
    vi.stubEnv("VITE_WAITLIST_SIGNUPS_ENABLED", "true");
    vi.stubEnv("VITE_SUPABASE_URL", "https://example.invalid");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "test-only");
    await expect(joinWaitlist(" Visitor@example.com ")).resolves.toBe("visitor@example.com");
    expect(from).toHaveBeenCalledWith("subscribers");
    expect(insert).toHaveBeenCalledWith({ email: "visitor@example.com" });
  });
});
