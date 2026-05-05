import { NextResponse } from "next/server";
import { db } from "@repo/db/client";
import { phrases } from "@repo/db/schema";
import { eq, sql } from "drizzle-orm";

function getMonday(): string {
  const d = new Date();
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.toISOString().split("T")[0];
}

export async function GET(req: Request) {
  console.log("CRON_SECRET from env:", process.env.CRON_SECRET);
  // Controllo del secret
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const monday = getMonday();

  // Verifica se esiste già una profezia per questa settimana
  const existing = await db
    .select()
    .from(phrases)
    .where(eq(phrases.weekStart, monday))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json({ message: "Prophecy already set for this week" });
  }

  // Scegli una frase casuale non già usata come profezia
  const randomPhrases = await db
    .select()
    .from(phrases)
    .where(eq(phrases.isProphecy, false))
    .orderBy(sql`RANDOM()`)
    .limit(1);

  if (randomPhrases.length > 0) {
    await db
      .update(phrases)
      .set({ isProphecy: true, weekStart: monday })
      .where(eq(phrases.id, randomPhrases[0].id));
    return NextResponse.json({
      message: "Prophecy of the week set!",
      phrase: randomPhrases[0].text,
    });
  }

  return NextResponse.json({ message: "No available phrases" }, { status: 500 });
}