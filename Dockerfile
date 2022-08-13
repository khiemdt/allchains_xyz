FROM node:16-alpine AS builder
WORKDIR /app
COPY package* yarn.lock ./
RUN yarn install
COPY public ./public
COPY src ./src
COPY tsconfig.json ./
COPY .env* ./
RUN yarn build

#Stage 2
#######################################
#pull the official nginx:1.19.0 base image
FROM nginx:1.19.0
#copies React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /app/build .
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]