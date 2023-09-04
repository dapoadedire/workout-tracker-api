# Use the Node.js 20 base image (replace with the actual image when available)
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# If you are building your code for production
RUN npm ci --omit=dev


# Copy the rest of the project files to the container
COPY . .

# Expose the port your application will run on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
