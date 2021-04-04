FROM node:14.16.0

LABEL version="1.0"
LABEL description="This is the base docker image for the employee-system frontend react app."
LABEL maintainer = ["zizogmd@gmail.com"]

WORKDIR /app/client

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]