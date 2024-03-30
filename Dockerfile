FROM node:18-alpine as base

WORKDIR /src
COPY package.json package-lock.json /src/
EXPOSE 3000


FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /src
# Define the command to run the app
CMD [ "nodemon", "server.js" ]