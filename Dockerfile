FROM node:14

ENV PORT=3000
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
ADD .env.docker .env

RUN npm run build

EXPOSE $PORT
CMD ["node", "build/index.js"]
