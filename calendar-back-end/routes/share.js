const router = require("express").Router()
const Event = require('../models/Event')
const createSharedEventPage = require('../pages/sharedEvent')


router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params
  try {
    const event = await Event.findOne({_id: eventId})
    if (event && event.public) {
      const { description, start, end, title, busy, _id } = event
      const view = createSharedEventPage(description, start, end, title, busy, _id)
      return res.send(view)
    } else {
      return res.status(404).json({error: "No event found."})
    }
  } catch (error) {
    return res.status(500).json({error: error})
  }
})


module.exports = router

