FROM node:18-alpine AS build
WORKDIR /app
COPY . .

ARG VITE_API_URL
ARG VITE_UPLOADS_PATH
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_UPLOADS_PATH=$VITE_UPLOADS_PATH

RUN npm install && npm run build

# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html