FROM node:alpine
WORKDIR /docker-app
COPY package*.json ./
RUN npm i --force
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]