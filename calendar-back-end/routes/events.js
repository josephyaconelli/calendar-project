const router = require("express").Router()

const Event = require('../models/Event')

const { addEventValidation } = require('../validations/addEventValidation')
const { editEventValidation } = require('../validations/editEventValidation')
const { removeEventValidation } = require('../validations/removeEventValidation')




router.post('/add', async (req, res) => {
  // validate incoming data
  const { error } = addEventValidation(req.body)
  if (error) {
    console.log(error)
    return res.status(500).json({ error: error.details[0].message })
  }

  const { start, end, title, description, public: isPublic, busy } = req.body

  const { id: userId } = req.user

  // generate event object
  const event = new Event({
    start,
    end,
    title,
    description,
    isPublic,
    busy,
    ownerId: req.user.id
  })

  // check no conflicting dates/times (StartDate1 <= EndDate2) && (StartDate2 <= EndDate1)
  if (event.busy == true) {
    const conflicts = await Event.find({
      busy: true,
      ownerId: userId,
      start: { $lte: end },
      end: { $gte: start }
    })

    if (conflicts.length > 0) {
      return res.status(299).json({
        error: 'Conflicting events',
        events: conflicts
      })
    }
  }



  // add new event to DB
  try {
    const savedEvent = await event.save()
    return res.json({ error: null, data: { event: savedEvent._id }})
  } catch(error) {
    console.log(error)
    return res.status(500).json(error)
  }
})

router.post('/edit', async (req, res) => {
  // validate incoming data
  const { error } = editEventValidation(req.body)
  if (error) {
    console.log(error)
    return res.status(500).json({ error: error.details[0].message })
  }

  const { id: userId } = req.user

  const { id, toUpdate } = req.body
  
  // check no conflicting dates/times (StartDate1 <= EndDate2) && (StartDate2 <= EndDate1)
  const currentEvent = await Event.findOne({ _id: id, ownerId: req.user.id })
  const willBeBusy = toUpdate.hasOwnProperty("busy") ? toUpdate.busy : currentEvent.busy

  if (willBeBusy) {
    const currentStart = toUpdate.start || currentEvent.start
    const currentEnd = toUpdate.end || currentEvent.end

    const conflicts = await Event.find({
      busy: true,
      start: { $lte: currentEnd },
      end: { $gte: currentStart },
      ownerId: userId
    })

    const filtConflits = conflicts.filter(c => String(c._id) !== id)
    if (filtConflits.length > 0) {
      return res.status(299).json({
        error: 'Conflicting events',
        events: filtConflits
      })
    }
  }

  // find event by ID
  try {
    const event = await Event.findOneAndUpdate({ _id: id, ownerId: req.user.id }, toUpdate, { new: true })
    if (!event) {
      return res.status(404).json({ error: 'Event does not exist'})
    } else {
      res.json({ error: null, data: { event: event._id }})
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.post('/remove', async (req, res) => {
  // validate incoming data
  const { error } = removeEventValidation(req.body)
  if (error) {
    return res.status(500).json({ error: error.details[0].message })
  }

  // find event by ID
  const { id } = req.body

  try {
    const event = await Event.findOneAndDelete({ _id: id, ownerId: req.user.id })
    if (!event) {
      return res.status(404).json({ error: 'Event does not exist'})
    } else {
      res.json({ error: null, data: { event: event._id }})
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
})

router.post('/getByMonth', async (req, res) => {
  const { month, year } = req.body
  const { id } = req.user
  try {

    const monthStart = new Date(String(year)+','+ String(month + 1))
    const monthEnd = new Date(String((month + 1 >= 12 ? year + 1 : year))+','+ String((month + 2) % 12 === 0 ? 12 : (month + 2) % 12))

    const events = await Event.find({
      ownerId: id,
      $or: [
        { start: { $lte: monthEnd, $gte: monthStart }},
        { end: { $lte: monthEnd, $gte: monthStart }},
        { $and: [
          { start: { $lte: monthStart }},
          { end: { $gte: monthEnd }}
        ] }
      ]
    })
    return res.json({error: null, data: { events }})

  } catch (error) {
    console.log('error: ', error)
    return res.status(500).json(error)
  }

})


router.post('/search', async (req, res) => {
  const { searchString, page } = req.body

  const { id } = req.user

  try {
    const events = await Event.find({
        ownerId: id,
        $text: {
          $search: searchString,
          $caseSensitive: true
        }
      })
    return res.json({ error: null, data: { events }})
  } catch (error) {
    return res.status(500).json({error: error})
  }

})


router.post('/share', async (req, res) => {
  const { eventId, setShare } = req.body
  const { id } = req.user
  try {
    const event = await Event.findOneAndUpdate({ _id: eventId, ownerId: id}, { public: setShare }, { new: true })
    return res.json({
      error: null,
      eventId: eventId
    })
  } catch (error) {
    return res.status(500).json({error: error})
  }

})



module.exports = router
