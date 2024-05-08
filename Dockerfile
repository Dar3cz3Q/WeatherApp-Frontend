FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . . 

RUN npm run build

RUN npm i -g serve

# Render default app port
EXPOSE 10000

CMD serve -s build