import { z } from "zod";
import { t } from "../trpc";
import { isAuthed } from "../middleware/auth";
import { userWallets, bets, userBadges, subscribers } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs/server";

export const gdprRouter = t.router({
  exportData: t.procedure
    .use(isAuthed)
    .query(async ({ ctx }) => {
      const userId = ctx.userId;

      // Dati da Supabase
      const [wallet, userBets, userBadgeList, subscription] = await Promise.all([
        ctx.db.select().from(userWallets).where(eq(userWallets.clerkUserId, userId)).limit(1),
        ctx.db.select().from(bets).where(eq(bets.userId, userId)),
        ctx.db.select().from(userBadges).where(eq(userBadges.userId, userId)),
        ctx.db.select().from(subscribers).where(eq(subscribers.userId, userId)).limit(1),
      ]);

      // Dati da Clerk
      const clerk = await clerkClient();
      const clerkUser = await clerk.users.getUser(userId);

      return {
        profile: {
          id: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress,
          name: `${clerkUser.firstName} ${clerkUser.lastName}`,
          imageUrl: clerkUser.imageUrl,
        },
        wallet: wallet[0] ?? null,
        bets: userBets,
        badges: userBadgeList,
        newsletter: subscription[0] ?? null,
      };
    }),

  deleteAccount: t.procedure
    .use(isAuthed)
    .mutation(async ({ ctx }) => {
      const userId = ctx.userId;

      // Cancella dati da Supabase
      await ctx.db.delete(userWallets).where(eq(userWallets.clerkUserId, userId));
      await ctx.db.delete(bets).where(eq(bets.userId, userId));
      await ctx.db.delete(userBadges).where(eq(userBadges.userId, userId));
      await ctx.db.delete(subscribers).where(eq(subscribers.userId, userId));

      // Cancella account Clerk
      const clerk = await clerkClient();
      await clerk.users.deleteUser(userId);

      return { success: true };
    }),
});