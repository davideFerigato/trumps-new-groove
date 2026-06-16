# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@10

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/api/package.json ./packages/api/
COPY packages/config/package.json ./packages/config/
COPY packages/db/package.json ./packages/db/
COPY tooling/typescript-config/package.json ./tooling/typescript-config/

RUN pnpm install --frozen-lockfile

COPY . .

# Argomento di build per la chiave pubblica Clerk (da passare con --build-arg)
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}

# Altre variabili fittizie per la build
ENV DATABASE_URL=postgresql://user:pass@localhost:5432/db
ENV UPSTASH_REDIS_REST_URL=https://example.com
ENV UPSTASH_REDIS_REST_TOKEN=dummy
ENV CLERK_SECRET_KEY=dummy
ENV CRON_SECRET=dummy
ENV RESEND_API_KEY=dummy
ENV HUGGINGFACE_API_KEY=dummy
ENV HUGGINGFACE_MODEL=dummy
ENV SENTRY_DSN=https://sentry.example.com
ENV NEXT_PUBLIC_POSTHOG_KEY=dummy
ENV NEXT_PUBLIC_POSTHOG_HOST=https://example.com

RUN pnpm run build

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
RUN npm install -g pnpm@10
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/packages ./packages
EXPOSE 3000
CMD ["node", "apps/web/server.js"]