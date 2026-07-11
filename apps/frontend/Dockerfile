FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-workspace.yaml ./
COPY apps/frontend/package.json apps/frontend/package.json
RUN pnpm install --filter @medconnect/frontend... --no-frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm --filter @medconnect/frontend build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/frontend/.next ./.next
COPY --from=build /app/apps/frontend/public ./public
COPY --from=build /app/apps/frontend/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node_modules/.bin/next", "start", "-p", "3000"]
