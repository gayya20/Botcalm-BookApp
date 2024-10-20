# Dockerfile for server (backend)
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend port (for example, 5000)
EXPOSE 8080

# Start the backend server
CMD ["node", "index.js"]
