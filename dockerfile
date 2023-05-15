# Use an official Node.js runtime as a parent image
FROM node:18.14.2

# Set the working directory to /app
RUN mkdir -p usr/src
WORKDIR /src

# Copy the package.json and package-lock.json files to the container
COPY package*.json .
COPY postcss.config.cjs .


# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the Tailwind CSS file
RUN npm install -D tailwindcss postcss autoprefixer

# Expose port 3000
EXPOSE 3000

# Set environment variables for Prisma
ENV DATABASE_URL=postgresql://postgres:Postgres789@localhost:5432/blog
ENV NODE_ENV=production

# Generate the Prisma client
RUN npx prisma generate

# Set the command to start the application
CMD ["npm", "run", "dev"]