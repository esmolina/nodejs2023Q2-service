# Image source build
FROM node:alpine

COPY init.sql /docker-entrypoint-initdb.d/

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY package*.json ./

# Then Install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev"]