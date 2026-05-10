import { z } from "zod";
import { t } from "../trpc";
import { phrases } from "@repo/db/schema";
import { eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { generateLocalPhrase } from "../lib/localGenerator";

export const phrasesRouter = t.router({
  random: t.procedure.query(async ({ ctx }) => {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    const model = process.env.HUGGINGFACE_MODEL;

    // Tenta la generazione con LLM se configurato
    if (apiKey && model) {
      try {
        const { generateSatiricalPhrase } = await import("../lib/huggingface");
        const text = await generateSatiricalPhrase(apiKey, model);
        await ctx.db.insert(phrases).values({ text, isProphecy: false }).onConflictDoNothing();
        const inserted = await ctx.db
          .select()
          .from(phrases)
          .where(eq(phrases.text, text))
          .limit(1);
        if (inserted.length > 0) return inserted[0];
        return { id: 0, text, isProphecy: false, weekStart: null };
      } catch (error) {
        console.error("LLM generation failed, falling back to local generator:", error);
      }
    }

    // Generazione locale come fallback (o default)
    try {
      const text = generateLocalPhrase();
      await ctx.db.insert(phrases).values({ text, isProphecy: false }).onConflictDoNothing();
      const inserted = await ctx.db
        .select()
        .from(phrases)
        .where(eq(phrases.text, text))
        .limit(1);
      if (inserted.length > 0) return inserted[0];
      return { id: 0, text, isProphecy: false, weekStart: null };
    } catch (error) {
      console.error("Local generation failed, falling back to database:", error);
    }

    // Ultimo fallback: selezione casuale dal DB
    const result = await ctx.db
      .select()
      .from(phrases)
      .where(eq(phrases.isProphecy, false))
      .orderBy(sql`RANDOM()`)
      .limit(1);
    if (!result[0]) throw new TRPCError({ code: "NOT_FOUND", message: "No phrases available" });
    return result[0];
  }),

  prophecyOfWeek: t.procedure.query(async ({ ctx }) => {
    const monday = getMonday();
    const result = await ctx.db
      .select()
      .from(phrases)
      .where(eq(phrases.weekStart, monday))
      .limit(1);
    return result[0] ?? null;
  }),

  getById: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(phrases)
        .where(eq(phrases.id, input.id))
        .limit(1);
      if (!result[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Phrase not found" });
      return result[0];
    }),
});

function getMonday(): string {
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.toISOString().split("T")[0];
}