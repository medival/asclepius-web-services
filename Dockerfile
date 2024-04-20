FROM node:18.19.1

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
CMD ["node", "src/server/server.js"]