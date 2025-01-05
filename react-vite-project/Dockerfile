# Step 1: Build the React app
FROM node:20 AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the app using a lightweight server (nginx)
FROM nginx:alpine

# Copy the build output to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port nginx is running on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
