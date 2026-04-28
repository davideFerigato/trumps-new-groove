import { t } from "../trpc";
import { phrasesRouter } from "./phrases";
import { clicksRouter } from "./clicks";
import { betsRouter } from "./bets";
import { userRouter } from "./user";
import { newsletterRouter } from "./newsletter";

export const appRouter = t.router({
  phrases: phrasesRouter,
  clicks: clicksRouter,
  bets: betsRouter,
  user: userRouter,
  newsletter: newsletterRouter,
});

export type AppRouter = typeof appRouter;