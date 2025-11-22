FROM node:20-slim

WORKDIR /workspace

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production=false || true

# Copy project
COPY . ./

# Build the site into /workspace/docs
RUN npm run build || npx @11ty/eleventy

# Serve the built site with a tiny static server
RUN npm install -g http-server

EXPOSE 8080
CMD ["npx", "http-server", "docs", "-p", "8080", "-c-1"]
