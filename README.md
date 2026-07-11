# MedConnect AI

MedConnect AI is an enterprise-ready social networking platform for doctors, healthcare professionals, students, hospitals, recruiters, and researchers.

## Tech Stack

### Frontend

- React 19
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn UI primitives
- React Query
- React Hook Form
- Framer Motion

### Backend

- Node.js
- NestJS
- PostgreSQL
- Prisma ORM
- Redis
- Socket.io
- JWT authentication

### Platform Integrations

- AWS S3 for storage
- Elasticsearch for search
- Firebase for push notifications
- OpenAI API for AI features

## Monorepo Structure

- `apps/frontend`: Next.js web app
- `apps/backend`: NestJS API + Prisma schema + seed
- `infrastructure/docker`: local dependencies
- `infrastructure/k8s`: Kubernetes manifests
- `.github/workflows`: CI/CD pipelines
- `docs`: architecture, API, deployment docs

## Key Implemented Foundations

- Secure auth base (email/password, JWT, role model)
- RBAC decorator/guard pattern
- Feed and profile API modules
- AI service endpoints (summarize and post generation stubs)
- Search and notifications API modules
- Scalable PostgreSQL schema with over 60 tables
- Seed script for baseline data
- Modern healthcare-focused responsive frontend shell
- Docker and Kubernetes deployment assets
- OpenAPI via Swagger (`/api/docs`)

## Getting Started

1. Copy envs:
   - `cp .env.example .env`
2. Start dependencies:
   - `pnpm docker:up`
3. Install packages:
   - `pnpm install`
4. Backend setup:
   - `pnpm --filter @medconnect/backend prisma:generate`
   - `pnpm --filter @medconnect/backend prisma:migrate`
   - `pnpm --filter @medconnect/backend seed`
5. Start apps:
   - `pnpm dev`

## Testing

- Backend unit tests scaffolded with Jest.
- Commands:
  - `pnpm --filter @medconnect/backend test`
  - `pnpm test`

## Deliverables Checklist

1. Complete frontend foundation: Yes
2. Complete backend foundation: Yes
3. Database schema: Yes (`apps/backend/prisma/schema.prisma`)
4. API documentation: Yes (`/api/docs` + `docs/api.md`)
5. Docker files: Yes
6. CI/CD: Yes
7. Deployment guide: Yes
8. Seed data: Yes
9. README: Yes
10. Production-ready architecture blueprint: Yes

## Next Build Steps

- Add OAuth providers (Google, LinkedIn, Apple) in auth module
- Implement MFA challenge and enrollment flow
- Add WebSocket gateway for chat and live notifications
- Integrate S3 uploads and Elasticsearch indexing worker
- Connect OpenAI + medical guardrails for AI endpoints
- Add full integration and E2E tests for critical journeys
