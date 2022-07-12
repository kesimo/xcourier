FROM node:16-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY xcourier.sh ./
RUN chmod +x xcourier.sh

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./xcourier

ENTRYPOINT [ "./xcourier.sh" ]