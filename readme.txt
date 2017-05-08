"dev": "cross-env PORT=9090 nodemon server",
"start": "cross-env PORT=9091 NODE_ENV=production node server",
"build": "rimraf dist && npm run build:client && npm run build:server",
"build:client": "cross-env NODE_ENV=production webpack --config build/webpack.client.config.js --progress --hide-modules",
"build:server": "cross-env NODE_ENV=production webpack --config build/webpack.server.config.js --progress --hide-modules",
"mock": "cross-env PORT=9092 nodemon --harmony-async-await ./api/mock"
