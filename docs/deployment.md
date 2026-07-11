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
- Build command: `pnpm --filter @medconnect/frontend build`
- Output: Next.js managed by Vercel runtime

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
