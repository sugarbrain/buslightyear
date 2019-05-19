# stage 1
FROM mongo as seed
WORKDIR /app
COPY data/200118_240118.csv data.csv
CMD mongoimport --host mongodb --db buslightyear --collection bus_ping --type csv --headerline --file data.csv

# stage 2
FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
