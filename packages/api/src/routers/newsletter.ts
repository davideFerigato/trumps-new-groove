import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { subscribers } from "@repo/db/schema";
import { eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { TRPCError } from "@trpc/server";
import { tryAwardBadge } from "./badges";

// L'invio email verrà riabilitato quando avremo configurato la build di @repo/emails
// per ora usiamo solo la logica di database

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:3000`;
}

export const newsletterRouter = t.router({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const token = randomUUID();
      const userId = ctx.userId ?? null;

      await ctx.db.insert(subscribers).values({
        email: input.email,
        confirmed: false,
        unsubscribeToken: token,
        userId,
      }).onConflictDoNothing({ target: subscribers.email });

      // In futuro riattiveremo l'invio email con Resend + @repo/emails
      // if (resend) { ... }

      return { success: true };
    }),

  confirm: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(subscribers)
        .set({ confirmed: true })
        .where(eq(subscribers.unsubscribeToken, input.token))
        .returning({ email: subscribers.email, userId: subscribers.userId });

      if (result.length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid token" });
      }

      const sub = result[0];

      // Assegna badge True Believer se l'utente era loggato
      if (sub.userId) {
        await tryAwardBadge(ctx.db, sub.userId, "True Believer");
      }

      // In futuro riattiveremo l'invio email di benvenuto
      // if (resend) { ... }

      return { success: true, email: sub.email };
    }),

  unsubscribe: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(subscribers).where(eq(subscribers.unsubscribeToken, input.token));
      return { success: true };
    }),

  count: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(subscribers)
      .where(eq(subscribers.confirmed, true));
    return result[0].count;
  }),
});