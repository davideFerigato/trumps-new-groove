import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TRPCProvider } from '@/lib/trpc/react';
import { trpc } from '@/lib/trpc/react';
import TheButton from '../TheButton';

// Mock del sound store
vi.mock('@/store/useSoundStore', () => ({
  useSoundStore: () => ({ soundEnabled: false }),
}));

// Mock tRPC
vi.mock('@/lib/trpc/react', () => ({
  trpc: {
    clicks: {
      click: {
        useMutation: () => ({ mutateAsync: vi.fn(), isPending: false, isError: false, error: null }),
      },
      globalCount: {
        useQuery: () => ({ data: 10, refetch: vi.fn() }),
      },
    },
    phrases: {
      random: {
        useQuery: () => ({ data: { text: 'test' }, isLoading: false }),
      },
    },
    useUtils: () => ({ clicks: { globalCount: { invalidate: vi.fn() } }, phrases: { random: { invalidate: vi.fn() } } }),
  },
}));

describe('TheButton', () => {
  it('renders and can be clicked', () => {
    render(
      <TRPCProvider>
        <TheButton />
      </TRPCProvider>
    );
    const button = screen.getByRole('button', { name: /invoke/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    // Non verifichiamo la chiamata API perché mockata
  });
});