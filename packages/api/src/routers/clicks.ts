import { z } from "zod";
import { t } from "../trpc";
import { TRPCError } from "@trpc/server";
import { userWallets } from "@repo/db/schema";
import { eq, sql } from "drizzle-orm";
import { tryAwardBadge } from "./badges";

export const clicksRouter = t.router({
  globalCount: t.procedure.query(async ({ ctx }) => {
    const count = await ctx.redis.get("global_clicks");
    return Number(count ?? 0);
  }),

  click: t.procedure
    .input(
      z
        .object({
          soundEnabled: z.boolean().optional(),
        })
        .optional()
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

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

        // Aggiorna wallet utente
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

        // Recupera i dati aggiornati per controllare i badge
        const wallet = await ctx.db
          .select({
            totalClicks: userWallets.totalClicks,
            trumpbucksBalance: userWallets.trumpbucksBalance,
          })
          .from(userWallets)
          .where(eq(userWallets.clerkUserId, userId))
          .limit(1);

        if (wallet[0]) {
          // Assegna badge in base alle soglie
          if (wallet[0].totalClicks >= 1) {
            await tryAwardBadge(ctx.db, userId, "First Click");
          }
          if (wallet[0].totalClicks >= 100) {
            await tryAwardBadge(ctx.db, userId, "Click Addict");
          }
          if (wallet[0].trumpbucksBalance >= 1000) {
            await tryAwardBadge(ctx.db, userId, "Whale");
          }
        }
      }

      // Incrementa sempre il contatore globale (anche anonimo)
      await ctx.redis.incr("global_clicks");
      return { success: true };
    }),
});