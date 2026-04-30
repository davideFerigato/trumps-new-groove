import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { isAuthed } from "../middleware/auth";
import { userWallets, userBadges, badges } from "@repo/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const userRouter = t.router({
  profile: publicProcedure.use(isAuthed).query(async ({ ctx }) => {
    const rows = await ctx.db
      .select()
      .from(userWallets)
      .where(eq(userWallets.clerkUserId, ctx.userId))
      .limit(1);

    const wallet = rows[0];
    return {
      trumpbucksBalance: wallet?.trumpbucksBalance ?? 0,
      totalClicks: wallet?.totalClicks ?? 0,
    };
  }),

  badges: publicProcedure.use(isAuthed).query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        id: badges.id,
        name: badges.name,
        description: badges.description,
        imageUrl: badges.imageUrl,
      })
      .from(userBadges)
      .innerJoin(badges, eq(userBadges.badgeId, badges.id))
      .where(eq(userBadges.userId, ctx.userId));

    return rows;
  }),
});