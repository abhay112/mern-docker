FROM node:18.20.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV MONGODB_URI=mongodb://mongodb:27017/docker

EXPOSE 5050

CMD ["npm", "start"]
