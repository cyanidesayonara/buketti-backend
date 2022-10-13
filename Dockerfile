FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "run", "docker" ]
