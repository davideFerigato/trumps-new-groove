import { eq, and } from "drizzle-orm";
import type { Context } from "../context";
import { badges, userBadges, userWallets } from "@repo/db/schema";

/**
 * Assegna un badge a un utente se non lo possiede già.
 * Restituisce true se il badge è stato assegnato, false altrimenti.
 */
export async function tryAwardBadge(
  db: Context["db"],
  userId: string,
  badgeName: string
): Promise<boolean> {
  // Trova il badge per nome
  const badgeRows = await db
    .select()
    .from(badges)
    .where(eq(badges.name, badgeName))
    .limit(1);

  if (badgeRows.length === 0) return false;
  const badgeId = badgeRows[0].id;

  // Controlla se già posseduto
  const existing = await db
    .select()
    .from(userBadges)
    .where(
      and(
        eq(userBadges.userId, userId),
        eq(userBadges.badgeId, badgeId)
      )
    )
    .limit(1);

  if (existing.length > 0) return false;

  // Assegna il badge
  await db.insert(userBadges).values({
    userId,
    badgeId,
  });

  return true;
}