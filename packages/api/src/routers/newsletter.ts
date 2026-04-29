import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { subscribers, phrases } from "@repo/db/schema";
import { eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { TRPCError } from "@trpc/server";

export const newsletterRouter = t.router({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const token = randomUUID();
      await ctx.db.insert(subscribers).values({
        email: input.email,
        confirmed: false,
        unsubscribeToken: token,
      }).onConflictDoNothing({ target: subscribers.email });
      // Qui invieresti l'email di conferma con Resend
      return { success: true };
    }),
  confirm: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.update(subscribers)
        .set({ confirmed: true })
        .where(eq(subscribers.unsubscribeToken, input.token))
        .returning({ email: subscribers.email });
      if (result.length === 0) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid token" });
      return { success: true, email: result[0].email };
    }),
  unsubscribe: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(subscribers).where(eq(subscribers.unsubscribeToken, input.token));
      return { success: true };
    }),
  count: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.select({ count: sql<number>`count(*)` }).from(subscribers);
    return result[0].count;
  }),
});