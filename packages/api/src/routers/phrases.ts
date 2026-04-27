import { z } from "zod";
import { t } from "../trpc";
import { phrases } from "@repo/db/schema";
import { eq, sql } from "drizzle-orm";

export const phrasesRouter = t.router({
  random: t.procedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(phrases)
      .where(eq(phrases.isProphecy, false))
      .orderBy(sql`RANDOM()`)
      .limit(1);
    if (!result[0]) throw new TRPCError({ code: "NOT_FOUND" });
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
});

function getMonday(): string {
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.toISOString().split("T")[0];
}