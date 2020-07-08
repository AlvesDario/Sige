from node:12

workdir /usr/app

copy package.json ./

run npm install

copy . ./src

expose 3000

cmd ["npm", "start"]
