import { pgTable, text, boolean, date, serial } from "drizzle-orm/pg-core";

export const phrases = pgTable("phrases", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  isProphecy: boolean("is_prophecy").default(false),
  weekStart: date("week_start"), // Monday date for weekly prophecy
});