FROM node:13-alpine
WORKDIR /usr/app
COPY app ./
RUN npm install express
EXPOSE 3000
CMD [ "node", "server.js" ]