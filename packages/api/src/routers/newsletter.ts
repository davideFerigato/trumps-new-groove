import { z } from "zod";
import { t, publicProcedure } from "../trpc";
import { subscribers } from "@repo/db/schema";
import { eq, sql } from "drizzle-orm";
import { randomUUID } from "crypto";
import { TRPCError } from "@trpc/server";
import { Resend } from "resend";
import ConfirmSubscriptionEmail from "@repo/emails/templates/ConfirmSubscription";
import WelcomeEmail from "@repo/emails/templates/Welcome";
import { tryAwardBadge } from "./badges";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:3000`;
}

export const newsletterRouter = t.router({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      const token = randomUUID();
      const userId = ctx.userId ?? null; // utente loggato (opzionale)

      await ctx.db.insert(subscribers).values({
        email: input.email,
        confirmed: false,
        unsubscribeToken: token,
        userId, // salva l'id se l'utente è loggato
      }).onConflictDoNothing({ target: subscribers.email });

      // Invia email di conferma se la chiave è configurata
      if (resend) {
        const confirmationUrl = `${getBaseUrl()}/api/newsletter/confirm?token=${token}`;
        try {
          await resend.emails.send({
            from: "Trump's New Groove <onboarding@resend.dev>",
            to: input.email,
            subject: "Confirm your subscription",
            react: ConfirmSubscriptionEmail({ confirmationUrl }),
          });
        } catch (e) {
          console.error("Errore invio email conferma:", e);
        }
      }

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

      const subscriber = result[0];

      // Se l'iscrizione è associata a un utente, assegna il badge "True Believer"
      if (subscriber.userId) {
        await tryAwardBadge(ctx.db, subscriber.userId, "True Believer");
      }

      if (resend) {
        try {
          await resend.emails.send({
            from: "Trump's New Groove <onboarding@resend.dev>",
            to: subscriber.email,
            subject: "Welcome to Trump's New Groove!",
            react: WelcomeEmail({ email: subscriber.email }),
          });
        } catch (e) {
          console.error("Errore invio email benvenuto:", e);
        }
      }

      return { success: true, email: subscriber.email };
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