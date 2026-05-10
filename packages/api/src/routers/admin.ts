import { t } from "../trpc";
import { isAdmin } from "../middleware/auth";
import { userWallets, bets, subscribers } from "@repo/db/schema";
import { sql } from "drizzle-orm";

export const adminRouter = t.router({
  stats: t.procedure.use(isAdmin).query(async ({ ctx }) => {
    // Numero totale di utenti (wallet)
    const userCountRow = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(userWallets);
    const totalUsers = userCountRow[0]?.count ?? 0;

    // Numero totale di scommesse
    const betCountRow = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(bets);
    const totalBets = betCountRow[0]?.count ?? 0;

    // Volume totale scommesso (somma degli importi)
    const volumeRow = await ctx.db
      .select({ total: sql<number>`coalesce(sum(${bets.amount}), 0)` })
      .from(bets);
    const totalVolume = volumeRow[0]?.total ?? 0;

    // Iscritti newsletter confermati
    const subCountRow = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(subscribers)
      .where(sql`${subscribers.confirmed} = true`);
    const totalSubscribers = subCountRow[0]?.count ?? 0;

    return {
      totalUsers,
      totalBets,
      totalVolume,
      totalSubscribers,
    };
  }),
});