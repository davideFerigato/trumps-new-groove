import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { subscribers } from "@repo/db/schema";
import { eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { TRPCError } from "@trpc/server";
// import { resend } from "@repo/emails/send";
// import ConfirmSubscriptionEmail from "@repo/emails/templates/ConfirmSubscription";
// import WelcomeEmail from "@repo/emails/templates/Welcome";
// import { env } from "@repo/config/env";

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:3000`;
}

export const newsletterRouter = t.router({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const token = randomUUID();
      // Inserisci o ignora se già esistente
      await ctx.db.insert(subscribers).values({
        email: input.email,
        confirmed: false,
        unsubscribeToken: token,
      }).onConflictDoNothing({ target: subscribers.email });

      // Email di conferma disabilitata temporaneamente
      // const confirmationUrl = `${getBaseUrl()}/api/newsletter/confirm?token=${token}`;
      // try {
      //   await resend.emails.send({...});
      // } catch (e) {
      //   console.error("Errore invio email conferma:", e);
      // }

      return { success: true };
    }),

  confirm: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .update(subscribers)
        .set({ confirmed: true })
        .where(eq(subscribers.unsubscribeToken, input.token))
        .returning({ email: subscribers.email });

      if (result.length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid token" });
      }

      // Email di benvenuto disabilitata temporaneamente
      // try {
      //   await resend.emails.send({...});
      // } catch (e) {
      //   console.error("Errore invio email benvenuto:", e);
      // }

      return { success: true, email: result[0].email };
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