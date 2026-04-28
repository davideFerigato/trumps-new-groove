import { TRPCError } from "@trpc/server";
import { t } from "../trpc";

interface RateLimitOptions {
  limit: number;
  duration: number; // secondi
  keyPrefix?: string;
}

export function createRateLimiter(opts: RateLimitOptions) {
  return t.middleware(async ({ ctx, next }) => {
    if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
    const key = `rate_limit:${opts.keyPrefix ?? "generic"}:${ctx.userId}`;
    const current = await ctx.redis.get<number>(key) ?? 0;
    if (current >= opts.limit) {
      throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Rate limit exceeded" });
    }
    await ctx.redis.set(key, current + 1, { ex: opts.duration });
    return next();
  });
}