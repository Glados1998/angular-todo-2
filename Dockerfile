FROM node

WORKDIR /app

COPY package.json /app

RUN npm install -g @angular/cli

COPY . /app

EXPOSE 4200

CMD ["npm", "start", "--host", "0.0.0.0"]
