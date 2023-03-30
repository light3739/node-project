FROM node:13-alpine
WORKDIR /usr/app
COPY app ./
EXPOSE 3000
CMD [ "node", "server.js" ]