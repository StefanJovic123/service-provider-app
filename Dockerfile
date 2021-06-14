FROM node:14.15-alpine


RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Must be installed before switching to node user because of permissions
RUN npm install -g pm2 @babel/core @babel/node

RUN apk --no-cache add --virtual native-deps \
  git g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install node-gyp -g &&\
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  npm cache clean --force &&\
  apk del native-deps

# If you are building your code for production
# This should be used instead of npm install on master branch only
# RUN npm ci --only=production

# Bundle app source
COPY --chown=node:node . .

# Your app binds to port 8080 so
# you'll use the EXPOSE instruction to have it mapped by the docker daemon:
EXPOSE 8080

CMD ["yarn", "start:docker"]
