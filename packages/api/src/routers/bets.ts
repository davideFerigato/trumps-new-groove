import { z } from "zod";
import { t } from "../trpc";
import { isAuthed, isAdmin } from "../middleware/auth";
import { bets, phrases, userWallets } from "@repo/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { tryAwardBadge } from "./badges";

export const betsRouter = t.router({
  // Piazzare una scommessa
  placeBet: t.procedure
    .use(isAuthed)
    .input(
      z.object({
        prophecyId: z.number(),
        amount: z.number().min(1),
        prediction: z.boolean(), // true = YES, false = NO
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Controlla il saldo
      const wallet = await ctx.db
        .select({ balance: userWallets.trumpbucksBalance })
        .from(userWallets)
        .where(eq(userWallets.clerkUserId, ctx.userId))
        .limit(1);

      if (!wallet[0] || wallet[0].balance < input.amount) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Insufficient TrumpBucks",
        });
      }

      await ctx.db.transaction(async (tx) => {
        // Deduci l'importo
        await tx
          .update(userWallets)
          .set({
            trumpbucksBalance: sql`${userWallets.trumpbucksBalance} - ${input.amount}`,
          })
          .where(eq(userWallets.clerkUserId, ctx.userId));

        // Inserisci la scommessa
        await tx.insert(bets).values({
          userId: ctx.userId,
          prophecyPhraseId: input.prophecyId,
          amount: input.amount,
          predictedOutcome: input.prediction,
          status: "active",
        });
      });

      // Aggiorna la leaderboard su Redis (saldo diminuito)
      const newBalance = wallet[0].balance - input.amount;
      await ctx.redis.zadd("trumpbucks_leaderboard", {
        member: ctx.userId,
        score: newBalance,
      });

      return { success: true };
    }),

  // Risolvi una scommessa (solo admin)
  resolveBet: t.procedure
    .use(isAdmin)
    .input(
      z.object({
        betId: z.number(),
        outcome: z.boolean(), // true = la profezia si è avverata (YES), false = non si è avverata (NO)
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Trova la scommessa attiva
      const betRows = await ctx.db
        .select()
        .from(bets)
        .where(and(eq(bets.id, input.betId), eq(bets.status, "active")))
        .limit(1);

      if (betRows.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Active bet not found" });
      }

      const bet = betRows[0];
      const won = bet.predictedOutcome === input.outcome;
      const payout = won ? bet.amount * 2 : 0;

      await ctx.db.transaction(async (tx) => {
        if (won) {
          // Accredita la vincita
          await tx
            .update(userWallets)
            .set({
              trumpbucksBalance: sql`${userWallets.trumpbucksBalance} + ${payout}`,
            })
            .where(eq(userWallets.clerkUserId, bet.userId));
        }

        // Aggiorna lo stato della scommessa
        await tx
          .update(bets)
          .set({
            status: won ? "won" : "lost",
            resolvedAt: new Date(),
          })
          .where(eq(bets.id, bet.id));
      });

      // Aggiorna la leaderboard su Redis (saldo eventualmente aumentato)
      const newWallet = await ctx.db
        .select({ balance: userWallets.trumpbucksBalance })
        .from(userWallets)
        .where(eq(userWallets.clerkUserId, bet.userId))
        .limit(1);

      if (newWallet[0]) {
        await ctx.redis.zadd("trumpbucks_leaderboard", {
          member: bet.userId,
          score: newWallet[0].balance,
        });
      }

      // Assegnazione badge "Prophet" se l'utente ha vinto almeno 5 scommesse
      if (won) {
        const wonCount = await ctx.db
          .select({ count: sql<number>`count(*)` })
          .from(bets)
          .where(
            and(
              eq(bets.userId, bet.userId),
              eq(bets.status, "won")
            )
          );

        if (wonCount[0].count >= 5) {
          await tryAwardBadge(ctx.db, bet.userId, "Prophet");
        }
      }

      return { success: true };
    }),

  // Scommesse attive (solo admin)
  activeBets: t.procedure.use(isAdmin).query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        id: bets.id,
        userId: bets.userId,
        amount: bets.amount,
        predictedOutcome: bets.predictedOutcome,
        status: bets.status,
        createdAt: bets.createdAt,
        phraseId: phrases.id,
        phraseText: phrases.text,
      })
      .from(bets)
      .innerJoin(phrases, eq(bets.prophecyPhraseId, phrases.id))
      .where(eq(bets.status, "active"))
      .orderBy(bets.createdAt);

    return rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      amount: r.amount,
      predictedOutcome: r.predictedOutcome,
      status: r.status,
      createdAt: r.createdAt,
      prophecyPhrase: {
        id: r.phraseId,
        text: r.phraseText,
      },
    }));
  }),

  // Scommesse dell'utente corrente
  myBets: t.procedure.use(isAuthed).query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        id: bets.id,
        amount: bets.amount,
        predictedOutcome: bets.predictedOutcome,
        status: bets.status,
        createdAt: bets.createdAt,
        resolvedAt: bets.resolvedAt,
        phraseText: phrases.text,
      })
      .from(bets)
      .innerJoin(phrases, eq(bets.prophecyPhraseId, phrases.id))
      .where(eq(bets.userId, ctx.userId))
      .orderBy(bets.createdAt);

    return rows;
  }),

  // Classifica globale
  leaderboard: t.procedure.query(async ({ ctx }) => {
    const top = await ctx.redis.zrange("trumpbucks_leaderboard", 0, 9, {
      withScores: true,
      rev: true,
    });

    // top è un array alternato [member1, score1, member2, score2, ...]
    const result: { userId: string; score: number }[] = [];
    for (let i = 0; i < top.length; i += 2) {
      result.push({
        userId: top[i] as string,
        score: Number(top[i + 1]),
      });
    }
    return result;
  }),
});