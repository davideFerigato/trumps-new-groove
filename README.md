<div align="center">
  <img src="apps/web/public/images/logo.png" alt="Trump's New Groove Logo" width="120" />
  <h1>THE TRUMP'S NEW GROOVE</h1>
  <p><em>“Where Every Decree is a Prophecy”</em></p>

  <!-- Dynamic badges (shields.io) -->
  <p>
    <a href="https://trumps-new-groove.vercel.app"><img src="https://img.shields.io/badge/🚀%20Live-trump%E2%80%93groove.vercel.app-gold?style=flat&logo=vercel&logoColor=white" alt="Vercel"/></a>
    <a href="https://github.com/davideFerigato/trumps-new-groove/actions"><img src="https://img.shields.io/github/actions/workflow/status/davideFerigato/trumps-new-groove/ci.yml?branch=main&label=CI%2FCD&logo=github" alt="CI/CD"/></a>
    <img src="https://img.shields.io/badge/typescript-5.3-blue?logo=typescript" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/next.js-15.5-black?logo=next.js" alt="Next.js"/>
    <img src="https://img.shields.io/badge/tailwind-v4-06B6D4?logo=tailwindcss" alt="Tailwind v4"/>
    <img src="https://img.shields.io/badge/tRPC-v11-2596be?logo=trpc" alt="tRPC"/>
    <img src="https://img.shields.io/badge/drizzle-orm-0.33.0-ff6b35?logo=drizzle" alt="Drizzle ORM"/>
    <img src="https://img.shields.io/badge/clerk-auth-6c47ff?logo=clerk" alt="Clerk"/>
    <img src="https://img.shields.io/badge/resend-email-ff4500?logo=resend" alt="Resend"/>
    <img src="https://img.shields.io/badge/vitest-tests-6e9f18?logo=vitest" alt="Vitest"/>
    <img src="https://img.shields.io/badge/playwright-e2e-45ba4b?logo=playwright" alt="Playwright"/>
    <img src="https://img.shields.io/badge/license-MIT-green" alt="License"/>
    <img src="https://img.shields.io/badge/GDPR-compliant-2ea44f?logo=shield" alt="GDPR Compliant"/>
    <img src="https://img.shields.io/badge/i18n-5_languages-eab308" alt="i18n"/>
    <img src="https://img.shields.io/badge/huggingface-llm-ffd21e?logo=huggingface" alt="Hugging Face"/>
  </p>
</div>

---

## ✨ Features

- **🕹️ Sacred Ritual Button** – Click the central button to generate a new satirical Trump prophecy (Framer Motion animations, gold particles, sound effect).
- **🤖 AI Generation** – Phrases are created on the fly using **Llama 3.1** via Hugging Face Inference API, with automatic fallback to a local generator of 160+ predefined phrases.
- **🌍 Internationalization** – 5 supported languages: English, Italian, Spanish, French, Japanese. Language selector in the header.
- **🔒 GDPR Compliant** – Dedicated `/privacy`, `/cookies`, and `/terms` pages. GDPR Rights section in the user profile (export data, delete account). Cookie policy with only technical cookies. Double opt‑in newsletter with easy unsubscribe. Full compliance with EU regulations.
- **🔐 Authentication** – Login with Google or GitHub via Clerk. Protection of `/profile`, `/betting`, `/admin` routes.
- **👤 User Profile** – TrumpBucks wallet, click history, earned badges.
- **🏅 Badges** – 5 automatically unlockable badges (First Click, Click Addict, True Believer, Prophet, Whale).
- **🎰 Betting System** – Bet TrumpBucks on the Prophecy of the Week or on any generated phrase (YES/NO). Search bar to filter bets.
- **🛡️ Admin Panel** – Dashboard with aggregated statistics (users, volume wagered, subscribers), bet resolution, global prophecy counter.
- **📧 Newsletter** – Email subscription, double opt‑in confirmation, imperial‑style welcome email. Managed via Resend.
- **🎨 Aztec/Gold Theme** – Design inspired by Maya/Aztec civilizations and the movie "The Emperor's New Groove". Cinzel Decorative font, stepped borders, gold shimmer, default dark mode.
- **🌗 Dark/Light Mode** – Toggle with custom icons (Aztec sun / feathered moon). System preference respected.
- **🔊 Sound Effects** – Imperial fanfare on click (can be toggled on/off).
- **📊 Analytics** – Admin dashboard with key metrics (users, bets, volume, subscribers).
- **⏰ Cron Job** – Prophecy of the Week automatically selected every Monday via Vercel Cron.
- **🧪 Testing** – Unit and integration tests with Vitest, end‑to‑end tests with Playwright.
- **🚀 CI/CD** – GitHub Actions pipeline (lint, typecheck, test, build) and automatic deployment on Vercel.
- **📦 Monorepo** – Managed with Turborepo and pnpm workspaces: `apps/web`, `packages/*`, `tooling/*`.

---

## 🏛️ Technology Stack

| Category | Technology |
|-----------|------------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS v4, Framer Motion |
| Backend API | tRPC v11 integrated in Next.js, Hono (only if a separate layer is needed) |
| Database | PostgreSQL on Supabase (free tier), Drizzle ORM + Drizzle Kit for migrations |
| Cache / Rate limit | Upstash Redis (global click counter, daily rate limit, leaderboard) |
| Authentication | Clerk (Google + GitHub OAuth, admin roles) |
| Email | Resend (confirmation and welcome emails) |
| AI | Hugging Face Inference API (Llama 3.1 model) |
| Monorepo | Turborepo 2.x, pnpm 10.x |
| Testing | Vitest (unit/integration), Playwright (e2e) |
| CI/CD | GitHub Actions (lint, typecheck, test, build) + Vercel (deploy) |
| Monitoring | Sentry (error tracking), PostHog (analytics) – configurable |
| Linting/Formatting | ESLint 10 (flat config), Prettier, Biome |
| State management | Zustand |
| Form validation | React Hook Form + Zod |
| Internationalization | Custom React Context + JSON dictionaries (5 languages) |
| Icons | Lucide React |
| Payment system | TrumpBucks virtual currency (not real money) |
| Search | Client‑side search bar for filtering bets |
| Optional add‑ons | Dark mode, sound effects, cron job, admin statistics |

### 🔧 Complete list of technologies

- **Node.js** 20+
- **pnpm** 10+
- **Next.js** 15 (App Router)
- **React** 19
- **TypeScript** 5 (strict mode)
- **Tailwind CSS** v4
- **Framer Motion** 11
- **Lucide React** (icons)
- **Zustand** (state management)
- **React Hook Form** + **Zod** (form validation)
- **tRPC** v11 (type‑safe API)
- **Clerk** (authentication)
- **Resend** (transactional emails)
- **PostgreSQL** (Supabase free tier)
- **Drizzle ORM** + **Drizzle Kit** (type‑safe queries, migrations)
- **Upstash Redis** (caching, rate limiting, leaderboard)
- **Hugging Face Inference API** (LLM phrase generation)
- **Vitest** (unit/integration tests)
- **Playwright** (end‑to‑end tests)
- **Turborepo** (monorepo management)
- **ESLint** 10 (flat config)
- **Prettier**
- **Biome** (optional, for additional linting)
- **GitHub Actions** (CI/CD)
- **Vercel** (deployment)
- **Docker + Docker Compose** (local development environment)
- **Sentry** (error monitoring, configurable)
- **PostHog** (analytics, configurable)

---

## 📁 Project structure (monorepo)

```
trumps-new-groove/
├── apps/
│   └── web/                # Next.js 15 App Router
│       ├── src/
│       │   ├── app/         # Route pages (layout, home, profile, betting, admin, bet, api)
│       │   ├── components/  # Reusable components (ui/, Header, Footer, TheButton, ...)
│       │   ├── hooks/       # useTranslation, useSound, useGlobalClicks, ...
│       │   ├── lib/         # tRPC client, db, redis, utils
│       │   ├── store/       # Zustand store (sound)
│       │   ├── translations # Multilingual JSON files
│       │   └── styles/      # globals.css
│       ├── e2e/             # Playwright end‑to‑end tests
│       └── ...config files
├── packages/
│   ├── api/                 # tRPC routers, context, middleware
│   ├── db/                  # Drizzle schema, client, seed
│   ├── config/              # Environment variable validation (Zod)
│   ├── emails/              # React Email templates (moved internally to api)
│   └── ui/                  # (optional) Shared design system
├── tooling/
│   ├── typescript-config/   # Shared TypeScript configuration
│   ├── eslint-config/       # Shared ESLint configuration (flat config)
│   └── prettier-config/     # Shared Prettier configuration
├── docker/
│   └── docker-compose.yml   # PostgreSQL + Redis for local development
├── .github/
│   └── workflows/
│       └── ci.yml           # CI/CD pipeline
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## 🚀 How to run the project locally

### Prerequisites
- **Node.js** 20+
- **pnpm** 10+ (`curl -fsSL https://get.pnpm.io/install.sh | sh -`)
- **Docker** Desktop (for PostgreSQL and Redis)
- A [Clerk](https://clerk.com) account (for API keys)
- A [Upstash](https://upstash.com) account (for Redis)
- A [Supabase](https://supabase.com) account (for remote database) – for local development Docker is used
- (Optional) [Resend](https://resend.com) account for email sending
- (Optional) [Hugging Face](https://huggingface.co) account with inference token for AI generation

### 1. Clone the repository
```bash
git clone https://github.com/davideFerigato/trumps-new-groove.git
cd trumps-new-groove
```

### 2. Configure environment variables
Copy `.env.example` to `.env` and fill in all variables.
```bash
cp .env.example .env
```

**Required variables:**
- `DATABASE_URL` – PostgreSQL connection string (for local development use `postgresql://trump:groove@localhost:5432/trumpsnewgroove`)
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` – Upstash credentials
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` – from Clerk Dashboard
- `CRON_SECRET` – a secret string to protect the cron job endpoint

**Optional variables:**
- `RESEND_API_KEY` – to send newsletter confirmation emails
- `HUGGINGFACE_API_KEY` and `HUGGINGFACE_MODEL` – to enable AI phrase generation
- `SENTRY_DSN`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` – for monitoring

Copy the same file to `apps/web/.env.local`:
```bash
cp .env apps/web/.env.local
```

### 3. Start Docker services (PostgreSQL + Redis)
```bash
docker compose -f docker/docker-compose.yml up -d
```

### 4. Install dependencies
```bash
pnpm install
```

### 5. Create database tables and seed initial data
```bash
pnpm --filter @repo/db db:push
pnpm --filter @repo/db db:seed
```

### 6. Start the development server
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) and start clicking.

---

## 🧪 Testing

### Unit & Integration
```bash
pnpm run test
```
Runs tests with Vitest for both tRPC routers (`packages/api`) and React components (`apps/web`).

### End-to-End (Playwright)
Make sure the development server is running (`pnpm dev`), then:
```bash
cd apps/web
pnpm exec playwright test
cd ../..
```

---

## 📨 Newsletter and Email

The newsletter system sends confirmation and welcome emails using Resend.  
Templates are written with `@react-email/components` and reside internally in `packages/api/src/email-templates/`.

To send emails to real recipients you need to:
1. Set `RESEND_API_KEY` in the `.env` file.
2. Verify a domain on Resend (alternatively, use your own account email as recipient).

---

## 🤖 AI Generation

If the `HUGGINGFACE_API_KEY` variable is configured, the system will attempt to generate satirical phrases using the Hugging Face API (`meta-llama/Llama-3.1-8B-Instruct` model or the one set in `HUGGINGFACE_MODEL`).  
In case of error or if the key is not present, a local generator that randomly combines absurd subjects, actions and objects is used, always guaranteeing a funny phrase.

---

## 👑 Admin Panel

To access the admin, add your Clerk `userId` in the `ADMIN_USER_IDS` variable (and `NEXT_PUBLIC_ADMIN_USER_IDS` for the frontend).  
The admin can:
- View the global prophecy counter
- View aggregated statistics (users, bets, volume, subscribers)
- Resolve active bets (Mark TRUE / Mark FALSE)

---

## 🌍 Internationalization

The site supports 5 languages. Translation files are located in `apps/web/src/translations/`.  
To add a new language, create a new JSON file with the same keys.  
The language selector in the header persists the choice in `localStorage`.

---

## 🔒 GDPR Compliance

The project is designed to respect the General Data Protection Regulation (GDPR) of the European Union.

- **Data Controller:** Davide Ferigato (contact: davide.ferigato@email.com).
- **Personal Data Collected:** name, email, profile picture (provided by Clerk during OAuth), IP address, browser info, game data (TrumpBucks, clicks, bets, badges), and newsletter subscription email.
- **Purpose of Processing:** providing the core service (authentication, game mechanics), sending the newsletter (only with explicit consent), and ensuring site security.
- **Legal Basis:** Consent (for newsletter) and Legitimate Interest (for site operation).
- **Data Retention:** Data is kept until the user requests deletion. Newsletter data is kept until unsubscription.
- **Data Processors:** Clerk (auth, USA, with standard contractual clauses), Supabase (database, EU region), Upstash (Redis, EU region), Resend (email, USA), Vercel (hosting, USA).
- **User Rights:** Access, Rectification, Erasure ("Right to be Forgotten"), Restriction, Portability, Objection, and Withdrawal of Consent. All rights are exercisable via the profile page (GDPR Rights section) or by email.
- **Cookie Policy:** The site uses only technical cookies (Clerk for authentication) and localStorage for preferences (language/theme). No profiling or third‑party cookies are used. See the dedicated `/cookies` page.
- **Data Breach Procedure:** In the unlikely event of a data breach, affected users will be notified within 72 hours.

Full privacy, cookie, and terms pages are accessible from the footer.

---

## 🚦 CI/CD

Every push to the `main` branch triggers the GitHub Actions pipeline:
1. **Lint** – `pnpm run lint` (ESLint flat config)
2. **Typecheck** – `pnpm run typecheck` (TypeScript strict)
3. **Test** – `pnpm run test` (Vitest)
4. **Build** – `pnpm run build` (Next.js production build)

If all steps pass, Vercel automatically deploys the application.
