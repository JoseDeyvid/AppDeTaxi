FROM node:18

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh
RUN npx prisma generate


EXPOSE 8080

CMD ["npm", "start"]