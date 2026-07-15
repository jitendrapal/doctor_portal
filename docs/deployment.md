# Deployment Guide

## Local Dev

1. Copy `.env.example` to `.env`.
2. Start infra: `pnpm docker:up`
3. Install deps: `pnpm install`
4. Generate Prisma client: `pnpm --filter @medconnect/backend prisma:generate`
5. Run migrations and seed:
   - `pnpm --filter @medconnect/backend prisma:migrate`
   - `pnpm --filter @medconnect/backend seed`
6. Run apps: `pnpm dev`

## Frontend

- Recommended: Vercel
- Local dev command: `corepack pnpm dev:frontend`
- Build command: `corepack pnpm --filter @medconnect/frontend build`
- Output: Next.js managed by Vercel runtime

### Vercel Setup (Monorepo)

1. Import the Git repository into Vercel.
2. In Project Settings, set **Root Directory** to `apps/frontend`.
3. Keep Framework Preset as **Next.js**.
4. Add environment variables if needed:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_APP_NAME`

5. Deploy.

This repository includes `apps/frontend/vercel.json` with explicit install/build/dev commands for pnpm workspaces.

## Backend

- Recommended: Railway or AWS ECS/EKS
- Build image via `apps/backend/Dockerfile`
- Configure env vars from `.env.example`
- Expose port `3001`

## Kubernetes

- Apply manifests:
  - `kubectl apply -f infrastructure/k8s/backend-deployment.yaml`
  - `kubectl apply -f infrastructure/k8s/frontend-deployment.yaml`

## CI/CD

- `ci.yml` runs lint, build, test on PR/push.
- `deploy.yml` provides Vercel and backend deployment skeleton.
