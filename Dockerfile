FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app



COPY package*.json ./
RUN apk update
RUN apk add tzdata
RUN apk --no-cache add curl

ENV TZ=Asia/Singapore
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN date
RUN npm ci --only=production


# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 80


HEALTHCHECK CMD curl --fail http://localhost:8080/api/healthcheck || exit 1


CMD [ "node", "app.js" ]