const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

const url = config.MONGODB_URI // needs to be configured in .env file

logger.info('connecting to', url)

mongoose.connect(url)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const userSchema = new mongoose.Schema({
  username: {type:String}, name: String, passwordHash: String
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Users', userSchema)

