
FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install
RUN npm i --only=dev
COPY . .

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]
