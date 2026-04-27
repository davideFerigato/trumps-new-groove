import { z } from "zod";
import { t } from "../trpc";
import { isAuthed, isAdmin } from "../middleware/auth";
import { bets, userWallets, phrases } from "@repo/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const betsRouter = t.router({
  placeBet: t.procedure
    .use(isAuthed)
    .input(z.object({ prophecyId: z.number(), amount: z.number().min(1), prediction: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const wallet = await ctx.db
        .select({ balance: userWallets.trumpbucksBalance })
        .from(userWallets)
        .where(eq(userWallets.clerkUserId, ctx.userId))
        .limit(1);
      if (!wallet[0] || wallet[0].balance < input.amount) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Insufficient TrumpBucks" });
      }
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(userWallets)
          .set({ trumpbucksBalance: sql`${userWallets.trumpbucksBalance} - ${input.amount}` })
          .where(eq(userWallets.clerkUserId, ctx.userId));
        await tx.insert(bets).values({
          userId: ctx.userId,
          prophecyPhraseId: input.prophecyId,
          amount: input.amount,
          predictedOutcome: input.prediction,
        });
      });
      return { success: true };
    }),
  resolveBet: t.procedure
    .use(isAdmin)
    .input(z.object({ betId: z.number(), outcome: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const bet = await ctx.db.query.bets.findFirst({
        where: and(eq(bets.id, input.betId), eq(bets.status, "active")),
      });
      if (!bet) throw new TRPCError({ code: "NOT_FOUND" });
      const won = bet.predictedOutcome === input.outcome;
      const payout = won ? bet.amount * 2 : 0;
      await ctx.db.transaction(async (tx) => {
        if (won) {
          await tx
            .update(userWallets)
            .set({ trumpbucksBalance: sql`${userWallets.trumpbucksBalance} + ${payout}` })
            .where(eq(userWallets.clerkUserId, bet.userId));
        }
        await tx
          .update(bets)
          .set({ status: won ? "won" : "lost", resolvedAt: new Date() })
          .where(eq(bets.id, bet.id));
      });
      return { success: true };
    }),
  myBets: t.procedure.use(isAuthed).query(async ({ ctx }) => {
    return ctx.db.query.bets.findMany({
      where: eq(bets.userId, ctx.userId),
      with: { prophecyPhrase: true },
      orderBy: (bets, { desc }) => [desc(bets.createdAt)],
    });
  }),
  leaderboard: t.procedure.query(async ({ ctx }) => {
    // Redis sorted set: trumpbucks_leaderboard
    const leaderboard = await ctx.redis.zrange("trumpbucks_leaderboard", 0, 9, {
      withScores: true,
      rev: true,
    });
    return leaderboard;
  }),
});