FROM node:latest


WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn
#RUN npm config set registry http://registry.npmjs.org/ && yarn
COPY . /usr/src/app
#RUN cp -a /tmp/node_modules /usr/src/app/
RUN npm run build
EXPOSE 8080
CMD [ "npm", "run", "start" ]