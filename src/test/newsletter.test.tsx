import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

import Index from '@/pages/Index';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

describe('newsletter form', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('inserts email, shows success toast, and clears input on success', async () => {
    const mockInsert = vi.fn().mockResolvedValue({ data: null, error: null });
    vi.mocked(supabase.from).mockReturnValue({ insert: mockInsert } as any);

    render(<Index />);
    const input = screen.getByPlaceholderText('Twój adres e-mail');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith('subscribers');
      expect(mockInsert).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(toast.success).toHaveBeenCalledWith('Dziękujemy za zapisanie się!');
      expect(input).toHaveValue('');
    });
  });

  it('shows duplicate email toast and keeps input on 23505 error', async () => {
    const mockInsert = vi.fn().mockResolvedValue({
      data: null,
      error: { code: '23505', message: 'duplicate key value' },
    });
    vi.mocked(supabase.from).mockReturnValue({ insert: mockInsert } as any);

    render(<Index />);
    const input = screen.getByPlaceholderText('Twój adres e-mail');
    fireEvent.change(input, { target: { value: 'dupe@example.com' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Ten adres e-mail jest już zapisany');
      expect(input).toHaveValue('dupe@example.com');
    });
  });

  it('shows generic error toast and keeps input on other errors', async () => {
    const mockInsert = vi.fn().mockResolvedValue({
      data: null,
      error: { code: 'PGRST301', message: 'some server error' },
    });
    vi.mocked(supabase.from).mockReturnValue({ insert: mockInsert } as any);

    render(<Index />);
    const input = screen.getByPlaceholderText('Twój adres e-mail');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Wystąpił błąd. Spróbuj ponownie.');
      expect(input).toHaveValue('test@example.com');
    });
  });
});
