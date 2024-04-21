# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY ./package.json ./package-lock.json ./

# Install the dependencies
RUN npm i

# Copy the application code to the working directory
COPY ./ ./

# Expose the port on which the microservice will run (if applicable)
EXPOSE 3000

# Start the microservice
CMD ["node", "service.js"]