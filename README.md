# Set the base image to Node.js
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /server

# Copy the backend package files and install dependencies
COPY COPY blogtask_backtend/ ./
/package.json COPY blogtask_backtend/ ./
/package-lock.json ./
RUN npm install

# Copy the rest of the backend application files
COPY blogtask_backtend/ ./

# Expose the port that the backend API will run on
EXPOSE 5000

# Command to start the Node.js backend server
CMD ["npm", "start"]
