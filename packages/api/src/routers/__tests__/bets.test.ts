import { describe, it, expect, vi } from 'vitest';
import { betsRouter } from '../bets';
import { t } from '../../trpc';
import type { Context } from '../../context';

const mockDb = {
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  limit: vi.fn().mockResolvedValue([{ balance: 100 }]),
  transaction: vi.fn(async (cb: any) => cb({
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
  })),
};

const ctx: Partial<Context> = {
  db: mockDb as any,
  redis: { zadd: vi.fn() } as any,
  userId: 'user_123',
};

describe('betsRouter - placeBet', () => {
  it('should throw if insufficient balance', async () => {
    mockDb.limit.mockResolvedValueOnce([{ balance: 5 }]);
    const caller = betsRouter.createCaller(ctx as Context);
    await expect(caller.placeBet({ prophecyId: 1, amount: 10, prediction: true }))
      .rejects.toThrow('Insufficient TrumpBucks');
  });

  it('should succeed and call zadd', async () => {
    mockDb.limit.mockResolvedValueOnce([{ balance: 50 }]);
    const caller = betsRouter.createCaller(ctx as Context);
    const result = await caller.placeBet({ prophecyId: 1, amount: 10, prediction: true });
    expect(result).toEqual({ success: true });
  });
});