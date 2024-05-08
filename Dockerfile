FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm i --production

COPY . . 

RUN npm run build --production

RUN npm install -g serve

# Render default app port
EXPOSE 10000

CMD serve -s build