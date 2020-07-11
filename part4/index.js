// [X] 4.1 get the node application working
// [] 4.2 arrange to node structure


const app = require('./app')  // the express program
const http = require("http")
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)   // why ??
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})


// const mongoUrl = process.env.MONGODB_URI


