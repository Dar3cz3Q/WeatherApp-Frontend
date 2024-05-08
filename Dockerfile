FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm i --production
RUN npm install react-scripts@3.4.1 -g

COPY . . 

RUN npm run build

RUN npm install -g serve

# Render default app port
EXPOSE 10000

CMD serve -s build