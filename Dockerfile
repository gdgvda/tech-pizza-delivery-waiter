#
# Build Stage
#
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
#
# Production Stage
#
FROM node:22-alpine
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
WORKDIR /app
USER node
COPY --chown=node:node package*.json ./
COPY --chown=node:node static ./static
COPY --chown=node:node src/views ./dist/views
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist
RUN npm install --omit=dev
CMD ["npm", "start"]
