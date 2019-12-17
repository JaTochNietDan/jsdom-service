FROM node:12

COPY . .

RUN npm i

EXPOSE 3000

CMD ["node", "app.js"]