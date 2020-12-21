const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  public: {
    type: Boolean,
    default: false
  },
  busy: {
    type: Boolean,
    default: true
  }
})

eventSchema.index({
  title: 'text',
  description: 'text'
},{
  name: 'Eventsearch index',
  weights: {
    title: 10,
    description: 5
}
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event