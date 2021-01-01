FROM node:14.13-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
RUN yarn install
COPY ./src ./
RUN yarn build
EXPOSE 8080
CMD yarn start:prod
