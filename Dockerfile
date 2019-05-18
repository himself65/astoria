FROM node:10.15.3

WORKDIR /usr/src/app

COPY . .

RUN npm install -g yarn \
    && yarn --frozen-lockfile --non-interactive

CMD ./deploy.sh

EXPOSE 3000:3000
EXPOSE 27017:27017
