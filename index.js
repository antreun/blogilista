const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)
app.use(express.static('build'))
app.use(middleware.logger)
app.use(middleware.error)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
