FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-workspace.yaml ./
COPY apps/backend/package.json apps/backend/package.json
RUN pnpm install --filter @medconnect/backend... --no-frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm --filter @medconnect/backend build

FROM node:20-alpine AS runner
WORKDIR /app
RUN corepack enable
COPY --from=build /app/apps/backend/dist ./dist
COPY --from=build /app/apps/backend/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3001
CMD ["node", "dist/main.js"]
