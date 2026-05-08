# Trump's New Groove

A satirical web app where you click a button to generate absurd Trump prophecies, bet fictional TrumpBucks, and subscribe to weekly prophecies.

## Tech Stack
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **Backend:** tRPC v11, Clerk (auth), Upstash Redis (caching/rate limiting)
- **Database:** PostgreSQL (Supabase), Drizzle ORM
- **Email:** Resend (optional)
- **Monorepo:** Turborepo, pnpm workspaces
- **Deployment:** Vercel, Docker (local dev)

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 10+
- Docker (for local PostgreSQL & Redis)

### Installation
1. Clone the repository
2. Copy `.env.example` to `.env` and fill in the required variables
3. Install dependencies: `pnpm install`
4. Start Docker services: `docker compose -f docker/docker-compose.yml up -d`
5. Push database schema: `pnpm --filter @repo/db db:push`
6. Seed the database: `pnpm --filter @repo/db db:seed`
7. Start development server: `pnpm dev`

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure
- `apps/web` – Next.js application
- `packages/api` – tRPC routers and middleware
- `packages/db` – Drizzle ORM schema and client
- `packages/config` – Environment variable validation (Zod)
- `packages/emails` – Email templates (React Email)
- `tooling/` – Shared TypeScript, ESLint, Prettier configurations

## Features
- Random satire phrase generator
- Live global click counter (Redis)
- TrumpBucks virtual currency system
- Weekly prophecy betting
- User profiles with badges
- Newsletter subscription
- Admin panel for resolving bets
- Dark/light Aztec-inspired theme

## Deployment
Deployed on Vercel with automated CI/CD via GitHub Actions.