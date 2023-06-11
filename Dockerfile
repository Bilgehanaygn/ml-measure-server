FROM node:20-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]