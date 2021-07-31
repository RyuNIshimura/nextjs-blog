FROM node:12

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn

COPY . .

CMD [ "yarn", "dev" ]