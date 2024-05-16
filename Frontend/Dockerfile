FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
FROM base AS builder

WORKDIR /app

COPY ./Webpage/.npmrc /app/.npmrc
COPY ./Webpage/package.json /app/package.json
#COPY ./Webpage/package-lock.json /app/package-lock.json

#must be replaced with npm ci, after adding package-lock.json

RUN npm install 
#RUN npm ci

COPY ./Webpage /app

RUN npm run build

FROM base AS runner

WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js