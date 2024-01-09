FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json file and the pnpm-lock.yaml file
COPY package.json .
COPY pnpm-lock.yaml .

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the entire local directory to the working directory in the container
COPY . .

# Expose port 3001
EXPOSE 3001

# Command to start your application
CMD ["pnpm", "run", "start:dev"]