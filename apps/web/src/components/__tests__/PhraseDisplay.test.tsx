import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PhraseDisplay from '../PhraseDisplay';
import { trpc } from '@/lib/trpc/react';

vi.mock('@/lib/trpc/react', () => ({
  trpc: {
    phrases: {
      random: {
        useQuery: () => ({ data: { id: 1, text: 'Test phrase' }, isLoading: false, isError: false }),
      },
    },
  },
}));

describe('PhraseDisplay', () => {
  it('shows phrase text', () => {
    render(<PhraseDisplay />);
    expect(screen.getByText('“Test phrase”')).toBeInTheDocument();
  });
});