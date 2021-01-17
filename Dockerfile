FROM node:14-slim

ENV PORT 3000
EXPOSE 3000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN npm install


CMD ["npm", "start"]
