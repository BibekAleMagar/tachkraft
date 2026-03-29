FROM node:20-alpine AS builder

RUN apk add --no-cache openssl

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

COPY prisma ./prisma

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN find dist -name "main.js"

RUN node_modules/.bin/tsc \
    --skipLibCheck \
    --esModuleInterop \
    --module commonjs \
    --moduleResolution node \
    --target es2017 \
    --outDir dist/prisma \
    prisma/seed.ts

# ---------------------------------------------------

FROM node:20-alpine AS runner

RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

EXPOSE 3000

CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/prisma/seed.js && node dist/src/main"]