const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
// const {info, error} = require('./utils/logger') // alternative - info() and error()
                                                  // instead of logger.info() and logger.error()
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
