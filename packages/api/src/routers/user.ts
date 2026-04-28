import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { isAuthed } from "../middleware/auth";
import { userWallets, userBadges, badges } from "@repo/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const userRouter = t.router({
  profile: publicProcedure.use(isAuthed).query(async ({ ctx }) => {
    const wallet = await ctx.db.query.userWallets.findFirst({
      where: eq(userWallets.clerkUserId, ctx.userId),
    });
    return wallet ?? { trumpbucksBalance: 0, totalClicks: 0 };
  }),
  badges: publicProcedure.use(isAuthed).query(async ({ ctx }) => {
    const userBadgeList = await ctx.db.query.userBadges.findMany({
      where: eq(userBadges.userId, ctx.userId),
      with: { badge: true },
    });
    return userBadgeList.map(ub => ub.badge);
  }),
  // ... eventuali altre procedure per assegnare automaticamente badge
});