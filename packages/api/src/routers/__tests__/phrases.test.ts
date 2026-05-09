import { describe, it, expect, vi, beforeEach } from 'vitest';
import { t } from '../../trpc';
import { phrasesRouter } from '../phrases';
import type { Context } from '../../context';

// Mock del db
const mockDb = {
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  orderBy: vi.fn().mockReturnThis(),
  limit: vi.fn().mockResolvedValue([{ id: 1, text: 'Test phrase', isProphecy: false, weekStart: null }]),
};

const ctx: Partial<Context> = {
  db: mockDb as any,
  redis: {} as any,
  userId: null,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('phrasesRouter', () => {
  it('random should return a phrase', async () => {
    const caller = phrasesRouter.createCaller(ctx as Context);
    const result = await caller.random();
    expect(result).toEqual({ id: 1, text: 'Test phrase', isProphecy: false, weekStart: null });
  });

  it('prophecyOfWeek should return null if no prophecy', async () => {
    mockDb.limit.mockResolvedValueOnce([]);
    const caller = phrasesRouter.createCaller(ctx as Context);
    const result = await caller.prophecyOfWeek();
    expect(result).toBeNull();
  });
});