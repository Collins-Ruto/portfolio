FROM node:18

WORKDIR /app

COPY package*.json ./
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

# Bundle app source
COPY . /app

# Build the Next.js app for production
RUN npm run build

# Set the environment variable for the app to listen on port 3000
ENV PORT 3000

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the app
CMD ["npm", "start"]