FROM node:latest


WORKDIR /usr/src/app
RUN yarn global add webpack http-server
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . /usr/src/app
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "./dist" ]