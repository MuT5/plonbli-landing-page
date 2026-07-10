import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type WaitlistErrorCode = "configuration" | "duplicate" | "invalid-email" | "service";

export class WaitlistError extends Error {
  readonly code: WaitlistErrorCode;

  constructor(code: WaitlistErrorCode, message: string) {
    super(message);
    this.name = "WaitlistError";
    this.code = code;
  }
}

interface WaitlistDatabase {
  public: {
    Tables: {
      subscribers: {
        Row: { id: string; email: string; created_at: string };
        Insert: { id?: string; email: string; created_at?: string };
        Update: { id?: string; email?: string; created_at?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

type WaitlistClient = SupabaseClient<WaitlistDatabase>;

let cachedClient: WaitlistClient | null = null;
let cachedCredentials = "";

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClient(): WaitlistClient {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim();
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    throw new WaitlistError("configuration", "Brak konfiguracji formularza listy oczekujących.");
  }

  const credentials = `${url}:${anonKey}`;
  if (!cachedClient || cachedCredentials !== credentials) {
    cachedClient = createClient<WaitlistDatabase>(url, anonKey);
    cachedCredentials = credentials;
  }

  return cachedClient;
}

export async function joinWaitlist(value: string): Promise<string> {
  const email = normalizeEmail(value);
  if (!isValidEmail(email)) {
    throw new WaitlistError("invalid-email", "Nieprawidłowy adres e-mail.");
  }

  try {
    const { error } = await getClient().from("subscribers").insert({ email });

    if (!error) return email;
    if (error.code === "23505") {
      throw new WaitlistError("duplicate", "Ten adres jest już zapisany.");
    }

    throw new WaitlistError("service", "Usługa listy oczekujących zwróciła błąd.");
  } catch (error) {
    if (error instanceof WaitlistError) throw error;
    throw new WaitlistError("service", "Nie udało się połączyć z listą oczekujących.");
  }
}

export function resetWaitlistClientForTests(): void {
  cachedClient = null;
  cachedCredentials = "";
}
