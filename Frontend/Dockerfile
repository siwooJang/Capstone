FROM node:20-alpine

WORKDIR /app

COPY ./Webpage/.npmrc /app/.npmrc
COPY ./Webpage/package.json /app/package.json

RUN npm install

COPY ./Webpage /app

EXPOSE 3000

CMD npm run dev
