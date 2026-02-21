FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only package files first (for caching npm install)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --production

# Copy the rest of backend code
COPY . .

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Start server
CMD ["node", "server.js"]