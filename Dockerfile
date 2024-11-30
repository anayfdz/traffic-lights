FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Script wait-for-it.sh 
COPY wait-for-it.sh .

RUN npm run build

EXPOSE 3000

CMD ["sh", "wait-for-it.sh", "db:5432", "--", "npm", "run", "start:dev"]
