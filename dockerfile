FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build
RUN npm install drizzle-kit --save-dev
EXPOSE 3000

CMD ["sh", "-c", "npx drizzle-kit migrate && npm run start"]
