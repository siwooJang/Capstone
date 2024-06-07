FROM node:20-alpine

WORKDIR /app

COPY ./Webpage/.env /app/.env
COPY ./Webpage/.npmrc /app/.npmrc
COPY ./Webpage/package.json /app/package.json
COPY ./Webpage/package-lock.json /app/package-lock.json

RUN npm ci

COPY ./Webpage /app

EXPOSE 3000

CMD npm run dev