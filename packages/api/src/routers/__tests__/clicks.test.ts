import { describe, it, expect, vi } from 'vitest';
import { clicksRouter } from '../clicks';
import type { Context } from '../../context';

const mockRedis = {
  get: vi.fn().mockResolvedValue(0),
  incr: vi.fn().mockResolvedValue(1),
  expire: vi.fn(),
};

const mockDb = {
  insert: vi.fn().mockReturnValue({
    values: vi.fn().mockReturnValue({
      onConflictDoUpdate: vi.fn().mockResolvedValue(undefined),
    }),
  }),
  select: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  limit: vi.fn().mockResolvedValue([{ totalClicks: 1, trumpbucksBalance: 1 }]),
};

const ctx: Partial<Context> = {
  redis: mockRedis as any,
  db: mockDb as any,
  userId: 'user_123',
};

describe('clicksRouter', () => {
  it('click should increment global counter and update wallet', async () => {
    const caller = clicksRouter.createCaller(ctx as Context);
    const result = await caller.click({});
    expect(result).toEqual({ success: true });
    expect(mockRedis.incr).toHaveBeenCalledWith('global_clicks');
    expect(mockDb.insert).toHaveBeenCalled();
  });

  it('globalCount should return number', async () => {
    mockRedis.get.mockResolvedValueOnce(42);
    const caller = clicksRouter.createCaller(ctx as Context);
    const count = await caller.globalCount();
    expect(count).toBe(42);
  });
});