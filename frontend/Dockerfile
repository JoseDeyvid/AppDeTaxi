FROM node:18 AS builder

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build
FROM nginx:alpine

COPY --from=builder /usr/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]