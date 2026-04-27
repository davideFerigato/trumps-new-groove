import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { phrases } from "./phrases";
import { userWallets } from "./users";

export const bets = pgTable("bets", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => userWallets.clerkUserId).notNull(),
  prophecyPhraseId: integer("prophecy_phrase_id").references(() => phrases.id).notNull(),
  amount: integer("amount").notNull(),
  predictedOutcome: boolean("predicted_outcome").notNull(), // true = YES
  status: text("status", { enum: ["active", "won", "lost", "cancelled"] })
    .notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  resolvedAt: timestamp("resolved_at"),
});