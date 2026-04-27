# Trump's New Groove

A satirical single‑page app where you click a button to generate absurd Trump phrases, bet fictional TrumpBucks, and subscribe to a weekly prophecy.

## Tech Stack
- Next.js 15, TypeScript, Tailwind v4, tRPC, Clerk, Drizzle, Upstash Redis, Resend, Turborepo

## Local Development

1. Install pnpm and Docker.
2. Clone repo, run `pnpm install`.
3. Copy `.env.example` to `.env` and fill secrets.
4. Start Docker services: `docker compose -f docker/docker-compose.yml up -d`
5. Push DB schema: `pnpm db:push`
6. Seed phrases: `pnpm db:seed`
7. Run dev: `pnpm dev`
8. Open http://localhost:3000

## Scripts
- `pnpm dev` — starts all apps
- `pnpm build` — production build
- `pnpm lint` — lint all packages
- `pnpm test` — unit + e2e