# Partimos de una base oficial de NodeJs
FROM node:16.18.1-alpine

ENV CONTAINER_PATH /var/www/sisacad-app

WORKDIR $CONTAINER_PATH
#RUN mkdir /sisacad-app

WORKDIR /sisacad-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]


















