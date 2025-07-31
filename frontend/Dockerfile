# Use Node.js 22 (alpine for smaller image)
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i --legacy-peer-deps

# Copy the rest of the application source
COPY . .

# Build the React app for production
RUN npm run build

# Install `serve` globally instead of pm2
RUN npm install -g serve

# Expose the port the app will run on (PM2 static server will use 3000)
EXPOSE 80

# Use serve to serve the static files from the build directory
CMD ["serve", "-s", "dist", "-l", "80"]

