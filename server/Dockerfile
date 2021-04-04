FROM node:14.16.0

LABEL version="1.0"
LABEL description="This is the base docker image for the employee-system server API."
LABEL maintainer = ["zizogmd@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 5000

CMD ["npm", "run", "start-server"]
