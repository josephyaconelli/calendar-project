// middleware to validate token
const axios = require('axios')
const validateAuth = (req, res, next) => {
  console.log('req.body in middleware: ', req.body)
  const token = req.header("Authorization")
  if (!token) return res.status(401).json({ error: "Access denied" })
  try {
    axios.get('https://app.staging.fiddlequest.com/api/me', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then((result) => {
      if (!result || !(result && result.data) || !(result && result.data && result.data._id || result.status !== 200)) {
        console.log('not authorized')
        res.status(400).json({ error: "Token is not valid 1" })
      } else {
        next() // to continue the flow
      }
    })
    .catch((err) => {
      console.log('err: ', err)
    res.status(400).json({ error: "Token is not valid 2" })
    })
  } catch (err) {
    console.log('err: ', err)
    res.status(400).json({ error: "Token is not valid 3" })
  }
}

module.exports = validateAuth