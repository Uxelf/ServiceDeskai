FROM node:25-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


CMD ["npm", "run", "dev", "--", "--host"]
#CMD ["tail", "-f", "/dev/null"]