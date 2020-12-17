const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  userId: String,
  data: Object
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event