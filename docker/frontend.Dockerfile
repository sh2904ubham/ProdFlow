# Build stage
FROM node:18-alpine AS build
WORKDIR /usr/src/app

# Copy package files and install
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of frontend code
COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]