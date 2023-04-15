# Partimos de una base oficial de NodeJs
FROM node:18.12.1-alpine

ENV CONTAINER_PATH /var/www/sisacad-ui

WORKDIR $CONTAINER_PATH
#RUN mkdir /sisacad-app

WORKDIR /sisacad-ui

COPY package*.json ./

RUN npm i --legacy-peer-deps --force

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]