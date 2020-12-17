const router = require("express").Router()
const axios = require('axios')

router.post('/login', (req, res) => {
  console.log('req: ', req)
  const {email, password} = req.body

  axios.post('https://app.staging.fiddlequest.com/api/auth',
    { "email": email, "password": password },
    {
      headers: {
        'Content-Type': 'application/json',
    }
  })
  .then((result) => {
    res.status(200).json(result.data)
  })
  .catch((err) => {
    res.status(405).json({ error: err })
  })

})

router.post('/logout', (req, res) => {
  const { token } = req.body
  console.log('Token: ', token)
  axios.post('https://app.staging.fiddlequest.com/api/logout',
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then((result) => {
      console.log('result: ', result)
      res.status(200).json({ status: result.status })
    })
    .catch((err) => {
      console.log('error: ', err)
      res.status(500).json({ error: err })
    })
})

module.exports = router