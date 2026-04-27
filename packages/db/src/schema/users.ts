import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const userWallets = pgTable("user_wallets", {
  clerkUserId: text("clerk_user_id").primaryKey(),
  trumpbucksBalance: integer("trumpbucks_balance").notNull().default(0),
  totalClicks: integer("total_clicks").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});