ARG NODE_VERSION=18.14.0
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

FROM base as deps
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM deps as build
ARG VITE_EARTH_API
ARG VITE_EARTH_MINIO
ARG VITE_SENDER_SERVICE
ENV VITE_EARTH_API=${VITE_EARTH_API}
ENV VITE_EARTH_MINIO=${VITE_EARTH_MINIO}
ENV VITE_SENDER_SERVICE=${VITE_SENDER_SERVICE}
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

FROM nginx as final

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80