# 🏛️ Architecture Diagram (C4 – Container Level)

```mermaid
C4Container
    title Container diagram for Trump's New Groove

    Person(user, "User", "Browser/mobile")

    System_Boundary(platform, "Vercel Platform") {
        Container(web, "Next.js Frontend", "React 19, Tailwind CSS v4", "Serves UI, handles routing, manages state")
        Container(trpc, "tRPC API", "Node.js, Bun", "Type‑safe backend logic, procedures, rate limiting")
    }

    System_Boundary(external, "External Services") {
        Container(clerk, "Clerk Auth", "SaaS", "User authentication, OAuth, session management")
        Container(supabase, "Supabase", "PostgreSQL", "Persistent data: users, bets, badges, newsletter")
        Container(upstash, "Upstash Redis", "Redis", "Global click counter, rate limiter, leaderboard")
        Container(resend, "Resend", "Email API", "Send confirmation & welcome emails")
        Container(huggingface, "Hugging Face Inference", "REST API", "Generate satirical phrases via LLM (Llama 3.1)")
    }

    Container(local, "Local Fallback Generator", "Node.js module", "Generates phrases from 160+ templates if LLM fails")

    Rel(user, web, "Visits", "HTTPS")
    Rel(user, clerk, "Login", "OAuth redirect")
    Rel(web, trpc, "API calls", "tRPC over HTTP/2")
    Rel(web, clerk, "Auth state", "JWT session")
    Rel(trpc, clerk, "Verify session", "REST")
    Rel(trpc, supabase, "Read/write data", "PostgreSQL")
    Rel(trpc, upstash, "Get/update counters, rate limit", "REST")
    Rel(trpc, resend, "Send emails", "REST")
    Rel(trpc, huggingface, "Generate phrase", "REST")
    Rel(trpc, local, "Fallback phrase", "Module import")
    Rel(platform, trpc, "Weekly cron", "Vercel Cron → /api/cron/prophecy")
```

## Explanation

The diagram follows the **C4 model – Container level**, showing the system's main runtime containers and their interactions.

- **User** interacts only with the Next.js frontend and Clerk (for login).
- **Next.js Frontend** is a static site served by Vercel; all dynamic data comes through the **tRPC API**.
- **tRPC API** is the core backend, running as Next.js API routes. It orchestrates all business logic and communicates with external services:
  - **Clerk** for authentication and session verification.
  - **Supabase** for persistent storage (user wallets, bets, badges, newsletter subscriptions).
  - **Upstash Redis** for real‑time counters and rate limiting.
  - **Resend** for transactional emails (newsletter confirmation/welcome).
  - **Hugging Face Inference API** to generate AI‑powered satirical phrases. If that API fails, a **Local Fallback Generator** ensures the user always gets a funny phrase.
- **Vercel Cron** triggers a weekly endpoint to select a new "Prophecy of the Week".

All external services are SaaS products, chosen for their free tiers and developer experience, making the project self‑contained and easy to deploy.
