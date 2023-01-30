FROM node:18

WORKDIR /home/node/app

COPY  package.json ./

RUN npm install

COPY . .
RUN npm start

EXPOSE 3001

CMD ["node", "build/server.js"]