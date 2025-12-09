FROM node:25-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npx", "nodemon", "./src/server.js"]