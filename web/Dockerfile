FROM node:14.13-alpine
WORKDIR /app
COPY package.json ./
COPY ./server ./server
COPY ./client ./client
COPY ./database ./database
RUN yarn postinstall
EXPOSE 8080
CMD yarn start
