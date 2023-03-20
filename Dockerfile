FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build the Next.js app for production
RUN npm run build

# Set the environment variable for the app to listen on port 3000
ENV PORT 3000

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the app
CMD ["npm", "start"]