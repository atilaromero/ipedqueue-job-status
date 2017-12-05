FROM node:8.9.0-alpine

WORKDIR /usr/local/src/job-status
COPY package.json .
RUN npm install
ADD . .
EXPOSE 80
RUN npm run build
CMD npm run serve
