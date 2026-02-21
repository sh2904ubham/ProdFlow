FROM node:18-alpine
WORKDIR /usr/src/app
COPY backend/package.json backend/package-lock.json* ./
RUN npm install --production
COPY backend/ .
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "server.js"]
