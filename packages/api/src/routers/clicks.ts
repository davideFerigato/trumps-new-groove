import { z } from "zod";
import { t } from "../trpc";
import { TRPCError } from "@trpc/server";
import { userWallets } from "@repo/db/schema";
import { eq, sql } from "drizzle-orm";

export const clicksRouter = t.router({
  globalCount: t.procedure.query(async ({ ctx }) => {
    const count = await ctx.redis.get("global_clicks");
    return Number(count ?? 0);
  }),

  click: t.procedure
    .input(z.object({ soundEnabled: z.boolean().optional() }))
    .mutation(async ({ ctx }) => {
      const userId = ctx.userId; // può essere null

      if (userId) {
        // Rate limiting solo per utenti loggati
        const today = new Date().toISOString().split("T")[0];
        const rateLimitKey = `clicks:${userId}:${today}`;
        const currentClicks = await ctx.redis.get(rateLimitKey);
        if (Number(currentClicks) >= 50) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Daily click limit reached (50)",
          });
        }
        await ctx.redis.incr(rateLimitKey);
        await ctx.redis.expire(rateLimitKey, 86400);

        // Aggiorna database utente
        await ctx.db
          .insert(userWallets)
          .values({
            clerkUserId: userId,
            trumpbucksBalance: 1,
            totalClicks: 1,
          })
          .onConflictDoUpdate({
            target: userWallets.clerkUserId,
            set: {
              trumpbucksBalance: sql`${userWallets.trumpbucksBalance} + 1`,
              totalClicks: sql`${userWallets.totalClicks} + 1`,
            },
          });
      }

      // Incrementa sempre il contatore globale (anche per anonimi)
      await ctx.redis.incr("global_clicks");

      return { success: true };
    }),
});