# MedConnect AI Architecture

## High-level

- Frontend: Next.js 15 + React 19 + TypeScript + Tailwind + shadcn + React Query + RHF + Framer Motion
- Backend: NestJS + PostgreSQL + Prisma + Redis + Socket.io + JWT
- Search: Elasticsearch
- Notifications: Firebase push
- File Storage: AWS S3
- AI: OpenAI API integration points via AI module

## Modules

- Identity and Access: email/OAuth, JWT, MFA, RBAC
- Social Graph: profiles, connections, followers, groups
- Feed: posts, reactions, comments, bookmarks, reposts
- Messaging: threads, participants, message attachments, calls
- Jobs: jobs, applications, interviews, offers
- Research: papers, peer review, citations, DOI, collaboration
- Learning: courses, modules, CME, quizzes, certificates
- Events: conferences, webinars, workshops, RSVPs, tickets
- Billing: subscription plans, payments, invoices
- Admin: moderation, reports, audit logs, analytics entities

## Security Controls

- JWT access and refresh token flow
- Role and permission checks (guard + metadata)
- Helmet, CORS, request validation
- Throttling/rate limiting
- Audit logs for sensitive actions

## Scalability Notes

- Stateless backend for horizontal autoscaling
- Redis-backed cache/session and job queue extension points
- Read model support with Elasticsearch sync
- Separate deploy targets for frontend and backend
