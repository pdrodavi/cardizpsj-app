FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=
EXPOSE 3000
CMD npm start