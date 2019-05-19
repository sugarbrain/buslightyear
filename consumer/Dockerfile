FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install
EXPOSE 6000
CMD ["npm", "start"]
