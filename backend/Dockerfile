FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && npm install -g typescript

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]
