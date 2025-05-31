# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose the app port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
