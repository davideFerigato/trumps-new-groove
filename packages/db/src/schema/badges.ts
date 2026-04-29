import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { userWallets } from "./users";

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
});

export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => userWallets.clerkUserId).notNull(),
  badgeId: integer("badge_id").references(() => badges.id).notNull(),
  awardedAt: timestamp("awarded_at").defaultNow().notNull(),
});
