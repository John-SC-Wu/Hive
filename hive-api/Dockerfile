FROM node:18

WORKDIR /app

COPY package.json .
RUN npm i

CMD [ "npm", "run", "start" ]

EXPOSE 3008