FROM node:20 AS build

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy React build to NGINX root
# COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /build/dist /usr/share/nginx/html


# Copy custom NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]